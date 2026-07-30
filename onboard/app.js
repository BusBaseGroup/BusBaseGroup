"use strict";

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

const CONFIG = Object.freeze({
  nextDistance: 350,
  arrivalDistance: 100,
  departureDistance: 200,
  offRouteDistance: 150,
  offRouteDelayMs: 30000,
  continuationDurationMs: 10000,
  gpsOptions: {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 20000
  }
});

const state = {
  route: null,
  direction: null,
  departure: null,
  stops: [],
  stopIndex: 0,
  active: false,
  atStop: false,
  position: null,
  speedMph: 0,
  accuracy: null,
  gpsWatchId: null,
  gpsInitialised: false,
  nextAnnounced: new Set(),
  arrivalAnnounced: new Set(),
  lastAnnouncement: "",
  voice: null,
  audioEnabled: false,
  manualDiversion: false,
  automaticDiversion: false,
  offRouteSince: null,
  continuationShown: false,
  continuationActive: false,
  displayedService: null,
  displayedDestination: null,
  lastGpsFixAt: null,
  clockTimer: null
};

const el = {};

document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  cacheElements();
  bindEvents();
  loadVoices();
  resetSetup();
  startClock();

  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function cacheElements() {
  [
    "setupScreen", "passengerScreen", "journeyForm", "routeSelect",
    "directionSelect", "journeySelect", "vehicleInput", "setupMessage",
    "startJourneyButton", "routeNumber", "destinationName", "normalDisplay",
    "stopStatePanel", "stopStateLabel", "currentStopName", "connectionMessage",
    "followingStopsPanel", "followingStopName", "secondFollowingStopName",
    "continuationDisplay", "continuationRouteNumber", "continuationDestination",
    "disruptionDisplay", "terminusDisplay", "terminusName", "currentTime",
    "runningStatus", "gpsStatus", "gpsStatusText", "vehicleDisplay",
    "driverPanel", "openDriverPanelButton", "closeDriverPanelButton",
    "driverCurrentStop", "driverDistance", "driverAccuracy", "driverSpeed",
    "previousStopButton", "nextStopButton", "repeatAnnouncementButton",
    "toggleDiversionButton", "restartJourneyButton", "endJourneyButton",
    "gpsDebugOutput", "fullscreenButton", "announcementStatus"
  ].forEach(id => {
    el[id] = document.getElementById(id);
  });
}

function bindEvents() {
  el.routeSelect.addEventListener("change", routeChanged);
  el.directionSelect.addEventListener("change", directionChanged);
  el.journeySelect.addEventListener("change", departureChanged);
  el.journeyForm.addEventListener("submit", startJourney);

  el.openDriverPanelButton.addEventListener("click", () => {
    el.driverPanel.classList.remove("is-hidden");
  });
  el.closeDriverPanelButton.addEventListener("click", () => {
    el.driverPanel.classList.add("is-hidden");
  });

  el.previousStopButton.addEventListener("click", previousStop);
  el.nextStopButton.addEventListener("click", nextStop);
  el.repeatAnnouncementButton.addEventListener("click", repeatAnnouncement);
  el.toggleDiversionButton.addEventListener("click", toggleManualDiversion);
  el.restartJourneyButton.addEventListener("click", restartJourney);
  el.endJourneyButton.addEventListener("click", endJourney);
  el.fullscreenButton.addEventListener("click", enterFullscreen);

  document.addEventListener("keydown", event => {
    if (!state.active) return;
    if (event.key === "ArrowLeft") previousStop();
    if (event.key === "ArrowRight") nextStop();
    if (event.key.toLowerCase() === "d") toggleManualDiversion();
  });
}

function resetSetup() {
  stopGps();
  stopSpeech();
  state.active = false;
  state.route = null;
  state.direction = null;
  state.departure = null;
  state.stops = [];
  state.stopIndex = 0;
  state.position = null;
  state.gpsInitialised = false;
  state.displayedService = null;
  state.displayedDestination = null;
  state.manualDiversion = false;
  state.automaticDiversion = false;
  state.offRouteSince = null;

  el.setupScreen.classList.remove("is-hidden");
  el.passengerScreen.classList.add("is-hidden");
  el.driverPanel.classList.add("is-hidden");
  el.openDriverPanelButton.classList.add("is-hidden");
  el.fullscreenButton.classList.add("is-hidden");
  el.setupMessage.textContent = "";
}

