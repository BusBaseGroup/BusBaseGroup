const DATA_KEY = "monthly-staff-rota-v2";

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
      "Cache-Control": "no-store"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    try {
      const url = new URL(request.url);

      if (url.pathname === "/health") return json({ ok: true }, 200, cors);
      if (url.pathname !== "/data") return json({ error: "Not found." }, 404, cors);

      if (request.method === "GET") {
        const saved = await env.ROTA_DATA.get(DATA_KEY, "json");
        return json(saved || emptyData(), 200, cors);
      }

      if (request.method === "PUT") {
        const suppliedKey = request.headers.get("X-Admin-Key") || "";
        if (!env.ADMIN_KEY || suppliedKey !== env.ADMIN_KEY) {
          return json({ error: "Incorrect admin password." }, 401, cors);
        }

        const body = await request.json();
        const clean = validate(body);
        await env.ROTA_DATA.put(DATA_KEY, JSON.stringify(clean));
        return json(clean, 200, cors);
      }

      return json({ error: "Method not allowed." }, 405, cors);
    } catch (error) {
      return json({ error: error.message || "Server error." }, 500, cors);
    }
  }
};

function emptyData() {
  return {
    staff: [],
    rides: [],
    daysOff: {},
    manualAssignments: {},
    updatedAt: null
  };
}

function validate(input) {
  const staff = Array.isArray(input.staff) ? input.staff.slice(0, 150).map((item, index) => ({
    id: text(item.id || crypto.randomUUID(), 80),
    name: text(item.name, 80),
    active: item.active !== false,
    order: Number.isFinite(Number(item.order)) ? Number(item.order) : index
  })).filter(item => item.name) : [];

  const rides = Array.isArray(input.rides) ? input.rides.slice(0, 80).map((item, index) => ({
    id: text(item.id || crypto.randomUUID(), 80),
    name: text(item.name, 80),
    staffNeeded: Math.max(1, Math.min(10, Number(item.staffNeeded) || 1)),
    active: item.active !== false,
    order: Number.isFinite(Number(item.order)) ? Number(item.order) : index
  })).filter(item => item.name) : [];

  const daysOff = {};
  if (input.daysOff && typeof input.daysOff === "object") {
    for (const [date, staffIds] of Object.entries(input.daysOff)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(date) && Array.isArray(staffIds)) {
        daysOff[date] = staffIds.map(id => text(id, 80)).slice(0, 150);
      }
    }
  }

  const manualAssignments = {};
  if (input.manualAssignments && typeof input.manualAssignments === "object") {
    for (const [key, staffIds] of Object.entries(input.manualAssignments)) {
      if (/^\d{4}-\d{2}-\d{2}\|.{1,80}$/.test(key) && Array.isArray(staffIds)) {
        manualAssignments[key] = staffIds.map(id => text(id, 80)).slice(0, 10);
      }
    }
  }

  return {
    staff,
    rides,
    daysOff,
    manualAssignments,
    updatedAt: new Date().toISOString()
  };
}

function text(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json; charset=utf-8" }
  });
}
