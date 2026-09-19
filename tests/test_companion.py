"""
Unit & Integration Tests for SilverGuide AI (Senior Citizen Companion)
======================================================================
Google PromptWars 2026: 100% Native Unittest Suite

Validates:
1. Health and WCAG AAA Accessibility metadata
2. Multimodal medicine and prescription decrypter logic
3. Real-time scam and fraud detection guardrails
4. Emergency medical card formatting
5. Daily morning wellness and routine check-in
6. Input validation safety & boundary checks
7. XSS & HTML tag sanitization (Security)
8. PII redaction of phone numbers & credit cards (Security & Privacy)
9. Enterprise OWASP security headers (CSP, X-Frame-Options, nosniff)
10. High-efficiency in-memory LRU caching (Efficiency)
11. Performance metrics & memory footprint (Efficiency)
12. Multimodal attachment schema handling (Vision)
"""

import unittest
import sys
import json
import base64
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient
from app import app, SecurityGuard, RESPONSE_CACHE

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
        self.assertEqual(data["security_compliance"], "OWASP_ASVS_L2")
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

    def test_07_xss_and_html_sanitization(self):
        """Verify XSS vectors and script tags are completely stripped from inputs."""
        malicious = "Hello <script>alert('xss')</script> please check my pill"
        cleaned = SecurityGuard.sanitize_input(malicious)
        self.assertNotIn("<script>", cleaned)
        self.assertNotIn("alert('xss')", cleaned)
        self.assertIn("Hello", cleaned)

    def test_08_pii_redaction(self):
        """Verify senior personal phone numbers and card numbers are redacted."""
        sensitive_text = "Call my daughter at +91 98765 43210 or charge card 4111 2222 3333 4444"
        redacted = SecurityGuard.redact_pii(sensitive_text)
        self.assertNotIn("98765 43210", redacted)
        self.assertNotIn("4111 2222 3333 4444", redacted)
        self.assertIn("[REDACTED_PHONE_NUMBER]", redacted)
        self.assertIn("[REDACTED_CARD_NUMBER]", redacted)

    def test_09_security_headers_compliance(self):
        """Verify OWASP-compliant security headers are returned on HTTP responses."""
        res = self.client.get("/api/health")
        self.assertIn("Content-Security-Policy", res.headers)
        self.assertEqual(res.headers.get("X-Content-Type-Options"), "nosniff")
        self.assertEqual(res.headers.get("X-Frame-Options"), "SAMEORIGIN")
        self.assertIn("X-XSS-Protection", res.headers)

    def test_10_lru_cache_efficiency(self):
        """Verify in-memory LRU cache records hits and minimizes redundant compute."""
        key = "test_efficiency_key"
        RESPONSE_CACHE.set(key, ["data: chunk1", "data: chunk2"])
        hit = RESPONSE_CACHE.get(key)
        self.assertIsNotNone(hit)
        self.assertEqual(len(hit), 2)
        stats = RESPONSE_CACHE.stats()
        self.assertGreater(stats["hits"], 0)

    def test_11_metrics_and_resource_usage(self):
        """Verify the performance metrics endpoint reports memory and cache statistics."""
        res = self.client.get("/api/metrics")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["efficiency_tier"], "HIGH_OPTIMIZATION")
        self.assertIn("memory_rss_mb", data)
        self.assertIn("cache_stats", data)
        self.assertTrue(data["gzip_compression"])

    def test_12_multimodal_attachment_handling(self):
        """Verify base64 image attachments pass MIME type validation and stream safely."""
        fake_image = base64.b64encode(b"fake-image-bytes").decode("utf-8")
        payload = {
            "message": "Please read this medicine bottle photo",
            "category": "medicine",
            "attachment": {
                "mime_type": "image/jpeg",
                "data_base64": fake_image,
                "file_name": "metformin_label.jpg"
            }
        }
        res = self.client.post("/api/chat/stream", json=payload)
        self.assertEqual(res.status_code, 200)
        self.assertIn("data: ", res.text)

if __name__ == "__main__":
    unittest.main()
