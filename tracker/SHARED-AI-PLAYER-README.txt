BusBase passenger announcement build — 18 September 2026

AI voice
--------
- AI voice only: voice profile "clear", matching the Poplar Avenue recording.
- Browser/system speech synthesis is not used.
- The admin folder is the single source of truth:
  /tracker/admin/announcement-bank.js
- The live Next Stop screen and admin demo both call the same shared AI player.
- All 173 stops currently stored in the admin stop bank have both Next stop and This stop AI recordings.
- 183 unique stop announcement scripts are covered by the shared bank.

Passenger screen
----------------
- Redesigned full-screen passenger layout with larger stop text, route/destination strip,
  upcoming-stop cards, clearer timing information and high-contrast passenger alerts.
- AI announcement fires when the screen changes to Next stop.
- AI announcement fires when the screen changes to This stop.

Whiteway Road passing place
---------------------------
Route 36: while travelling between the Deepdale side and Church Lane/Church Walk side,
the screen shows:
  "This bus may wait until the oncoming bus passes safely."
and the same message is played using the clear AI voice.
The trigger supports either direction and recognises Burnham Deepdale / Dalegate Market
and Church Lane / Church Walk wording.

Lamsey Lane diversion
----------------------
Routes 34, 35 and 36 keep the existing diversion announcement:
  "This bus is on diversion. Please speak to the driver."
with the existing Bottom Farm / Poplar Avenue direction rules.
