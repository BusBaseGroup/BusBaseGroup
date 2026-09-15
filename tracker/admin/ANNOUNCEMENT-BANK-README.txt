BusBase AI announcement architecture
===================================

Single source of truth:
  /tracker/admin/announcement-bank.js

Both pages load that file:
  /tracker/index.html             (live passenger Next Stop screen)
  /tracker/admin/index.html       (admin announcement demo)

Rules:
- AI-generated professional MP3s only.
- NO Web Speech API / speechSynthesis / browser voice.
- NO device voice fallback.
- If an AI clip is missing or cannot play, the code reports/retries it rather than speaking with the browser.
- Lamsey Lane diversion warning applies to routes 34, 35 and 36 using the same bank.

To replace an AI clip later, update its URL once in announcement-bank.js. Both the admin demo and live passenger screen will then use the new clip.
