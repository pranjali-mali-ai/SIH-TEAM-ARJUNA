ulpf — Universal Log Processing Framework (package)

Overview
--------
`ulpf` contains a compact prototype for Student 2: a log ingestion and normalization pipeline
that parses multiple input formats, preserves raw input, normalizes fields, deduplicates events,
and validates output against a JSON Schema.

Contents
--------
- `student2_processor.py` — main pipeline and CLI entrypoint. Produces normalized JSON records.
- `contract_module.py` — factory helpers producing canonical Student1–4 JSON records used as
	contract examples.
- `trigger_stubs.py` — in-memory message bus, envelope builder, and simple producer/consumer
	examples useful for testing event triggers.

Quick start (Windows PowerShell)
-------------------------------
1. Create and activate a virtual environment, then install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the Student 2 processor on a sample log file and write JSON output:

```powershell
python -m ulpf.student2_processor C:\path\to\logs.txt -o C:\path\to\output.json
```

CLI notes
---------
- The processor preserves the original raw event text in the `raw` field of each record.
- Output is validated with `student2_schema.json` (project root). Validation failures are
	reported to stderr and non-conforming records are filtered, depending on CLI flags.

Schema and examples
-------------------
- `student2_schema.json` — JSON Schema for normalized Student 2 records (project root).
- `event_envelope_schema.json` — wrapper/envelope schema used by `trigger_stubs.py`.
- See `ulpf/contract_module.py` for example contract objects for Students 1–4.

Testing
-------
Run the unit test suite from project root:

```powershell
python -m pytest -q
```

Development notes
-----------------
- To add new parsers, extend `student2_processor.parse_line()` or add a parser plugin and
	register it in the pipeline.
- For traceability, add raw-hash computation (MD5/SHA-256) and include `raw_hash_*` fields
	in the normalized record (planned task).

Files to know
-------------
- `ulpf/student2_processor.py` — pipeline logic and parsing functions.
- `student2_schema.json` — canonical schema for validated output.
- `event_envelope_schema.json` — envelope definition for messaging tests.

API (HTTP)
----------
This package exposes a small HTTP API (FastAPI) in `ulpf/api.py` to process logs
programmatically and to fetch the Student 2 JSON Schema.

Run the API server (development):

```powershell
uvicorn ulpf.api:app --reload --port 8000
```

Endpoints
- `POST /process` — process logs and return normalized records. JSON body options:
	- `lines` (array of strings) — each element is one log line
	- `text` (string) — multi-line text to split into lines
	- `source` (string, optional) — source identifier applied when missing

	Example request (curl):

```bash
curl -sS -X POST http://localhost:8000/process \
	-H 'Content-Type: application/json' \
	-d '{"lines": ["device=cam-01 motion detected ip=10.0.0.9", "{\"source\":\"app1\",\"timestamp\":\"2026-08-24T15:04:05\",\"user\":\"alice\"}"]}'
```

- `GET /schema` — returns the `student2_schema.json` used to validate records.

Notes
- Response format: `POST /process` returns a JSON array of Student 2 records. Each record
	contains exactly the seven frozen fields and does NOT include internal fields such as
	`raw`.

	Example success response (HTTP 200):

```json
[
	{
		"source": "app1",
		"timestamp": "2026-08-24T15:04:05+00:00",
		"event_type": "LOGIN",
		"user": "alice",
		"ip_address": "192.168.1.10",
		"device": "host-1",
		"description": "User login successful"
	}
]
```

- Error responses:
	- HTTP 400: missing `lines` or `text` in request body.
	- HTTP 500: server-side error (e.g., schema not found).

- `raw` and other internal metadata are preserved inside the processing pipeline for
	traceability, but they are intentionally excluded from API responses to preserve the
	frozen Student 2 contract.

- In production, run behind a proper ASGI server and add auth, rate-limiting, and input
	validation as needed.

Contributing
------------
- Open an issue describing the change or feature.
- Send pull requests against `main` with tests for new behavior.

Contact
-------
If you need help, message the repo owner or open an issue in this repository.
