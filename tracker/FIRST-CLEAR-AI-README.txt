BusBase First Eastern Counties clear-AI network build
======================================================

Voice profile: clear
Reference voice: Poplar Avenue
Clear stop-name recordings in this build: 284
Static route/stop entries: 289
Browser/system text-to-speech: DISABLED

How it works
------------
* The public tracker reads the full physical stop sequence from each real First journey.
* Next stop = clear-AI 'Next stop' prefix + clear-AI stop-name clip.
* This stop = clear-AI 'This stop' prefix + the same clear-AI stop-name clip.
* The shared player and recording bank are in /tracker/admin/announcement-bank.js.
* Stops encountered on a First journey without a clear recording are stored in
  busbase_first_missing_clear_ai_v1 and shown in the admin announcement page.
* A machine-readable list of recorded names is in:
  /tracker/admin/first-clear-ai-coverage.json

This build intentionally never substitutes a browser/system voice.
