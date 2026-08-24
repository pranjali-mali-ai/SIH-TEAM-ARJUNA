import re
import json
import logging
from typing import List, Dict, Optional, Any

import pandas as pd
from pathlib import Path
import jsonschema
from jsonschema import validate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


IP_RE = re.compile(r"(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)(?:\.|$)){4}")
USER_RE = re.compile(r"user[:=]\s*(?P<user>\w+)", re.IGNORECASE)
DEVICE_RE = re.compile(r"device[:=]\s*(?P<device>[\w\-\.]+)", re.IGNORECASE)


def detect_log_type(line: str) -> str:
    line = line.strip()
    if not line:
        return "empty"
    # JSON line
    if line.startswith("{") and line.endswith("}"):
        return "json"
    # CEF (Common Event Format) begins with "CEF:"
    if line.startswith("CEF:"):
        return "cef"
    # Syslog: often starts with a priority in angle brackets or a timestamp
    if re.match(r"^<\d+>", line) or re.match(r"^[A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}", line):
        return "syslog"
    return "generic"


def parse_json_line(line: str) -> Dict[str, Any]:
    try:
        obj = json.loads(line)
    except Exception:
        logger.debug("Invalid JSON line: %s", line)
        return {}
    # Map fields conservatively to the Student 2 schema
    return {
        "source": obj.get("source"),
        "timestamp": obj.get("timestamp") or obj.get("time") or obj.get("ts"),
        "event_type": obj.get("event_type") or obj.get("type") or obj.get("action"),
        "user": obj.get("user") or obj.get("username"),
        "ip_address": obj.get("ip") or obj.get("ip_address"),
        "device": obj.get("device"),
        "description": obj.get("message") or obj.get("description") or json.dumps(obj),
    }


def parse_cef_line(line: str) -> Dict[str, Any]:
    # Very small CEF parser: CEF:Version|DeviceVendor|DeviceProduct|DeviceVersion|SignatureID|Name|Severity|extension
    parts = line.split("|", 7)
    if len(parts) < 7:
        return {"description": line}
    _, vendor, product, version, signature_id, name, severity, *rest = parts + [None]
    extension = rest[0] if rest else ""
    # Try to extract key=value pairs from extension
    kv = dict(re.findall(r"(\w+)=([^\s]+)", extension))
    return {
        "source": f"{vendor}:{product}",
        "timestamp": kv.get("rt") or kv.get("time"),
        "event_type": name,
        "user": kv.get("suser") or kv.get("user"),
        "ip_address": kv.get("src") or kv.get("dst") or kv.get("ip"),
        "device": kv.get("device"),
        "description": extension or name,
    }


def parse_syslog_line(line: str) -> Dict[str, Any]:
    # Very small syslog parser: optionally <PRI>timestamp host app: message
    m = re.match(r"^(?:<\d+>)?(?P<ts>[A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2})\s+(?P<host>\S+)\s+(?P<rest>.+)$", line)
    if m:
        ts = m.group("ts")
        rest = m.group("rest")
        # attempt to split app name and message
        app_split = re.match(r"(?P<app>[\w\-\/\.]+)(?:\[\d+\])?:\s*(?P<msg>.*)$", rest)
        if app_split:
            app = app_split.group("app")
            msg = app_split.group("msg")
        else:
            app = None
            msg = rest
        return {
            "source": m.group("host"),
            "timestamp": ts,
            "event_type": app,
            "user": None,
            "ip_address": extract_ip(msg),
            "device": app,
            "description": msg,
        }
    # fallback
    return {"description": line}


def parse_generic_line(line: str, source: Optional[str] = None) -> Dict[str, Any]:
    return {
        "source": source,
        "timestamp": None,
        "event_type": None,
        "user": extract_user(line),
        "ip_address": extract_ip(line),
        "device": extract_device(line),
        "description": line,
    }


def extract_ip(text: str) -> Optional[str]:
    if not text:
        return None
    m = IP_RE.search(text)
    return m.group(0) if m else None


def extract_user(text: str) -> Optional[str]:
    if not text:
        return None
    m = USER_RE.search(text)
    return m.group("user") if m else None


def extract_device(text: str) -> Optional[str]:
    if not text:
        return None
    m = DEVICE_RE.search(text)
    return m.group("device") if m else None


