"""
Main entry point for SilverGuide AI — Intelligent Daily Companion for Senior Citizens.
Google PromptWars 2026 — Main Challenge: AI For Senior Citizens

This GenAI-powered website serves as an intelligent, accessible, and trustworthy daily
companion for senior citizens, helping them navigate everyday tasks with ease, confidence,
and independence. It goes beyond a simple AI chatbot to simplify complex information,
anticipate needs, and offer proactive assistance tailored to older users.

Supports universal cloud deployment, Docker containers, and local execution.
"""

import os
import sys
from app import app

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Launching SilverGuide AI — Intelligent Daily Companion for Senior Citizens")
    print(f"   URL: http://{host}:{port}")
    uvicorn.run("app:app", host=host, port=port, reload=False)
