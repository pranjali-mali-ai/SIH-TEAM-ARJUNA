import json
from ulpf.student2_processor import process_logs, to_common_json, validate_records


def test_process_and_normalize():
    sample_lines = [
        '{"source":"app1","timestamp":"2026-08-24T15:04:05Z","event_type":"LOGIN","user":"alice","ip":"192.168.1.10","device":"host-1","message":"User login successful"}',
        '<34>Aug 24 15:04:06 host1 app[123]: user=alice src=192.168.1.10 action=login',
    ]
    records = process_logs(sample_lines)
    assert isinstance(records, list)
    # At least one record with normalized timestamp
    assert any(r.get("timestamp") is not None for r in records)


def test_deduplication():
    line = '{"source":"app1","timestamp":"2026-08-24T15:04:05Z","event_type":"LOGIN","user":"alice","ip":"192.168.1.10","device":"host-1","message":"User login successful"}'
    records = process_logs([line, line])
    # duplicate lines should be reduced to 1
    assert len(records) == 1


def test_validation_passes_for_complete_record():
    valid_line = json.dumps({
        "source": "appX",
        "timestamp": "2026-08-24T15:04:05Z",
        "event_type": "ALERT",
        "user": "bob",
        "ip_address": "10.0.0.1",
        "device": "sensor-1",
        "description": "threshold exceeded",
    })
    records = process_logs([valid_line])
    mapped = []
    for r in records:
        mapped.append({
            "source": r.get("source"),
            "timestamp": r.get("timestamp"),
            "event_type": r.get("event_type"),
            "user": r.get("user"),
            "ip_address": r.get("ip_address"),
            "device": r.get("device"),
            "description": r.get("description"),
        })
    errs = validate_records(mapped)
    assert errs == []
