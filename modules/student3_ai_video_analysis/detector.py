from ultralytics import YOLO


class ObjectDetector:
    def __init__(self, model_path: str = "yolov8n.pt"):
        """
        Load the YOLO model.

        yolov8n.pt is the small YOLO model used for
        initial testing.
        """
        self.model = YOLO(model_path)

    def detect(self, frame):
        """
        Run object detection on one video frame.

        Returns a list of detected object names.
        """

        results = self.model(frame, verbose=False)

        detected_objects = []

        for result in results:
            if result.boxes is None:
                continue

            for box in result.boxes:
                class_id = int(box.cls[0])

                class_name = result.names[class_id]

                detected_objects.append(class_name)

        return detected_objects