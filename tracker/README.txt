BUS TRACKER - ACCURACY + DIRECTION + LIVERY COLOUR UPDATE

Files:
- index.html            Public tracker
- admin.html            Admin vehicle mappings
- firestore.rules       Firebase Firestore security rules

What changed:
- Uses the live BusTimes LYNX vehicle feed directly.
- BusTimes coordinates are read as [longitude, latitude].
- Small GPS drift can be snapped to the nearest rendered road, but ONLY when a suitable road is within 80 metres. Otherwise the raw GPS point is used.
- Direction uses the BusTimes heading when supplied; if it is absent, the tracker calculates direction from consecutive GPS positions.
- Bus markers show a heading arrow and the selected bus card/popup shows compass direction + degrees.
- Admin mappings now include a livery colour. Mapped bus markers and route badges use that colour.
- Admin button check has been separated from favourites/profile loading so it no longer disappears because of a profile read problem.
- Unknown vehicles still show the private tracker ID. Once mapped, public users see fleet/registration/type instead.

Firebase project config is already in the HTML files.
No Google Maps API key, MapLibre API key, BODS key or API_BASE is required by this direct-feed version.

IMPORTANT:
The site cannot invent a GPS location that BusTimes has not received yet. Road snapping only corrects small visible GPS drift; it does not move a bus hundreds of metres based on guesswork.
