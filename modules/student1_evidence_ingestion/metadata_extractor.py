from pathlib import Path
from datetime import datetime
import cv2


def get_file_format(file_path: str) -> str:
    """
    Get the file extension.

    Example:
    camera01.mp4 -> mp4
    camera01.avi -> avi
    camera01.dav -> dav
    """

    path = Path(file_path)

    return path.suffix.lower().replace(".", "")


def get_file_size(file_path: str) -> int:
    """
    Get file size in bytes.
    """

    return Path(file_path).stat().st_size


def get_file_times(file_path: str):
    """
    Get filesystem creation and modification times.

    Note:
    These are filesystem timestamps, not necessarily
    the actual CCTV recording timestamp.
    """

    path = Path(file_path)

    creation_time = datetime.fromtimestamp(
        path.stat().st_ctime
    ).isoformat()

    modification_time = datetime.fromtimestamp(
        path.stat().st_mtime
    ).isoformat()

    return creation_time, modification_time


def get_video_metadata(file_path: str):
    """
    Extract video information using OpenCV.

    Returns:
        duration
        fps
        frame_count
        width
        height
    """

    cap = cv2.VideoCapture(file_path)

    if not cap.isOpened():
        raise ValueError("Unable to open video file")

    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    if fps > 0:
        duration = frame_count / fps
    else:
        duration = None

    cap.release()

    return {
        "duration": duration,
        "fps": fps,
        "frame_count": int(frame_count),
        "width": width,
        "height": height
    }


def extract_metadata(file_path: str):
    """
    Extract all metadata required by Student 1.
    """

    file_format = get_file_format(file_path)
    file_size = get_file_size(file_path)

    creation_time, modification_time = get_file_times(
        file_path
    )

    video_metadata = get_video_metadata(file_path)

    return {
        "file_size": file_size,
        "file_format": file_format,
        "duration": video_metadata["duration"],
        "creation_time": creation_time,
        "modification_time": modification_time,
        "metadata": {
            "fps": video_metadata["fps"],
            "frame_count": video_metadata["frame_count"],
            "width": video_metadata["width"],
            "height": video_metadata["height"]
        }
    }