function routeChanged() {
  const service = el.routeSelect.value;
  state.route = window.LYNX_ROUTES[service] || null;
  state.direction = null;
  state.departure = null;

  el.directionSelect.innerHTML = '<option value="">Select direction</option>';
  el.journeySelect.innerHTML = '<option value="">Select journey</option>';
  el.directionSelect.disabled = true;
  el.journeySelect.disabled = true;
  el.startJourneyButton.disabled = true;

  if (!service) {
    el.setupMessage.textContent = "";
    return;
  }

  if (!state.route) {
    el.setupMessage.textContent =
      `Route ${service} is not included in this upload. Add routes/route-${service}.js to enable it.`;
    return;
  }

  const directions = getDirections(state.route);
  directions.forEach((direction, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = direction.name || formatDirection(direction.id);
    el.directionSelect.appendChild(option);
  });

  el.directionSelect.disabled = directions.length === 0;
  el.setupMessage.textContent = directions.length
    ? `${state.route.name || `Service ${service}`} loaded.`
    : "No directions were found in this route file.";
}

function directionChanged() {
  const directions = getDirections(state.route);
  const index = Number(el.directionSelect.value);
  state.direction = el.directionSelect.value === "" ? null : directions[index];
  state.departure = null;

  el.journeySelect.innerHTML = '<option value="">Select journey</option>';
  el.journeySelect.disabled = true;
  el.startJourneyButton.disabled = true;

  if (!state.direction) return;

  const departures = state.direction.departures || [];
  departures.forEach((departure, departureIndex) => {
    const option = document.createElement("option");
    option.value = String(departureIndex);
    option.textContent = departure.label || departure.time || `Journey ${departureIndex + 1}`;
    el.journeySelect.appendChild(option);
  });

  el.journeySelect.disabled = departures.length === 0;
}

function departureChanged() {
  const departures = state.direction?.departures || [];
  const index = Number(el.journeySelect.value);
  state.departure = el.journeySelect.value === "" ? null : departures[index];
  el.startJourneyButton.disabled = !state.departure;
}

function getDirections(route) {
  const journey = route?.journeys?.[0];
  if (!journey) return [];
  if (Array.isArray(journey.directions)) return journey.directions;
  return [{
    id: journey.direction || "outbound",
    name: journey.name,
    destination: journey.destination,
    departures: journey.departures || []
  }];
}

function startJourney(event) {
  event.preventDefault();

  if (!state.route || !state.direction || !state.departure) {
    el.setupMessage.textContent = "Select a route, direction and journey first.";
    return;
  }

  const stops = (state.departure.stops || []).map((stop, index) => ({
    ...stop,
    id: stop.id || `stop-${index}`,
    name: stop.name || `Stop ${index + 1}`,
    announcementName: stop.announcementName || stop.name || `Stop ${index + 1}`,
    lat: Number(stop.lat ?? stop.latitude),
    lng: Number(stop.lng ?? stop.longitude),
    nextRadius: Number(stop.nextRadius) || CONFIG.nextDistance,
    arrivalRadius: Number(stop.arrivalRadius) || CONFIG.arrivalDistance
  }));

  if (!stops.length) {
    el.setupMessage.textContent = "This journey contains no stops.";
    return;
  }

  state.stops = stops;
  state.stopIndex = 0;
  state.active = true;
  state.atStop = false;
  state.position = null;
  state.gpsInitialised = false;
  state.nextAnnounced.clear();
  state.arrivalAnnounced.clear();
  state.manualDiversion = false;
  state.automaticDiversion = false;
  state.offRouteSince = null;
  state.continuationShown = false;
  state.continuationActive = false;
  state.displayedService = state.route.service;
  state.displayedDestination = getDestination();
  state.audioEnabled = true;

  el.setupScreen.classList.add("is-hidden");
  el.passengerScreen.classList.remove("is-hidden");
  el.openDriverPanelButton.classList.remove("is-hidden");
  el.fullscreenButton.classList.remove("is-hidden");

  const vehicle = el.vehicleInput.value.trim();
  el.vehicleDisplay.textContent = vehicle;
  el.vehicleDisplay.classList.toggle("is-hidden", !vehicle);

  updateDisplay();
  setGpsStatus("waiting", "Waiting for GPS");
  startGps();

  speak(
    `Welcome on board Lynx. This is service ${state.displayedService} to ${cleanForSpeech(state.displayedDestination)}.`
  );
}

