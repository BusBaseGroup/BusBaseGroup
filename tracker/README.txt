BUS TRACKER - BUSTIMES + FIREBASE SETUP

THIS VERSION DOES NOT NEED A BODS ACCOUNT OR BODS API KEY.

1. FIREBASE AUTHENTICATION
- Authentication > Sign-in method > enable Email/Password.
- Your admin account is the Firebase user you already created.

2. FIRESTORE ADMIN DOCUMENT
- Collection: admins
- Document ID: your exact Firebase Authentication UID
- Field: admin
- Type: boolean
- Value: true

3. FIRESTORE RULES
- Firestore Database > Rules
- Paste firestore.rules and Publish.

4. FIREBASE AUTHORIZED DOMAIN
- Authentication > Settings > Authorized domains
- Add the domain where the tracker will run, for example busbase.co.uk.

5. CLOUDFLARE WORKER
- Deploy worker.js with wrangler.toml.
- NO BODS secret/API key is needed.
- FIREBASE_PROJECT_ID is already set to busbase-bus-tracker.
- The Worker requests BusTimes' public live JSON endpoint with operator=LYNX.
- Keep the Worker: it gives the website a clean API, caches requests, checks admin access,
  combines your Firestore vehicle mappings, and removes the tracking ID from mapped buses.

6. WEBSITE
- In BOTH index.html and admin.html replace:
  https://YOUR-WORKER.workers.dev
  with your real Worker URL.
- Upload index.html and admin.html to your website/GitHub Pages.

HOW IT WORKS
- The public tracker works without an account.
- Anyone can optionally register/login with Firebase.
- Logged-in users can save favourite vehicles.
- Your Admin button only appears if admins/{your UID} exists and admin is true.
- Admin signs in with the SAME Firebase email/password; there is no separate admin password.
- The Worker only requests the BusTimes live set for operator LYNX.
- Admin matches a live tracking record to your own fleet number / registration / vehicle type.
- Once mapped, the public /api/vehicles response does NOT contain its tracking ID.
- Raw tracking IDs are available through /api/admin-vehicles only to a signed-in Firebase admin.

IMPORTANT ABOUT THE ID
- BusTimes' public live JSON does not expose the original raw provider VehicleRef/ticket-machine
  code. This version therefore uses the BusTimes vehicle-record URL slug as the stable tracking
  key. It is only shown while a vehicle is unknown and in the admin page.
- If you specifically need the original raw VehicleRef from the operator feed, BODS/provider data
  is required. The public tracker still hides the tracking key completely after you map a bus.

BUSTIMES DEPENDENCY
- The live endpoint used by this project is part of the BusTimes website implementation. It does
  not require a key, but it could change in the future. If BusTimes changes it, worker.js may need
  updating.
