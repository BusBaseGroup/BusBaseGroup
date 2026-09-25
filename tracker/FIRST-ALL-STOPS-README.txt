BusBase – First Eastern Counties all-stop support
===================================================

This build removes the X1-only physical-stop restriction.

PUBLIC TRACKER
- First Eastern Counties remains live alongside Lynx.
- For ANY First route, BusBase loads the actual BusTimes vehicle journey details.
- The full physical stop sequence from that journey is used by the Next Stop screen.
- The full route stop list is cached in the browser under:
  busbase_first_eastern_counties_stop_catalogue_v3
- The catalogue grows automatically as First vehicles/routes are viewed.

ADMIN ANNOUNCEMENT PAGE
- Separate Lynx / First Eastern Counties operator selector.
- First route selector includes the full First route-code set used by the current network data.
- For First, the stop list is read from the physical stops discovered from real BusTimes journeys,
  rather than an X1-only static list.
- Clear-AI availability is shown beside each discovered stop.
- Browser/system speech synthesis remains disabled.

AUDIO
- The shared clear-AI player is still /tracker/admin/announcement-bank.js.
- If a discovered First stop already has a clear-AI stop-name clip, it plays normally.
- Stops discovered from BusTimes that do not yet have a stored clear-AI clip are explicitly shown
  as needing a recording; the build does not silently substitute a browser voice.