function getDestination() {
  return state.departure?.destination ||
    state.direction?.destination ||
    state.route?.destination ||
    "Destination";
}

function startGps() {
  stopGps();

  if (!navigator.geolocation) {
    setGpsStatus("error", "GPS not supported");
    updateGpsDebug("This browser does not support geolocation.");
    return;
  }

  state.gpsWatchId = navigator.geolocation.watchPosition(
    gpsUpdated,
    gpsFailed,
    CONFIG.gpsOptions
  );
}

function stopGps() {
  if (state.gpsWatchId !== null) {
    navigator.geolocation.clearWatch(state.gpsWatchId);
    state.gpsWatchId = null;
  }
}

function gpsUpdated(position) {
  if (!state.active) return;

  const { latitude, longitude, accuracy, speed } = position.coords;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

  state.position = { lat: latitude, lng: longitude };
  state.accuracy = Number.isFinite(accuracy) ? accuracy : null;
  state.speedMph = Number.isFinite(speed) ? Math.max(0, speed * 2.236936) : 0;
  state.lastGpsFixAt = new Date();

  setGpsStatus("active", state.accuracy === null
    ? "GPS active"
    : `GPS ±${Math.round(state.accuracy)} m`);

  if (!state.gpsInitialised) initialiseFromNearestRoutePoint();
  processLocation();
}

function gpsFailed(error) {
  const messages = {
    1: "Location permission denied",
    2: "Location unavailable",
    3: "GPS timed out"
  };
  const message = messages[error.code] || "GPS error";
  setGpsStatus("error", message);
  updateGpsDebug(`${message}. ${error.message || ""}`.trim());
}

function initialiseFromNearestRoutePoint() {
  if (!state.position) return;

  let nearestStopIndex = -1;
  let nearestStopDistance = Infinity;

  state.stops.forEach((stop, index) => {
    const distance = distanceToStop(index);
    if (distance < nearestStopDistance) {
      nearestStopDistance = distance;
      nearestStopIndex = index;
    }
  });

  const segment = nearestRouteSegment();
  let target = nearestStopIndex;

  if (segment && nearestStopDistance > getStop(nearestStopIndex)?.arrivalRadius) {
    target = Math.min(segment.index + 1, state.stops.length - 1);
  }

  state.stopIndex = Math.max(0, target);
  state.atStop = distanceToStop(state.stopIndex) <= getStop(state.stopIndex).arrivalRadius;
  state.gpsInitialised = true;
  updateDisplay();
}

function processLocation() {
  const stop = getStop();
  if (!stop || !hasCoordinates(stop)) return;

  const distance = distanceToStop(state.stopIndex);
  const arrivalRadius = stop.arrivalRadius || CONFIG.arrivalDistance;
  const nextRadius = stop.nextRadius || CONFIG.nextDistance;

  if (distance <= nextRadius && distance > arrivalRadius && !state.nextAnnounced.has(stopKey(stop))) {
    state.nextAnnounced.add(stopKey(stop));
    speak(`Next stop, ${cleanForSpeech(stop.announcementName)}.`);
  }

  if (distance <= arrivalRadius) {
    state.atStop = true;
    if (!state.arrivalAnnounced.has(stopKey(stop))) {
      state.arrivalAnnounced.add(stopKey(stop));
      speakArrival(stop);
      handleContinuationAtHunstanton(stop);
    }
  }

  if (state.atStop && distance > CONFIG.departureDistance && state.stopIndex < state.stops.length - 1) {
    state.stopIndex += 1;
    state.atStop = false;
  } else if (!state.atStop) {
    recoverForwardIfNeeded(distance);
  }

  checkDiversion();
  updateDisplay(distance);
}

function recoverForwardIfNeeded(currentDistance) {
  let bestIndex = state.stopIndex;
  let bestDistance = currentDistance;
  const end = Math.min(state.stops.length - 1, state.stopIndex + 4);

  for (let index = state.stopIndex + 1; index <= end; index += 1) {
    const distance = distanceToStop(index);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }

  if (bestIndex > state.stopIndex && bestDistance < 250 && bestDistance + 120 < currentDistance) {
    state.stopIndex = bestIndex;
    state.atStop = bestDistance <= getStop(bestIndex).arrivalRadius;
  }
}

