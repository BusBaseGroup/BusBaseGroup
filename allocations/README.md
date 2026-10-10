# Go-Ahead London — OpenOMSI allocations

Source repository: https://github.com/BusBaseGroup/BusBaseGroup/tree/main/vehchecks

This version uses the existing `vehicle-checks-gag` Firebase web app configuration, reads the existing `vehicleChecks` collection, and matches actual defect reports as submitted by `vehchecks/submission-sync.js`:

- `date`: ISO timestamp, compared to selected operating date (YYYY-MM-DD)
- `fleet`: fleet number / registration typed by driver
- `overall`: `PASS` or `FAIL / DEFECTS FOUND`
- `failed`: list of failed inspection items

It uses the existing original administrator IDs, additional supervisor ID, and the email-verified `supervisorInvites/{email}` invitations recognised by `/vehchecks/admin`. These are public client identifiers, **not secrets**. Only the Firebase security rules can enforce authorisation, not the frontend.

## Publish / activate

1. Add this `index.html` as `allocations/index.html` on the same GitHub Pages repository. Do not replace `vehchecks/index.html`.
2. MERGE (do not replace) `firestore.rules` into your current rules in Firebase Console → Firestore Database → Rules. Firebase rules are NOT deployed by uploading to GitHub Pages. Keep all existing `/vehchecks` rules. In particular, authenticated supervisor access to `vehicleChecks` must continue to work.
3. Test using an existing supervisor account and a non-supervisor account. Non-supervisors should not get access under the matching rules.
4. Add fleet and permitted routes in Management. For exact OMSI Addon London duty matching, import locally sourced duty data using the supplied CSV template. This app cannot read locally installed OMSI timetable files from a GitHub Pages webpage.
5. Check one vehicle on `/vehchecks`, confirm submission sync succeeds, and verify the allocation changes colour on the same date, using the exact same fleet string. Failed check is not automatically engineering clearance. VOR requires management to return it to service.

## Important

The website uses Firestore listeners, but live end-to-end functionality cannot be verified without Firebase rules, suitable user accounts and real Firestore records. Do not claim deployment is complete until both the GitHub file AND actual Firebase rules have been published/tested.

This is an OpenOMSI roleplay tool, not official Go-Ahead London software.


## London vehicle types
Sign in as a supervisor and open Management → Fleet & VOR → Add London bus types. This imports 80 curated vehicle types to Firestore without overwriting existing records. Includes 4 stock Addon London vehicles, modern, and historic types. Additional subtypes may be added manually.
