BusBase – Lynx + First Eastern Counties
=========================================

LIVE TRACKING
- Lynx Bus and First Eastern Counties are both loaded on the public tracker.
- First Eastern Counties live vehicles use the FECS BusTimes feed.
- Use the operator filter to show All operators, Lynx Bus, or First Eastern Counties.
- First vehicle IDs are namespaced so they cannot clash with existing Lynx Firebase mappings.

ANNOUNCEMENTS
- Browser/system text-to-speech is NOT used.
- Both operators use /tracker/admin/announcement-bank.js.
- Voice profile: clear AI (same BusBase voice used for Poplar Avenue).
- The First starter announcement pack contains physical-stop coverage for X1 in the
  current bank, plus clear-AI recordings / route skeletons for major stops on
  1, 1A, 2, 7, 8, 11, 11A, X2, X21, X22, PR1 and Excel A/B/C/D.
- The tracker itself is network-wide; First announcement audio will only play where
  a clear-AI recording exists in the shared bank.

LYNX
- Existing Lynx announcements and special-warning logic remain included.
- Lamsey Lane diversion and Whiteway Road passing-place messages remain in the build.
