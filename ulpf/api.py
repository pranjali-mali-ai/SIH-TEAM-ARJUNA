from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .student2_processor import process_logs, load_schema

app = FastAPI(title="ulpf API", version="0.1")


class ProcessRequest(BaseModel):
    lines: Optional[List[str]] = None
    text: Optional[str] = None
    source: Optional[str] = None


@app.post("/process")
def process(request: ProcessRequest):
    # Accept either a list of lines or a single multi-line text
    if request.lines:
        lines = request.lines
    elif request.text:
        lines = [l for l in request.text.splitlines()]
    else:
        raise HTTPException(status_code=400, detail="Provide `lines` or `text` in the request body")

    records = process_logs(lines, source=request.source)

    # Convert internal records into the frozen Student 2 contract
    student2_records = [
        {
            "source": r.get("source"),
            "timestamp": r.get("timestamp"),
            "event_type": r.get("event_type"),
            "user": r.get("user"),
            "ip_address": r.get("ip_address"),
            "device": r.get("device"),
            "description": r.get("description"),
        }
        for r in records
    ]

    return student2_records


@app.get("/schema")
def schema():
    s = load_schema()
    if not s:
        raise HTTPException(status_code=500, detail="Schema not available")
    return s
