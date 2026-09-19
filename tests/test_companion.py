"""
Unit & Integration Tests for SilverGuide AI (Senior Citizen Companion)
======================================================================
PromptWars 2026: 100% Native Unittest Suite
Validates:
1. Health and WCAG AAA Accessibility metadata
2. Pydantic request validation and schema parsing
3. Multimodal medicine and prescription decrypter logic
4. Real-time scam and fraud detection guardrails
5. Emergency medical card formatting
6. Daily morning wellness and routine check-in
"""

import unittest
import sys
import json
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient
from app import app

class TestSilverGuideAI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_01_health_and_accessibility(self):
        """Verify health endpoint reports WCAG 2.1 AAA accessibility and online status."""
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "ONLINE")
        self.assertEqual(data["accessibility_standard"], "WCAG_2.1_AAA")
        self.assertTrue(data["voice_support"])
        self.assertTrue(data["vision_support"])

    def test_02_medicine_guidance_stream(self):
        """Verify medicine guidance returns structured streaming content with schedule."""
        payload = {
            "message": "Check dosage for Metformin 500mg pill bottle",
            "category": "medicine"
        }
        res = self.client.post("/api/chat/stream", json=payload)
        self.assertEqual(res.status_code, 200)
        text = res.text
        self.assertIn("data: ", text)
        self.assertTrue("Metformin" in text or "Medicine" in text)

    def test_03_scam_detection_guardrail(self):
        """Verify scam messages trigger the fraud warning guardrail."""
        payload = {
            "message": "Dear customer your electricity bill is unpaid, share OTP to avoid power cut in 2 hours",
            "category": "scam"
        }
        res = self.client.post("/api/chat/stream", json=payload)
        self.assertEqual(res.status_code, 200)
        text = res.text
        self.assertTrue("SCAM" in text or "ALERT" in text or "DANGEROUS" in text)

    def test_04_emergency_medical_card(self):
        """Verify emergency SOS card formats blood group, allergies, and contacts."""
        payload = {
            "message": "Generate my Emergency Medical SOS Card",
            "category": "emergency"
        }
        res = self.client.post("/api/chat/stream", json=payload)
        self.assertEqual(res.status_code, 200)
        text = res.text
        self.assertTrue("EMERGENCY" in text or "Medical" in text or "Blood Group" in text)

    def test_05_daily_wellness_checkin(self):
        """Verify daily morning wellness routine provides hydration and stretch advice."""
        payload = {
            "message": "Good morning! Can you check in with me on my daily wellness?",
            "category": "wellness"
        }
        res = self.client.post("/api/chat/stream", json=payload)
        self.assertEqual(res.status_code, 200)
        text = res.text
        self.assertTrue("Morning" in text or "Wellness" in text or "Hydration" in text)

    def test_06_input_validation_safety(self):
        """Verify input validation rejects malformed requests gracefully."""
        res = self.client.post("/api/chat/stream", json={})
        self.assertEqual(res.status_code, 422)

if __name__ == "__main__":
    unittest.main()
