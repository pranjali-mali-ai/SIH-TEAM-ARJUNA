"""Lightweight message-bus stubs and trigger producer/consumer examples.

This provides an in-memory bus for testing triggers without Kafka.
"""
import json
import uuid
import datetime
from typing import Callable, List, Dict, Any

from pathlib import Path


class MessageBus:
    def publish(self, topic: str, message: Dict[str, Any]):
        raise NotImplementedError()

    def subscribe(self, topic: str, handler: Callable[[Dict[str, Any]], None]):
        raise NotImplementedError()


class InMemoryBus(MessageBus):
    def __init__(self):
        self.topics: Dict[str, List[Dict[str, Any]]] = {}
        self.handlers: Dict[str, List[Callable[[Dict[str, Any]], None]]] = {}

    def publish(self, topic: str, message: Dict[str, Any]):
        self.topics.setdefault(topic, []).append(message)
        # dispatch to handlers synchronously
        for h in self.handlers.get(topic, []):
            h(message)

    def subscribe(self, topic: str, handler: Callable[[Dict[str, Any]], None]):
        self.handlers.setdefault(topic, []).append(handler)


def make_envelope(action: str, source: str, schema_version: str, payload: Dict[str, Any], **kwargs) -> Dict[str, Any]:
    env = {
        "event_id": str(uuid.uuid4()),
        "created_at": datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "action": action,
        "source": source,
        "source_type": kwargs.get("source_type"),
        "schema_version": schema_version,
        "status": kwargs.get("status", "queued"),
        "raw_location": kwargs.get("raw_location"),
        "normalized_location": kwargs.get("normalized_location"),
        "trace_id": kwargs.get("trace_id"),
        "payload": payload,
    }
    return env


def example_producer(bus: MessageBus, topic: str, source: str, raw_location: str, sample_payload: Dict[str, Any]):
    envelope = make_envelope(
        action="ingest",
        source=source,
        schema_version="student2-v1",
        payload=sample_payload,
        raw_location=raw_location,
    )
    bus.publish(topic, envelope)
    return envelope


def example_consumer(bus: MessageBus, topic: str, handler: Callable[[Dict[str, Any]], None]):
    bus.subscribe(topic, handler)


if __name__ == "__main__":
    # Demo of publishing an ingest trigger and consuming it
    bus = InMemoryBus()
    topic = "ingest-events"

    def print_handler(msg: Dict[str, Any]):
        print("Received trigger:")
        print(json.dumps(msg, indent=2))

    example_consumer(bus, topic, print_handler)

    sample_payload = {
        "source": "app1",
        "timestamp": "2026-08-24T15:04:05Z",
        "event_type": "LOGIN",
        "user": "alice",
        "ip_address": "192.168.1.10",
        "device": "host-1",
        "description": "User login successful",
    }

    env = example_producer(bus, topic, source="host1", raw_location="/var/log/app1.log", sample_payload=sample_payload)
    # Save example envelope for documentation
    Path("example_envelope.json").write_text(json.dumps(env, indent=2))
    print("Published envelope saved to example_envelope.json")
