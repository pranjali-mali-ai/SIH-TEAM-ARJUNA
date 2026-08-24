from pydantic import BaseModel
from typing import Optional, Dict, Any


class EvidenceMetadata(BaseModel):
    evidence_id: str
    filename: str
    file_size: int
    file_format: str
    duration: Optional[float] = None
    creation_time: Optional[str] = None
    modification_time: Optional[str] = None
    storage_path: str
    metadata: Dict[str, Any]