function handleContinuationAtHunstanton(stop) {
  if (state.continuationShown) return;

  const isSpecialJourney =
    String(state.route?.service) === "36" &&
    state.direction?.id === "inbound" &&
    state.departure?.time === "18:00" &&
    /hunstanton/i.test(stop.name);

  if (!isSpecialJourney) return;

  state.continuationShown = true;
  state.continuationActive = true;
  el.continuationRouteNumber.textContent = "34";
  el.continuationDestination.textContent = "King's Lynn";
  showOnlySpecial(el.continuationDisplay);

  speak(
    "This bus continues as service 34 to Kings Lynn. Passengers travelling onwards may remain on board."
  );

  setTimeout(() => {
    if (!state.active) return;
    state.continuationActive = false;
    state.displayedService = "34";
    state.displayedDestination = "King's Lynn";
    updateDisplay();
  }, CONFIG.continuationDurationMs);
}

function checkDiversion() {
  const segment = nearestRouteSegment();
  if (!segment) return;

  const offRoute = segment.distance > CONFIG.offRouteDistance;

  if (offRoute) {
    if (!state.offRouteSince) state.offRouteSince = Date.now();
    if (Date.now() - state.offRouteSince >= CONFIG.offRouteDelayMs) {
      if (!state.automaticDiversion) {
        state.automaticDiversion = true;
        speak("This bus is currently on diversion. Please listen for driver announcements.");
      }
    }
  } else {
    state.offRouteSince = null;
    state.automaticDiversion = false;
  }
}

function nearestRouteSegment() {
  if (!state.position || state.stops.length < 2) return null;
  let best = null;

  for (let index = 0; index < state.stops.length - 1; index += 1) {
    const first = state.stops[index];
    const second = state.stops[index + 1];
    if (!hasCoordinates(first) || !hasCoordinates(second)) continue;

    const result = distanceToSegmentMetres(
      state.position.lat,
      state.position.lng,
      first.lat,
      first.lng,
      second.lat,
      second.lng
    );

    if (!best || result.distance < best.distance) {
      best = { index, ...result };
    }
  }

  return best;
}

function speakArrival(stop) {
  const extra = getAlightMessage(stop);
  speak(`This stop, ${cleanForSpeech(stop.announcementName)}.${extra ? ` ${extra}` : ""}`);
}

function getAlightMessage(stop) {
  if (stop.alightMessage) return stop.alightMessage;
  const name = `${stop.name} ${stop.announcementName}`.toLowerCase();

  if (name.includes("hunstanton") && !name.includes("old hunstanton")) {
    return "Alight here for Hunstanton Beach.";
  }
  if (name.includes("old hunstanton")) {
    return "Alight here for Old Hunstanton Beach.";
  }
  if (name.includes("holme")) {
    return "Alight here for the Norfolk Coast Path.";
  }
  if (name.includes("brancaster")) {
    return "Alight here for Brancaster Beach.";
  }
  if (name.includes("holkham")) {
    return "Alight here for Holkham Beach.";
  }
  if (name.includes("wells") && name.includes("quay")) {
    return "Alight here for Wells Beach.";
  }
  if (name.includes("wells") && name.includes("grove road")) {
    return "Alight here for C H one to Cromer.";
  }
  return "";
}

function updateDisplay(distanceOverride) {
  if (!state.active) return;

  const stop = getStop();
  const following = getStop(state.stopIndex + 1);
  const secondFollowing = getStop(state.stopIndex + 2);
  const distance = Number.isFinite(distanceOverride)
    ? distanceOverride
    : distanceToStop(state.stopIndex);

  el.routeNumber.textContent = state.displayedService || state.route?.service || "—";
  el.destinationName.textContent = state.displayedDestination || getDestination();
  el.stopStateLabel.textContent = state.atStop ? "This stop" : "Next stop";
  el.currentStopName.textContent = stop?.name || "Journey complete";
  el.followingStopName.textContent = following?.name || "Final stop";
  el.secondFollowingStopName.textContent = secondFollowing?.name || "";
  el.driverCurrentStop.textContent = stop?.name || "Journey complete";
  el.driverDistance.textContent = Number.isFinite(distance) ? formatDistance(distance) : "—";
  el.driverAccuracy.textContent = state.accuracy === null ? "—" : `${Math.round(state.accuracy)} m`;
  el.driverSpeed.textContent = `${state.speedMph.toFixed(1)} mph`;

  const finalStop = state.stopIndex >= state.stops.length - 1 && state.atStop;
  const diversion = state.manualDiversion || state.automaticDiversion;

  if (diversion) {
    showOnlySpecial(el.disruptionDisplay);
  } else if (state.continuationActive) {
    showOnlySpecial(el.continuationDisplay);
  } else if (finalStop) {
    el.terminusName.textContent = stop?.name || state.displayedDestination;
    showOnlySpecial(el.terminusDisplay);
  } else {
    showNormalDisplay();
  }

  updateRunningStatus(stop);
  updateGpsDebug(buildGpsDebug(distance));
  updateDriverButtons();
}

