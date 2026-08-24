from fastapi.testclient import TestClient
from ulpf.api import app

client = TestClient(app)


def test_process_returns_student2_fields():
    payload = {
        "lines": [
            '{"source":"app1","timestamp":"2026-08-24T15:04:05","event_type":"LOGIN","user":"alice","ip":"192.168.1.10","device":"host-1","message":"Login successful"}'
        ]
    }
    resp = client.post("/process", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) == 1
    rec = data[0]
    expected_keys = {"source", "timestamp", "event_type", "user", "ip_address", "device", "description"}
    assert set(rec.keys()) == expected_keys
    assert "raw" not in rec


def test_schema_endpoint_available():
    resp = client.get("/schema")
    assert resp.status_code == 200
    j = resp.json()
    assert isinstance(j, dict)
    assert "properties" in j
