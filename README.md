# 👴 SilverGuide AI — Senior Citizen Daily Companion & Guardian
> **Google PromptWars 2026 — Warm-Up Challenge**  
> *Built with Google Gemini 2.5 Flash, Multimodal Vision, and Google Search Grounding.*

---

## 🌟 Overview
Most digital tools are designed for tech-savvy younger users, leaving seniors feeling overwhelmed, vulnerable to scams, or struggling to read tiny fonts and complex language.

**SilverGuide AI** is an intelligent, highly accessible (WCAG 2.1 AAA), voice-first daily companion designed specifically to empower senior citizens with independence, confidence, and safety.

---

## 🚀 Key Functional Capabilities

1. **💊 Medicine & Pill Bottle Decrypter (Multimodal Vision):**
   - Seniors upload or capture a photo of their medicine bottle or handwritten prescription.
   - Extracts medication name, exact dosage, schedule (e.g. *"after breakfast & dinner"*), and food warnings in plain, reassuring language.

2. **🛡️ Real-Time Scam & Fraud Shield (Google Search Grounding):**
   - Analyzes suspicious SMS, WhatsApp forwards, or lottery/banking threats.
   - Identifies urgency triggers, fake URLs, and OTP traps.
   - Displays a prominent **🟢 SAFE** or **🚨 DANGEROUS SCAM** badge with clear, panic-free action steps.

3. **📄 Complex Bill & Letter Simplifier:**
   - Translates complicated electricity bills, pension letters, and insurance notices into:
     - **Who is this from?**
     - **Total Amount Due & Due Date**
     - **Simple, step-by-step payment instructions**

4. **🎙️ Voice-First Interaction & Gentle Audio Playback:**
   - Big, friendly Microphone button powered by the native Web Speech Recognition API.
   - Synthesizes clear, gentle, slow-paced audio responses using Web Speech Synthesis.

5. **👁️ Senior-First Accessibility (WCAG 2.1 AAA Compliant):**
   - Dynamic 3-level font scaling: **Standard (18px)**, **Large (22px)**, **Extra-Large (26px)**.
   - 1-Click **High Contrast Mode** for low-vision seniors.
   - Large 48px+ touch targets with zero confusing tech jargon.
   - 1-Click **Large-Print Reminder Card** print export for the refrigerator.

---

## 🛠️ Technology Stack & Architecture

- **Backend:** Python 3.12, FastAPI, Uvicorn, Pydantic v2
- **Gen AI Core:** Google Gemini 2.5 Flash (`google-genai` SDK v2.24.0)
- **Grounding & Tools:** Google Search Grounding for live scam verification
- **Frontend:** Semantic HTML5, Vanilla CSS3 (WCAG AAA), JavaScript ES6+
- **Voice APIs:** Web Speech Recognition & Web Speech Synthesis
- **Safety Shield:** In-memory verification critic & medical caution guardrail

---

## 🧪 Testing & Verification
Includes automated test suites:
```bash
python -m unittest discover -s tests -p "test_*.py"
```

---

## 📦 Quick Start
```bash
# 1. Install dependencies
pip install fastapi uvicorn google-genai pydantic

# 2. Set API Key (Optional: Runs deterministic senior fallback if unset)
export GEMINI_API_KEY="your-gemini-key"

# 3. Launch Companion
python app.py
```
Open in browser: `http://127.0.0.1:8005`