function showOnlySpecial(section) {
  el.normalDisplay.classList.add("is-hidden");
  el.continuationDisplay.classList.add("is-hidden");
  el.disruptionDisplay.classList.add("is-hidden");
  el.terminusDisplay.classList.add("is-hidden");
  section.classList.remove("is-hidden");
}

function showNormalDisplay() {
  el.normalDisplay.classList.remove("is-hidden");
  el.continuationDisplay.classList.add("is-hidden");
  el.disruptionDisplay.classList.add("is-hidden");
  el.terminusDisplay.classList.add("is-hidden");
}

function updateRunningStatus(stop) {
  if (!stop?.time) {
    el.runningStatus.textContent = "No timetable";
    el.runningStatus.className = "running-status";
    return;
  }

  const scheduled = timeToday(stop.time);
  if (!scheduled) return;
  const differenceSeconds = Math.round((Date.now() - scheduled.getTime()) / 1000);
  const absoluteMinutes = Math.floor(Math.abs(differenceSeconds) / 60);

  el.runningStatus.className = "running-status";

  if (Math.abs(differenceSeconds) < 60) {
    el.runningStatus.textContent = "On time";
    el.runningStatus.classList.add("running-on-time");
  } else if (differenceSeconds < 0) {
    el.runningStatus.textContent = `${absoluteMinutes} min early`;
    el.runningStatus.classList.add("running-early");
  } else {
    el.runningStatus.textContent = `${absoluteMinutes} min late`;
    el.runningStatus.classList.add("running-late");
  }
}

function previousStop() {
  if (!state.active || state.stopIndex <= 0) return;
  state.stopIndex -= 1;
  state.atStop = false;
  updateDisplay();
}

function nextStop() {
  if (!state.active || state.stopIndex >= state.stops.length - 1) return;
  state.stopIndex += 1;
  state.atStop = false;
  updateDisplay();
}

function restartJourney() {
  if (!state.active) return;
  state.stopIndex = 0;
  state.atStop = false;
  state.gpsInitialised = false;
  state.nextAnnounced.clear();
  state.arrivalAnnounced.clear();
  state.continuationShown = false;
  state.continuationActive = false;
  state.displayedService = state.route.service;
  state.displayedDestination = getDestination();
  updateDisplay();
}

function toggleManualDiversion() {
  state.manualDiversion = !state.manualDiversion;
  el.toggleDiversionButton.textContent = state.manualDiversion
    ? "Clear diversion"
    : "Toggle diversion";
  if (state.manualDiversion) {
    speak("This bus is currently on diversion. Please listen for driver announcements.");
  }
  updateDisplay();
}

function repeatAnnouncement() {
  if (state.lastAnnouncement) speak(state.lastAnnouncement);
}

function endJourney() {
  resetSetup();
  el.routeSelect.value = "";
  el.directionSelect.innerHTML = '<option value="">Select direction</option>';
  el.journeySelect.innerHTML = '<option value="">Select journey</option>';
  el.directionSelect.disabled = true;
  el.journeySelect.disabled = true;
}

function updateDriverButtons() {
  el.previousStopButton.disabled = state.stopIndex <= 0;
  el.nextStopButton.disabled = state.stopIndex >= state.stops.length - 1;
}

function getStop(index = state.stopIndex) {
  return state.stops[index] || null;
}

function stopKey(stop) {
  return `${state.stopIndex}:${stop.id}:${stop.name}`;
}

function hasCoordinates(stop) {
  return stop &&
    Number.isFinite(Number(stop.lat)) &&
    Number.isFinite(Number(stop.lng)) &&
    Math.abs(Number(stop.lat)) <= 90 &&
    Math.abs(Number(stop.lng)) <= 180;
}

function distanceToStop(index) {
  const stop = getStop(index);
  if (!state.position || !hasCoordinates(stop)) return Infinity;
  return distanceMetres(state.position.lat, state.position.lng, stop.lat, stop.lng);
}

