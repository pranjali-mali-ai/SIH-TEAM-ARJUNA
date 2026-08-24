from pathlib import Path
import shutil
import uuid

from metadata_extractor import extract_metadata


# Main storage directory
STORAGE_DIR = Path("../../storage/evidence")
# STORAGE_DIR = Path("storage/evidence") (changes the path of the evidence)


def generate_evidence_id() -> str:
    """
    Generate a unique Evidence ID using UUID.
    """

    return str(uuid.uuid4())


def save_evidence(file, evidence_id: str) -> Path:
    """
    Save the uploaded evidence file.

    Structure:

    storage/
        evidence/
            <evidence_id>/
                filename.mp4
    """

    evidence_directory = STORAGE_DIR / evidence_id

    # Create directory if it doesn't exist
    evidence_directory.mkdir(
        parents=True,
        exist_ok=True
    )

    file_path = evidence_directory / file.filename

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path


def process_evidence(file):
    """
    Complete Student 1 evidence ingestion process.

    Steps:
    1. Generate Evidence ID
    2. Save original file
    3. Extract metadata
    4. Create final JSON-compatible response
    """

    # Generate unique Evidence ID
    evidence_id = generate_evidence_id()

    # Save original evidence
    file_path = save_evidence(
        file,
        evidence_id
    )

    # Extract metadata
    metadata = extract_metadata(
        str(file_path)
    )

    # Create response
    evidence_data = {
        "evidence_id": evidence_id,
        "filename": file.filename,
        "file_size": metadata["file_size"],
        "file_format": metadata["file_format"],
        "duration": metadata["duration"],
        "creation_time": metadata["creation_time"],
        "modification_time": metadata["modification_time"],
        "storage_path": str(file_path),
        "metadata": metadata["metadata"]
    }

    return evidence_data