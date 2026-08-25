from pydantic import BaseModel


class DetectionEvent(BaseModel):
    evidence_id: str
    timestamp: float
    frame_number: int
    event_type: str
    detected_object: str