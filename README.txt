MONTHLY AUTOMATIC STAFF ROTA — NO FIREBASE

FEATURES
- Full month shown in one rota.
- Rides appear across the top.
- Add staff and rides.
- Choose how many staff each ride needs.
- Mark any staff member as off on a particular date.
- When someone is marked off, their assignment is removed.
- Another available staff member is assigned automatically.
- Work is balanced across the month.
- The system tries not to keep putting the same person on the same ride.
- Manual assignment changes are supported.
- Public viewer page shows the published monthly rota.

FILES
- maker.html: create and manage the rota
- viewer.html: public read-only rota
- config.js: Worker URL
- worker.js: Cloudflare Worker backend

CLOUDFLARE SETUP
1. Create a Cloudflare Worker.
2. Replace the Worker code with worker.js.
3. Create a Workers KV namespace.
4. Add the KV binding to the Worker:
   Binding variable: ROTA_DATA
5. Add these Worker variables:
   ADMIN_KEY: your private maker-page password
   ALLOWED_ORIGIN: your website URL, such as https://busbase.co.uk
6. Deploy the Worker.
7. Copy the workers.dev URL into config.js.
8. Upload maker.html, viewer.html and config.js to your GitHub Pages folder.

USE
1. Open maker.html.
2. Add staff.
3. Add rides.
4. Set the number of staff needed for each ride.
5. Select a month.
6. Press Days off beside a date.
7. Tick the staff who need that date off.
8. Press Apply days off.
9. The rota immediately replaces them with available staff.
10. Press Save changes to publish it to viewer.html.
