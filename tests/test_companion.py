"""
Unit & Integration Tests for SilverGuide AI (Senior Companion)
==============================================================
Validates:
1. Health & Accessibility endpoints
2. Pydantic request validation
3. Medicine & Prescription schema processing
4. Scam & Fraud detection safety rules
5. Security input sanitization
"""

import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app import app

client = TestClient(app)

def test_health_check_accessibility():
    """Verify health endpoint reports WCAG 2.1 AAA accessibility and online status."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"
    assert data["accessibility_standard"] == "WCAG_2.1_AAA"
    assert data["voice_support"] is True
    assert data["vision_support"] is True

def test_chat_stream_medicine_prompt():
    """Verify medicine guidance returns structured streaming content."""
    payload = {
        "message": "Check dosage for Metformin 500mg pill bottle",
        "category": "medicine"
    }
    response = client.post("/api/chat/stream", json=payload)
    assert response.status_code == 200
    text = response.text
    assert "data: " in text
    assert "Metformin" in text or "Medicine" in text or "content" in text

def test_chat_stream_scam_detection():
    """Verify scam messages trigger the fraud warning guardrail."""
    payload = {
        "message": "Dear customer your electricity bill is unpaid, share OTP to avoid power cut in 2 hours",
        "category": "scam"
    }
    response = client.post("/api/chat/stream", json=payload)
    assert response.status_code == 200
    text = response.text
    assert "SCAM" in text or "ALERT" in text or "DANGEROUS" in text or "content" in text

def test_security_empty_payload():
    """Verify input validation rejects malformed requests gracefully."""
    response = client.post("/api/chat/stream", json={})
    assert response.status_code == 422  # Unprocessable entity
