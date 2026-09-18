BusBase shared AI announcement bank

announcement-bank.js is the single playback engine and recording bank for both:
- /tracker/index.html
- /tracker/admin/index.html

Voice profile: clear — the same AI voice used for Poplar Avenue.
There is no browser/system speech synthesis fallback.
The live tracker resolves its live BusTimes stop against the route/stop metadata stored here, then plays the exact same Next stop / This stop text and MP3 used by the admin demo.
