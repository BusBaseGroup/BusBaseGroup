BusBase clear AI voice verification
===================================

Voice profile: clear (same voice profile as Poplar Avenue)
Configured stop entries checked: 173
Unique Next stop / This stop scripts checked: 183
Missing AI recordings: 0
Browser/system TTS allowed: NO

Both the public passenger screen and admin demo use:
/tracker/admin/announcement-bank.js

Full per-stop verification is stored in:
/tracker/admin/clear-voice-audit.json


Every-physical-stop fix
-----------------------
The live passenger screen no longer depends only on timing-point entries. It now sends every live BusTimes stop directly to the shared clear-AI player. For routes 34/35/36, the current all-stops names (including intermediate stops such as Kettlewell Lane, Highgate School, Oak Avenue, Nourse Drive, Collingwood Close, Fenside, Fengate, College Drive, Jolly Sailors, Dalegate Market and Church Walk) have dedicated clear-voice stop-name MP3s.