function distanceMetres(lat1, lng1, lat2, lng2) {
  const radius = 6371000;
  const toRadians = value => value * Math.PI / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const firstLat = toRadians(lat1);
  const secondLat = toRadians(lat2);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(firstLat) * Math.cos(secondLat) * Math.sin(dLng / 2) ** 2;
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceToSegmentMetres(lat, lng, lat1, lng1, lat2, lng2) {
  const referenceLat = ((lat + lat1 + lat2) / 3) * Math.PI / 180;
  const metresPerLat = 111320;
  const metresPerLng = 111320 * Math.cos(referenceLat);
  const px = (lng - lng1) * metresPerLng;
  const py = (lat - lat1) * metresPerLat;
  const vx = (lng2 - lng1) * metresPerLng;
  const vy = (lat2 - lat1) * metresPerLat;
  const lengthSquared = vx * vx + vy * vy;

  if (!lengthSquared) return { distance: Math.hypot(px, py), progress: 0 };

  const rawProgress = (px * vx + py * vy) / lengthSquared;
  const progress = Math.max(0, Math.min(1, rawProgress));
  return {
    distance: Math.hypot(px - vx * progress, py - vy * progress),
    progress: rawProgress
  };
}

function timeToday(value) {
  const match = String(value).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const result = new Date();
  result.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return result;
}

function formatDirection(value) {
  return String(value || "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
}

function formatDistance(distance) {
  return distance < 1000
    ? `${Math.round(distance)} m`
    : `${(distance / 1000).toFixed(1)} km`;
}

function cleanForSpeech(value) {
  return String(value || "")
    .replace(/King's Lynn/gi, "Kings Lynn")
    .replace(/Wells-next-the-Sea/gi, "Wells next the Sea")
    .replace(/\bCH1\b/gi, "C H one")
    .replace(/\s+/g, " ")
    .trim();
}

function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  state.voice =
    voices.find(voice => voice.lang === "en-GB" && /natural|enhanced|premium/i.test(voice.name)) ||
    voices.find(voice => voice.lang === "en-GB") ||
    voices.find(voice => voice.lang.startsWith("en")) ||
    null;
}

function speak(text) {
  state.lastAnnouncement = text;
  el.announcementStatus.textContent = text;
  if (!state.audioEnabled || !("speechSynthesis" in window)) return;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.voice = state.voice;
  utterance.rate = 0.84;
  utterance.pitch = 0.98;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function setGpsStatus(type, text) {
  el.gpsStatus.className = `gps-status gps-${type}`;
  el.gpsStatusText.textContent = text;
}

function buildGpsDebug(distance) {
  const fix = state.lastGpsFixAt
    ? state.lastGpsFixAt.toLocaleTimeString("en-GB")
    : "none";
  const segment = nearestRouteSegment();
  return [
    `Last fix: ${fix}`,
    `Latitude: ${state.position?.lat?.toFixed(6) ?? "—"}`,
    `Longitude: ${state.position?.lng?.toFixed(6) ?? "—"}`,
    `Accuracy: ${state.accuracy === null ? "—" : `${Math.round(state.accuracy)} m`}`,
    `Speed: ${state.speedMph.toFixed(1)} mph`,
    `Target stop: ${state.stopIndex + 1}/${state.stops.length}`,
    `Distance to stop: ${Number.isFinite(distance) ? formatDistance(distance) : "—"}`,
    `Distance from route: ${segment ? formatDistance(segment.distance) : "—"}`,
    `Diversion timer: ${state.offRouteSince ? `${Math.floor((Date.now() - state.offRouteSince) / 1000)} s` : "not active"}`
  ].join("\n");
}

function updateGpsDebug(text) {
  el.gpsDebugOutput.textContent = text;
}

function startClock() {
  const update = () => {
    const now = new Date();
    el.currentTime.textContent = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });
    el.currentTime.dateTime = now.toISOString();
    if (state.active) updateRunningStatus(getStop());
  };
  update();
  state.clockTimer = setInterval(update, 1000);
}

async function enterFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      el.fullscreenButton.textContent = "Exit full screen";
    } else {
      await document.exitFullscreen();
      el.fullscreenButton.textContent = "Full screen";
    }
  } catch (error) {
    updateGpsDebug(`Full screen could not be enabled: ${error.message}`);
  }
}