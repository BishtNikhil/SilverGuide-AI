"""
Main entry point for SilverGuide AI Companion.
Supports universal cloud deployment, Docker containers, and local execution.
"""

import os
import sys
from app import app

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Launching SilverGuide AI on http://{host}:{port}")
    uvicorn.run("app:app", host=host, port=port, reload=False)
