from fastapi import FastAPI, UploadFile, File, HTTPException

from schemas import EvidenceMetadata
from evidence_service import process_evidence


app = FastAPI(
    title="CCTV/DVR/NVR Evidence Ingestion Module",
    description="Student 1 - Evidence Ingestion API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "CCTV/DVR/NVR Evidence Ingestion Module is running"
    }


@app.post(
    "/evidence/upload",
    response_model=EvidenceMetadata
)
async def upload_evidence(
    file: UploadFile = File(...)
):
    """
    Upload CCTV/DVR/NVR evidence.

    The API:
    - receives the video
    - generates an evidence_id
    - stores the original file
    - extracts metadata
    - returns the frozen Evidence JSON structure
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided"
        )

    try:
        evidence_data = process_evidence(file)

        return evidence_data

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Evidence processing failed: {str(e)}"
        )