import cv2

from detector import ObjectDetector


class VideoProcessor:

    def __init__(self):
        self.detector = ObjectDetector()

    def process_video(self, video_path: str, evidence_id: str):
        """
        Process the video frame by frame.

        Returns a list of detection events.
        """

        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            raise ValueError("Unable to open video file")

        fps = cap.get(cv2.CAP_PROP_FPS)

        if fps <= 0:
            fps = 25.0

        frame_number = 0

        events = []

        while True:

            success, frame = cap.read()

            if not success:
                break

            frame_number += 1

            # Run YOLO detection
            detected_objects = self.detector.detect(frame)

            # Calculate timestamp in seconds
            timestamp = frame_number / fps

            # Create an event for every detected object
            for detected_object in detected_objects:

                event = {
                    "evidence_id": evidence_id,
                    "timestamp": timestamp,
                    "frame_number": frame_number,
                    "event_type": "object_detection",
                    "detected_object": detected_object
                }

                events.append(event)

        cap.release()

        return events