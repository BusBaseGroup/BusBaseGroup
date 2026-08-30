BUS TRACKER - DIRECT BUSTIMES TEST VERSION

This version has NO API_BASE and NO map API key.

Live positions are requested directly from:
https://bustimes.org/vehicles.json?operator=LYNX

Files:
- index.html : public tracker
- admin.html : Firebase admin vehicle mapping
- firestore.rules : Firestore rules

IMPORTANT:
This is a test/direct-browser version. If bustimes.org does not allow CORS from your website, the browser will block the live request. In that case a tiny backend/proxy is unavoidable.

Mapped vehicle IDs are hidden in the page UI, but because this version fetches BusTimes directly in the browser, a technical user can still inspect the raw BusTimes request in browser developer tools.
