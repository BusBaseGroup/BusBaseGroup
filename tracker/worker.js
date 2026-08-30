const BUSTIMES_LIVE_URL = 'https://bustimes.org/vehicles.json';
const BUSTIMES_OPERATOR = 'LYNX';
const CACHE_SECONDS = 15;
const DEFAULT_FIREBASE_PROJECT_ID = 'busbase-bus-tracker';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return json({
          ok: true,
          source: 'bustimes.org',
          operatorFilter: BUSTIMES_OPERATOR
        }, 200, cors);
      }

      if (url.pathname === '/api/vehicles' && request.method === 'GET') {
        const [live, mappings] = await Promise.all([
          getLiveVehicles(request, ctx),
          getPublicMappings(env)
        ]);

        const vehicles = live.map(vehicle =>
          toPublicVehicle(vehicle, mappings.get(vehicle.machineId))
        );

        return json({
          ok: true,
          source: 'bustimes.org',
          generatedAt: new Date().toISOString(),
          vehicles
        }, 200, cors);
      }

      if (url.pathname === '/api/admin-vehicles' && request.method === 'GET') {
        const token = getBearerToken(request);
        if (!token) {
          return json({ ok: false, error: 'Unauthorised' }, 401, cors);
        }

        const uid = decodeFirebaseUid(token);
        if (!uid) {
          return json({ ok: false, error: 'Unauthorised' }, 401, cors);
        }

        const admin = await verifyAdminWithFirestore(env, uid, token);
        if (!admin) {
          return json({ ok: false, error: 'Forbidden' }, 403, cors);
        }

        const vehicles = await getLiveVehicles(request, ctx);
        return json({ ok: true, source: 'bustimes.org', vehicles }, 200, cors);
      }

      return json({ ok: false, error: 'Not found' }, 404, cors);
    } catch (error) {
      console.error(error);
      return json({
        ok: false,
        error: error?.message || 'Unexpected server error.'
      }, 500, cors);
    }
  }
};

async function getLiveVehicles(request, ctx) {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = '/__cache/bustimes-live';
  cacheUrl.search = '';
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached.json();

  const feedUrl = new URL(BUSTIMES_LIVE_URL);
  feedUrl.searchParams.set('operator', BUSTIMES_OPERATOR);

  const response = await fetch(feedUrl.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'BusTracker/1.0'
    },
    redirect: 'follow'
  });

  if (!response.ok) {
    throw new Error(`BusTimes live feed returned HTTP ${response.status}.`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('json')) {
    throw new Error('BusTimes returned an unexpected response instead of live JSON.');
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('BusTimes returned an unexpected live-data format.');
  }

  const seen = new Map();

  for (const item of payload) {
    const vehicle = parseBusTimesVehicle(item);
    if (!vehicle) continue;

    const previous = seen.get(vehicle.machineId);
    if (!previous || newer(vehicle.recordedAt, previous.recordedAt)) {
      seen.set(vehicle.machineId, vehicle);
    }
  }

  const vehicles = [...seen.values()];

  const cacheResponse = new Response(JSON.stringify(vehicles), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_SECONDS}`
    }
  });

  ctx.waitUntil(cache.put(cacheKey, cacheResponse));
  return vehicles;
}

function parseBusTimesVehicle(item) {
  if (!item || typeof item !== 'object') return null;

  const coordinates = Array.isArray(item.coordinates)
    ? item.coordinates
    : Array.isArray(item.location?.coordinates)
      ? item.location.coordinates
      : null;

  if (!coordinates || coordinates.length < 2) return null;

  const longitude = Number(coordinates[0]);
  const latitude = Number(coordinates[1]);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  const vehicleInfo = item.vehicle && typeof item.vehicle === 'object'
    ? item.vehicle
    : {};

  // BusTimes' public live JSON does not expose the raw source VehicleRef/code.
  // Its vehicle URL identifies the ticket-machine/vehicle record used by the
  // live map, so we use the final URL slug as our stable private mapping key.
  const machineId = vehicleKeyFromBusTimes(vehicleInfo, item);
  if (!machineId) return null;

  const service = item.service && typeof item.service === 'object'
    ? item.service
    : {};

  const route = clean(
    service.line_name ??
    item.route_name ??
    item.line_name ??
    item.route ??
    ''
  );

  const destination = clean(
    item.destination ??
    item.destination_name ??
    item.headsign ??
    item.trip?.headsign ??
    ''
  );

  const origin = clean(
    item.origin ??
    item.origin_name ??
    ''
  );

  const recordedAt = normalizeDate(
    item.datetime ??
    item.recorded_at ??
    item.recordedAt ??
    item.timestamp ??
    item.time
  );

  const bearing = numberOrNull(
    item.direction ??
    item.bearing ??
    item.heading
  );

  return {
    machineId,
    machineLabel: machineLabelFromBusTimes(vehicleInfo, machineId),
    route,
    lineRef: clean(item.service_id ?? service.id ?? service.url ?? ''),
    direction: '',
    origin,
    destination,
    destinationRef: clean(item.destination_ref ?? ''),
    latitude,
    longitude,
    bearing,
    recordedAt,
    journeyRef: clean(item.journey_id ?? item.journeyRef ?? item.trip_id ?? '')
  };
}

function vehicleKeyFromBusTimes(vehicleInfo, item) {
  const url = clean(vehicleInfo.url);
  if (url) {
    const bits = url.split('/').filter(Boolean);
    const slug = bits[bits.length - 1] || '';
    if (slug) return slug.slice(0, 180);
  }

  const explicit = clean(
    item.vehicle_id ??
    item.vehicleId ??
    vehicleInfo.id ??
    ''
  );
  if (explicit) return `bt-${explicit}`.slice(0, 180);

  // Last-resort fallback. Normally Lynx items have vehicle.url.
  const name = clean(vehicleInfo.name);
  if (name) return `bt-${slugify(name)}`.slice(0, 180);

  return '';
}

function machineLabelFromBusTimes(vehicleInfo, machineId) {
  const name = clean(vehicleInfo.name);

  // A BusTimes vehicle name often starts with the fleet/ticket-machine-list
  // label (for example "62 - SK21 FNH"). Only use the first part as a short
  // admin/public label; machineId remains the actual Firestore mapping key.
  if (name.includes(' - ')) {
    const first = clean(name.split(' - ')[0]);
    if (first) return first;
  }

  return machineId;
}

async function getPublicMappings(env) {
  const projectId = env.FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_PROJECT_ID;
  const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/vehicles?pageSize=1000`;
  const response = await fetch(endpoint, {
    headers: { 'Accept': 'application/json' }
  });

  if (response.status === 404) return new Map();
  if (!response.ok) {
    throw new Error(`Could not read vehicle mappings from Firestore (HTTP ${response.status}).`);
  }

  const payload = await response.json();
  const map = new Map();

  for (const document of payload.documents || []) {
    const machineId = decodeURIComponent(document.name.split('/').pop() || '');
    if (!machineId) continue;
    map.set(machineId, firestoreFieldsToObject(document.fields || {}));
  }

  return map;
}

