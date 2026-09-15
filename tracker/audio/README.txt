BusBase professional announcement audio
======================================

This build uses direct professional AI MP3 playback URLs.
It does NOT use the old AI Doc Maker generator/session URLs,
the removed on-demand TTS server, or browser speech synthesis.

The same recording bank is used by:
- /tracker/index.html passenger Next stop screen
- /tracker/admin/index.html announcement demo

Current bank: 179 professional recordings covering every announcement
sentence used by the 165 configured stops across the 16 routes.

Live passenger-screen fix
-------------------------
- Uses one persistent audio player for the passenger screen.
- Audio is unlocked by the driver's/user's click before GPS-driven playback.
- A stop is only marked announced after playback actually starts.
- Failed automatic playback is retried on the next live refresh.
- Normalised wording lookup handles minor BusTimes punctuation/locality differences.


September reliability fix
-------------------------
Announcements now never silently fail. The passenger screen and admin demo try the professional AI MP3 first; if that remote clip is unavailable or expired, the exact same announcement is spoken with the best available natural UK voice. Announcements default ON unless the user explicitly switches them OFF.

AI-only playback update
-----------------------
- Browser/system speech synthesis is disabled.
- Next stop, This stop and Lamsey Lane diversion messages use professional AI MP3 recordings only.
- Lamsey Lane diversion applies to routes 34, 35 and 36.
- Inbound towards King's Lynn: Bottom Farm and Poplar Avenue.
- Outbound away from King's Lynn: Bottom Farm only.
- Failed AI playback is retried; it never falls back to browser TTS.
