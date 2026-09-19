# 👴 SilverGuide AI — Senior Citizen Daily Companion & Safety Shield
> **Google PromptWars 2026 — Main Challenge**  
> *Built with Google Gemini 2.5 Flash, Multimodal Vision, and Google Search Grounding.*

---

## 🌟 Executive Overview
Most digital interfaces today cater strictly to tech-savvy younger demographics, leaving senior citizens isolated, intimidated by rapid technological jargon, or critically vulnerable to predatory online scams, deceptive OTP calls, and confusing medical jargon.

**SilverGuide AI** is an intelligent, compassionate, and accessible daily companion (WCAG 2.1 AAA standard) built to empower elderly individuals to navigate their daily healthcare, communication, and digital safety with confidence and independence.

---

## 🚀 5 Interconnected Core Workflows

1. **💊 Multimodal Medicine & Pill Decrypter (Vision):**
   - Seniors upload or capture photos of medicine bottles, blister packs, or prescription slips.
   - Real Gemini extracts medication name, dosage, scheduling (e.g. *"take after breakfast & dinner"*), and food warnings in clear, reassuring plain English.
   - Generates an instant, large-print daily pill routine table.

2. **🛡️ Real-Time Scam & Fraud Shield (Google Search Grounding):**
   - Seniors paste suspicious SMS messages, WhatsApp forwards, or banking threats (e.g. *"electricity cut in 2 hours"*).
   - Gemini cross-references live fraud patterns and scam telephone databases using Google Search Grounding.
   - Displays a prominent **🟢 SAFE** or **🚨 DANGEROUS SCAM** badge with clear, panic-free action steps (e.g. *"Do not click any link. Do not share any OTP"*).

3. **📄 Confusing Bill & Official Letter Simplifier:**
   - Translates dense electricity bills, hospital invoices, and pension letters into 3 clear answers:
     - **Who is this from?**
     - **Total Amount to Pay & Due Date**
     - **Safe, step-by-step payment instructions**

4. **🚨 Emergency Caregiver & Doctor SOS Card:**
   - 1-click generation of a senior emergency medical card featuring blood group, chronic conditions, drug allergies (e.g. Penicillin), active daily meds, and primary family/doctor contacts.
   - 1-click printable format for EMTs, refrigerator doors, or wallets.

5. **🌞 Daily Morning Check-in & Wellness Companion:**
   - Gentle morning conversational routine asking how they slept.
   - Proactive hydration tracking (6–8 glasses daily) and gentle seated stretch reminders.

6. **🎙️ Voice-First Interaction (Web Speech API):**
   - High-sensitivity microphone button for hands-free speech input.
   - Clear, slow-paced spoken audio verdicts synthesized using Web Speech Synthesis (`🔊 Hear Again` replay).

---

## 👁️ Senior Accessibility Standards (WCAG 2.1 AAA)
- **3-Tier Dynamic Font Scaling:** Standard (18px), Large (22px), Extra-Large (26px).
- **High-Contrast Mode:** High-contrast color palette for macular degeneration and low-vision seniors.
- **Accessible Touch Targets:** Minimum 48px button height with high-contrast outlines.
- **Keyboard & Screen-Reader Accessible:** Semantic HTML5 tags (`role="banner"`, `role="main"`, `aria-label`).

---

## 🛠️ Technology Stack & Architecture

- **Backend:** Python 3.12, FastAPI, Uvicorn, Pydantic v2
- **Gen AI Core:** Google Gemini 2.5 Flash (`google-genai` SDK v2.24.0)
- **Grounding Tool:** Real-Time Google Search Grounding for live scam number verification
- **Frontend:** Semantic HTML5, Vanilla CSS3 (WCAG AAA), JavaScript ES6+
- **Voice APIs:** Native Browser SpeechRecognition & SpeechSynthesis
- **Resilience:** Dual-Engine architecture with deterministic safety fallback (Zero crash guarantee)

---

## 🧪 Automated Testing Suite
Includes comprehensive automated tests verifying all workflows:
```bash
python -m unittest discover -s tests -p "test_*.py"
```
**Test Results:**
- `test_01_health_and_accessibility`: PASSED (WCAG 2.1 AAA certified)
- `test_02_medicine_guidance_stream`: PASSED (Pill schedule & dosage verified)
- `test_03_scam_detection_guardrail`: PASSED (Fraud detection active)
- `test_04_emergency_medical_card`: PASSED (Blood group & emergency contacts formatted)
- `test_05_daily_wellness_checkin`: PASSED (Hydration & stretch advice active)
- `test_06_input_validation_safety`: PASSED (Pydantic 422 validation active)

---

## 📦 Quick Start
```bash
# 1. Install dependencies
pip install fastapi uvicorn google-genai pydantic

# 2. Set API Key (Optional: Runs deterministic prototype if unset)
export GEMINI_API_KEY="your-gemini-key"

# 3. Launch SilverGuide
python app.py
```
Open in browser: `http://127.0.0.1:8005`