def parse_line(line: str, source: Optional[str] = None) -> Dict[str, Any]:
    t = detect_log_type(line)
    if t == "json":
        parsed = parse_json_line(line)
    elif t == "cef":
        parsed = parse_cef_line(line)
    elif t == "syslog":
        parsed = parse_syslog_line(line)
    elif t == "empty":
        return {}
    else:
        parsed = parse_generic_line(line, source=source)
    # attach raw data
    result = {
        "raw": line,
        "source": parsed.get("source") or source,
        "timestamp": parsed.get("timestamp"),
        "event_type": parsed.get("event_type"),
        "user": parsed.get("user"),
        "ip_address": parsed.get("ip_address"),
        "device": parsed.get("device"),
        "description": parsed.get("description"),
    }
    return result


def normalize_timestamp(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    try:
        # Use pandas to parse many timestamp formats
        ts = pd.to_datetime(value, utc=True, errors="coerce")
        if pd.isna(ts):
            return None
        return ts.isoformat()
    except Exception:
        return None


def process_logs(lines: List[str], source: Optional[str] = None) -> List[Dict[str, Any]]:
    records = []
    for ln in lines:
        parsed = parse_line(ln, source=source)
        if not parsed:
            continue
        records.append(parsed)

    if not records:
        return []

    df = pd.DataFrame(records)

    # Normalize timestamps
    df["timestamp"] = df["timestamp"].apply(normalize_timestamp)

    # Extract missing user/ip/device from description
    df["user"] = df.apply(lambda r: r["user"] or extract_user(str(r["description"])), axis=1)
    df["ip_address"] = df.apply(lambda r: r["ip_address"] or extract_ip(str(r["description"])), axis=1)
    df["device"] = df.apply(lambda r: r["device"] or extract_device(str(r["description"])), axis=1)

    # Deduplicate: use raw + timestamp + description hash
    df = df.drop_duplicates(subset=["source", "timestamp", "description"], keep="first")

    # Fill empty strings with None
    df = df.where(pd.notnull(df), None)

    # Reorder/ensure Student 2 schema ordering
    cols = ["source", "timestamp", "event_type", "user", "ip_address", "device", "description", "raw"]
    for c in cols:
        if c not in df.columns:
            df[c] = None

    result = df[cols].to_dict(orient="records")
    return result


def to_common_json(records: List[Dict[str, Any]]) -> str:
    # Output JSON array where each element matches the Student 2 contract
    # Remove internal raw if you don't want to expose it; we keep it for traceability
    out = []
    for r in records:
        out.append({
            "source": r.get("source"),
            "timestamp": r.get("timestamp"),
            "event_type": r.get("event_type"),
            "user": r.get("user"),
            "ip_address": r.get("ip_address"),
            "device": r.get("device"),
            "description": r.get("description"),
        })
    return json.dumps(out, ensure_ascii=False, indent=2)


def load_schema() -> Dict[str, Any]:
    # Try package-local schema first, then project root
    pkg_path = Path(__file__).with_name("student2_schema.json")
    root_path = Path(__file__).parent.parent.joinpath("student2_schema.json")
    for schema_path in (pkg_path, root_path):
        try:
            if schema_path.exists():
                return json.loads(schema_path.read_text(encoding="utf-8"))
        except Exception:
            logger.exception("Failed to load schema from %s", schema_path)
    logger.error("Failed to find student2_schema.json in package or project root")
    return {}


def validate_record(record: Dict[str, Any], schema: Dict[str, Any]) -> Optional[str]:
    if not schema:
        return "no-schema"
    try:
        validate(instance=record, schema=schema)
        return None
    except jsonschema.ValidationError as ve:
        return str(ve)


def validate_records(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    schema = load_schema()
    errors = []
    for i, r in enumerate(records):
        err = validate_record(r, schema)
        if err:
            errors.append({"index": i, "error": err, "record": r})
    return errors


if __name__ == "__main__":
    # Example usage with mixed sample logs
    sample_lines = [
        '{"source":"app1","timestamp":"2026-08-24 15:04:05","event_type":"LOGIN","user":"alice","ip":"192.168.1.10","message":"User login successful"}',
        "<34>Aug 24 15:04:06 host1 app[123]: user=alice src=192.168.1.10 action=login",
        "CEF:0|Acme|Firewall|1.0|100|Blocked connection|5|src=10.0.0.5 dst=192.168.1.20 suser=bob",
        "device=cam-01 motion detected at 2026-08-24 15:05:00 ip=10.0.0.9",
    ]

    records = process_logs(sample_lines)
    print("Common JSON output:\n", to_common_json(records))
