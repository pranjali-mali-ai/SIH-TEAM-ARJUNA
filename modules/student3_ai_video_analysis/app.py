from pathlib import Path
import shutil
import uuid

from fastapi import FastAPI, UploadFile, File, HTTPException

from video_processor import VideoProcessor
from schemas import DetectionEvent


app = FastAPI(
    title="AI Video Analysis Module",
    description="Student 3 - AI Video Analysis API",
    version="1.0.0"
)


video_processor = VideoProcessor()


TEMP_DIR = Path("temp_videos")
TEMP_DIR.mkdir(
    parents=True,
    exist_ok=True
)


@app.get("/")
def root():
    return {
        "message": "AI Video Analysis Module is running"
    }


@app.post(
    "/analysis/upload",
    response_model=list[DetectionEvent]
)
async def analyze_video(
    file: UploadFile = File(...)
):
    """
    Upload a video and run AI object detection.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided"
        )

    # Generate temporary filename
    temporary_id = str(uuid.uuid4())

    extension = Path(file.filename).suffix

    video_path = TEMP_DIR / f"{temporary_id}{extension}"

    try:

        # Save uploaded video temporarily
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        # Use generated ID as evidence ID for prototype
        evidence_id = temporary_id

        # Run video analysis
        events = video_processor.process_video(
            str(video_path),
            evidence_id
        )

        return events

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Video analysis failed: {str(e)}"
        )

    finally:

        # Delete temporary video
        if video_path.exists():
            video_path.unlink()