async function verifyAdminWithFirestore(env, uid, token) {
  const projectId = env.FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_PROJECT_ID;
  const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/admins/${encodeURIComponent(uid)}`;
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) return false;

  try {
    const document = await response.json();
    const fields = firestoreFieldsToObject(document.fields || {});
    return fields.admin === true;
  } catch {
    return false;
  }
}

function toPublicVehicle(vehicle, mapping) {
  if (mapping) {
    // Deliberately do NOT return machineId or machineLabel here.
    return {
      id: `mapped:${mapping.fleetNumber || mapping.registration || vehicle.machineId}`,
      mapped: true,
      fleetNumber: clean(mapping.fleetNumber),
      registration: clean(mapping.registration),
      vehicleType: clean(mapping.vehicleType),
      livery: clean(mapping.livery),
      route: vehicle.route,
      lineRef: vehicle.lineRef,
      direction: vehicle.direction,
      origin: vehicle.origin,
      destination: vehicle.destination,
      destinationRef: vehicle.destinationRef,
      latitude: vehicle.latitude,
      longitude: vehicle.longitude,
      bearing: vehicle.bearing,
      recordedAt: vehicle.recordedAt,
      journeyRef: vehicle.journeyRef
    };
  }

  return {
    id: `machine:${vehicle.machineId}`,
    mapped: false,
    machineId: vehicle.machineId,
    machineLabel: vehicle.machineLabel,
    route: vehicle.route,
    lineRef: vehicle.lineRef,
    direction: vehicle.direction,
    origin: vehicle.origin,
    destination: vehicle.destination,
    destinationRef: vehicle.destinationRef,
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    bearing: vehicle.bearing,
    recordedAt: vehicle.recordedAt,
    journeyRef: vehicle.journeyRef
  };
}

function firestoreFieldsToObject(fields) {
  const out = {};
  for (const [key, value] of Object.entries(fields)) {
    out[key] = firestoreValue(value);
  }
  return out;
}

function firestoreValue(value) {
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('timestampValue' in value) return value.timestampValue;
  if ('nullValue' in value) return null;
  return '';
}

function getBearerToken(request) {
  const header = request.headers.get('Authorization') || '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match ? match[1] : '';
}

function decodeFirebaseUid(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return '';

    const normalized = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const padded = normalized.padEnd(
      Math.ceil(normalized.length / 4) * 4,
      '='
    );

    const payload = JSON.parse(atob(padded));
    return String(payload.user_id || payload.sub || '');
  } catch {
    return '';
  }
}

function normalizeDate(value) {
  if (value === null || value === undefined || value === '') {
    return new Date().toISOString();
  }

  if (typeof value === 'number') {
    const milliseconds = value < 100000000000 ? value * 1000 : value;
    const date = new Date(milliseconds);
    return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  }

  const text = clean(value);
  if (/^\d+(?:\.\d+)?$/.test(text)) {
    const number = Number(text);
    const milliseconds = number < 100000000000 ? number * 1000 : number;
    const date = new Date(milliseconds);
    return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  }

  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function slugify(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'vehicle';
}

function newer(a, b) {
  return (Date.parse(a || '') || 0) >= (Date.parse(b || '') || 0);
}

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function clean(value) {
  return String(value ?? '').trim();
}

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': (env.ALLOWED_ORIGIN || '*').trim(),
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'X-Content-Type-Options': 'nosniff'
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders
    }
  });
}
