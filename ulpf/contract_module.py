import json
from typing import Any, Dict, Optional


def to_json(obj: Any) -> str:
    """Serialize an object to JSON using str() for non-serializable values."""
    return json.dumps(obj, default=str, ensure_ascii=False)


def student1(
    evidence_id: Optional[str] = None,
    filename: Optional[str] = None,
    file_size: Optional[int] = None,
    file_format: Optional[str] = None,
    duration: Optional[float] = None,
    creation_time: Optional[str] = None,
    modification_time: Optional[str] = None,
    storage_path: Optional[str] = None,
    metadata: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    return {
        "evidence_id": evidence_id,
        "filename": filename,
        "file_size": file_size,
        "file_format": file_format,
        "duration": duration,
        "creation_time": creation_time,
        "modification_time": modification_time,
        "storage_path": storage_path,
        "metadata": metadata or {},
    }


def student2(
    source: Optional[str] = None,
    timestamp: Optional[str] = None,
    event_type: Optional[str] = None,
    user: Optional[str] = None,
    ip_address: Optional[str] = None,
    device: Optional[str] = None,
    description: Optional[str] = None,
) -> Dict[str, Any]:
    return {
        "source": source,
        "timestamp": timestamp,
        "event_type": event_type,
        "user": user,
        "ip_address": ip_address,
        "device": device,
        "description": description,
    }


def student3(
    evidence_id: Optional[str] = None,
    timestamp: Optional[str] = None,
    frame_number: Optional[int] = None,
    event_type: Optional[str] = None,
    detected_object: Optional[str] = None,
) -> Dict[str, Any]:
    return {
        "evidence_id": evidence_id,
        "timestamp": timestamp,
        "frame_number": frame_number,
        "event_type": event_type,
        "detected_object": detected_object,
    }


def student4(
    incident_id: Optional[str] = None,
    investigation_id: Optional[str] = None,
    events: Optional[list] = None,
    correlation_information: Optional[Dict[str, Any]] = None,
    evidence_id: Optional[str] = None,
    hash_algorithm: Optional[str] = None,
    hash_value: Optional[str] = None,
) -> Dict[str, Any]:
    return {
        "incident_id": incident_id,
        "investigation_id": investigation_id,
        "events": events or [],
        "correlation_information": correlation_information or {},
        "evidence_id": evidence_id,
        "hash_algorithm": hash_algorithm,
        "hash_value": hash_value,
    }


if __name__ == "__main__":
    # Example empty structures (fields intentionally left None/empty)
    print("STUDENT 1 JSON:\n", to_json(student1()))
    print("\nSTUDENT 2 JSON:\n", to_json(student2()))
    print("\nSTUDENT 3 JSON:\n", to_json(student3()))
    print("\nSTUDENT 4 JSON:\n", to_json(student4()))
