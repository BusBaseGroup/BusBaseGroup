"use strict";

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

const CONFIG = Object.freeze({
  nextDistance: 350,
  arrivalDistance: 100,
  departureDistance: 200,
  offRouteDistance: 150,
  offRouteDelayMs: 30000,
  continuationDurationMs: 30000,
  busStoppingDurationMs: 12000,
  informationCardIntervalMs: 9000,
  weatherRefreshMs: 900000,
  announcementGapMs: 180,
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
  clockTimer: null,
  busStopping: false,
  busStoppingTimer: null,
  informationCardTimer: null,
  informationCardIndex: 0,
  weather: null,
  weatherUpdatedAt: 0,
  speechGeneration: 0,
  displayLayout: localStorage.getItem("busbaseDisplayLayout") || "full"
};

const el = {};

document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  cacheElements();
  bindEvents();
  loadVoices();
  resetSetup();
  startClock();
  setDisplayLayout(state.displayLayout);

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
    "gpsDebugOutput", "fullscreenButton", "announcementStatus",
    "nextStopEta", "nextStopDistance", "informationCard",
    "informationCardLabel", "informationCardTitle", "informationCardText",
    "routeMapStops", "busStoppingDisplay", "busStoppingButton",
    "headerWeatherTemperature", "headerWeatherDescription",
    "nextStopEtaMirror", "nextStopDistanceMirror"
  ].forEach(id => {
    el[id] = document.getElementById(id);
  });
  el.displayLayoutOptions = document.querySelectorAll('input[name="displayLayout"]');
}

function bindEvents() {
  el.routeSelect.addEventListener("change", routeChanged);
  el.directionSelect.addEventListener("change", directionChanged);
  el.journeySelect.addEventListener("change", departureChanged);
  el.journeyForm.addEventListener("submit", startJourney);

  // The driver menu is keyboard-only so passengers never see a menu button.
  // Press M to open/close it. Press Escape to close it.
  document.addEventListener("keydown", event => {
    const target = event.target;
    const typing = target && (
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    );

    if (typing) return;

    if (event.key.toLowerCase() === "m") {
      event.preventDefault();
      el.driverPanel.classList.toggle("is-hidden");
    }

    if (event.key === "Escape") {
      el.driverPanel.classList.add("is-hidden");
    }
  });

  el.closeDriverPanelButton.addEventListener("click", () => {
    el.driverPanel.classList.add("is-hidden");
  });

  el.previousStopButton.addEventListener("click", previousStop);
  el.nextStopButton.addEventListener("click", nextStop);
  el.repeatAnnouncementButton.addEventListener("click", repeatAnnouncement);
  el.toggleDiversionButton.addEventListener("click", toggleManualDiversion);
  el.busStoppingButton.addEventListener("click", triggerBusStopping);
  el.restartJourneyButton.addEventListener("click", restartJourney);
  el.endJourneyButton.addEventListener("click", endJourney);
  el.fullscreenButton.addEventListener("click", enterFullscreen);

  el.displayLayoutOptions.forEach(option => {
    option.checked = option.value === state.displayLayout;
    option.addEventListener("change", () => setDisplayLayout(option.value));
  });
  setDisplayLayout(state.displayLayout);

  document.addEventListener("keydown", event => {
    if (!state.active) return;
    if (event.key === "ArrowLeft") previousStop();
    if (event.key === "ArrowRight") nextStop();
    if (event.key.toLowerCase() === "d") toggleManualDiversion();
    if (event.key.toLowerCase() === "b") triggerBusStopping();
    if (event.key.toLowerCase() === "l") {
      setDisplayLayout(state.displayLayout === "full" ? "slim" : "full");
    }
  });
}

function setDisplayLayout(layout) {
  state.displayLayout = layout === "slim" ? "slim" : "full";
  localStorage.setItem("busbaseDisplayLayout", state.displayLayout);
  if (el.passengerScreen) {
    el.passengerScreen.classList.toggle("layout-full", state.displayLayout === "full");
    el.passengerScreen.classList.toggle("layout-slim", state.displayLayout === "slim");
  }
  el.displayLayoutOptions?.forEach(option => {
    option.checked = option.value === state.displayLayout;
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
  clearBusStopping();
  stopInformationCards();

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
  el.openDriverPanelButton.classList.add("is-hidden");
  el.fullscreenButton.classList.remove("is-hidden");

  const vehicle = el.vehicleInput.value.trim();
  el.vehicleDisplay.textContent = vehicle;
  el.vehicleDisplay.classList.toggle("is-hidden", !vehicle);

  updateDisplay();
  setGpsStatus("waiting", "Waiting for GPS");
  startGps();
  startInformationCards();
  refreshDestinationWeather();

  speak([
    "Welcome aboard.",
    `This is the ${serviceForSpeech(state.displayedService)} to ${cleanForSpeech(state.displayedDestination)}.`
  ]);
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
    speak(["Next stop.", `${cleanForSpeech(stop.announcementName)}.`]);
  }

  if (distance <= arrivalRadius) {
    state.atStop = true;
    clearBusStopping();
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

  speak([
    "This bus continues as the 34 to Kings Lynn.",
    "You may remain on board if you are travelling onwards."
  ]);

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
        speak(["We are currently on diversion.", "Please listen for further announcements."]);
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
  const parts = ["This stop.", `${cleanForSpeech(stop.announcementName)}.`];
  if (extra) parts.push(cleanForSpeech(extra));
  speak(parts);
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

  updateEta(distance, stop);
  updateConnectionMessage(stop);
  updateMiniRouteMap();
  updateInformationCard();
  el.busStoppingDisplay.classList.toggle("is-hidden", !state.busStopping);

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


function triggerBusStopping() {
  if (!state.active) return;
  clearTimeout(state.busStoppingTimer);
  state.busStopping = true;
  el.busStoppingDisplay.classList.remove("is-hidden");
  el.busStoppingButton.textContent = "Stop requested";
  state.busStoppingTimer = setTimeout(clearBusStopping, CONFIG.busStoppingDurationMs);
}

function clearBusStopping() {
  clearTimeout(state.busStoppingTimer);
  state.busStoppingTimer = null;
  state.busStopping = false;
  if (el.busStoppingDisplay) el.busStoppingDisplay.classList.add("is-hidden");
  if (el.busStoppingButton) el.busStoppingButton.textContent = "Bus stopping";
}

/* A physical bell cannot be read by a normal web page on its own. A future
   bell/controller bridge can call window.triggerBusStopping(). */
window.triggerBusStopping = triggerBusStopping;

function updateEta(distance, stop) {
  if (!el.nextStopEta || !stop) return;
  el.nextStopDistance.textContent = Number.isFinite(distance) ? formatDistance(distance) : "";
  if (el.nextStopDistanceMirror) el.nextStopDistanceMirror.textContent = el.nextStopDistance.textContent;

  let seconds = null;
  if (Number.isFinite(distance) && state.speedMph >= 3) {
    const metresPerSecond = state.speedMph / 2.236936;
    seconds = Math.max(5, Math.round(distance / metresPerSecond));
  } else if (stop.time) {
    const scheduled = timeToday(stop.time);
    if (scheduled) seconds = Math.max(0, Math.round((scheduled - Date.now()) / 1000));
  }

  if (state.atStop) {
    el.nextStopEta.textContent = "Arriving now";
  } else if (seconds === null) {
    el.nextStopEta.textContent = "Calculating…";
  } else if (seconds < 60) {
    el.nextStopEta.textContent = `Approx. ${seconds} sec`;
  } else {
    el.nextStopEta.textContent = `Approx. ${Math.max(1, Math.round(seconds / 60))} min`;
  }
  if (el.nextStopEtaMirror) el.nextStopEtaMirror.textContent = el.nextStopEta.textContent;
}

function updateConnectionMessage(stop) {
  const message = getAlightMessage(stop);
  el.connectionMessage.textContent = message;
  el.connectionMessage.classList.toggle("is-hidden", !message);
}

function updateMiniRouteMap() {
  if (!el.routeMapStops) return;
  const start = Math.max(0, state.stopIndex - (state.atStop ? 0 : 0));
  const stops = state.stops.slice(start, start + 5);
  el.routeMapStops.innerHTML = "";
  stops.forEach((stop, index) => {
    const row = document.createElement("div");
    row.className = `route-map-stop ${index === 0 ? "route-map-current" : ""}`;
    row.innerHTML = `<span class="route-map-dot"></span><span>${escapeHtml(stop.name)}</span>`;
    el.routeMapStops.appendChild(row);
  });
}

function startInformationCards() {
  stopInformationCards();
  updateInformationCard();
  state.informationCardTimer = setInterval(() => {
    state.informationCardIndex += 1;
    updateInformationCard();
  }, CONFIG.informationCardIntervalMs);
}

function stopInformationCards() {
  clearInterval(state.informationCardTimer);
  state.informationCardTimer = null;
}

function updateInformationCard() {
  if (!state.active || !el.informationCardTitle) return;
  const cards = buildInformationCards();
  if (!cards.length) return;
  const card = cards[state.informationCardIndex % cards.length];
  el.informationCardLabel.textContent = card.label;
  el.informationCardTitle.textContent = card.title;
  el.informationCardText.textContent = card.text;
}

function buildInformationCards() {
  const stop = getStop();
  const destinationStop = state.stops[state.stops.length - 1];
  const cards = [];
  const town = townFromStop(stop?.name);

  if (town) {
    cards.push({
      label: "Welcome to",
      title: town.toUpperCase(),
      text: landmarkMessage(town)
    });
  }

  cards.push({
    label: "Passenger information",
    title: "Need the next stop?",
    text: "Press the bell once, then remain seated until the bus has stopped."
  });

  if (destinationStop?.time) {
    cards.push({
      label: "Expected arrival",
      title: getDestination(),
      text: destinationStop.time
    });
  }

  const connections = connectionInformation(stop);
  if (connections) {
    cards.push({ label: "Onward connections", title: stop.name, text: connections });
  }

  if (state.weather) {
    cards.push({
      label: `Weather at ${getDestination()}`,
      title: `${Math.round(state.weather.temperature)}°C`,
      text: state.weather.description
    });
  }

  const seasonal = seasonalMessage();
  if (seasonal) cards.push({ label: "Seasonal message", title: seasonal.title, text: seasonal.text });
  return cards;
}

function townFromStop(name) {
  if (!name) return "";
  return String(name).split(",")[0].replace(/ Transport Interchange| Travel Hub| Oak Street/i, "").trim();
}

function landmarkMessage(town) {
  const messages = {
    "Hunstanton": "Home of the seafront, beach and Sea Life Centre.",
    "Wells-next-the-Sea": "Home of the historic quay and beach.",
    "Fakenham": "A historic market town in North Norfolk.",
    "King's Lynn": "A historic maritime town on the Great Ouse.",
    "Holkham": "Alight nearby for Holkham Hall and the coast.",
    "Burnham Market": "Welcome to Burnham Market."
  };
  return messages[town] || "Please ring the bell well in advance of your stop.";
}

function connectionInformation(stop) {
  const name = String(stop?.name || "").toLowerCase();
  if (name.includes("wells") && name.includes("grove road")) return "CH1 towards Cromer.";
  if (name.includes("hunstanton")) return "Services 34 and 36 towards King's Lynn and Fakenham.";
  if (name.includes("king's lynn") || name.includes("kings lynn")) return "Local and regional buses from the Transport Interchange.";
  if (name.includes("fakenham")) return "Local services from Oak Street and the town centre.";
  return stop?.connections || "";
}

function seasonalMessage() {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  if (month === 11 && date >= 15) return { title: "Merry Christmas", text: "Thank you for travelling with us." };
  if (month === 0 && date <= 7) return { title: "Happy New Year", text: "We wish you a safe and enjoyable journey." };
  return null;
}

async function refreshDestinationWeather() {
  const destination = state.stops[state.stops.length - 1];
  if (!hasCoordinates(destination)) return;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${destination.lat}&longitude=${destination.lng}&current=temperature_2m,weather_code&timezone=auto`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    state.weather = {
      temperature: Number(data.current?.temperature_2m),
      description: weatherDescription(data.current?.weather_code)
    };
    state.weatherUpdatedAt = Date.now();
    if (el.headerWeatherTemperature) {
      el.headerWeatherTemperature.textContent = `${Math.round(state.weather.temperature)}°C`;
    }
    if (el.headerWeatherDescription) {
      el.headerWeatherDescription.textContent = state.weather.description;
    }
    updateInformationCard();
  } catch (error) {
    /* Weather is optional. Passenger display remains usable offline. */
  }
}

function weatherDescription(code) {
  const value = Number(code);
  if (value === 0) return "Clear";
  if ([1,2].includes(value)) return "Partly cloudy";
  if (value === 3) return "Overcast";
  if ([45,48].includes(value)) return "Foggy";
  if (value >= 51 && value <= 67) return "Rain or drizzle";
  if (value >= 71 && value <= 77) return "Snow";
  if (value >= 80 && value <= 82) return "Rain showers";
  if (value >= 95) return "Thunderstorms";
  return "Current conditions available";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function previousStop() {
  if (!state.active || state.stopIndex <= 0) return;
  state.stopIndex -= 1;
  state.atStop = false;
  clearBusStopping();
  state.informationCardIndex = 0;
  updateDisplay();
}

function nextStop() {
  if (!state.active || state.stopIndex >= state.stops.length - 1) return;
  state.stopIndex += 1;
  state.atStop = false;
  clearBusStopping();
  state.informationCardIndex = 0;
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
    speak(["We are currently on diversion.", "Please listen for further announcements."]);
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
  let text = String(value || "").trim();

  const pronunciations = [
    [/King['’]s Lynn/gi, "Kings Lynn"],
    [/Wells-next-the-Sea/gi, "Wells next the Sea"],
    [/Hunstanton/gi, "Hun-stun"],
    [/Old Hunstanton/gi, "Old Hun-stun"],
    [/Fakenham/gi, "Fay-kuh-nuhm"],
    [/Heacham/gi, "Hee-chum"],
    [/Sedgeford/gi, "Sej-ford"],
    [/Dersingham/gi, "Der-sing-um"],
    [/Brancaster/gi, "Bran-caster"],
    [/Holkham/gi, "Hole-kum"],
    [/Bircham/gi, "Bir-chum"],
    [/Hillington/gi, "Hill-ing-ton"],
    [/Burnham Market/gi, "Burn-um Market"],
    [/Co-?op/gi, "Co-op"],
    [/Polka Road/gi, "Polka Road"],
    [/\bCH1\b/gi, "C H one"],
    [/\bA149\b/gi, "A one four nine"],
    [/\bB1105\b/gi, "B one one zero five"]
  ];

  pronunciations.forEach(([pattern, spoken]) => {
    text = text.replace(pattern, spoken);
  });

  return text
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function serviceForSpeech(service) {
  const value = String(service || "").trim();
  return value ? `number ${value}` : "service";
}

function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  const preferred = [
    "Microsoft Sonia Online",
    "Microsoft Libby Online",
    "Microsoft Ryan Online",
    "Google UK English Female",
    "Google UK English Male",
    "Serena",
    "Daniel",
    "Kate",
    "Martha",
    "Arthur"
  ];

  state.voice = preferred
    .map(name => voices.find(voice => voice.name.includes(name)))
    .find(Boolean) ||
    voices.find(voice => voice.lang === "en-GB" && /natural|enhanced|premium/i.test(voice.name)) ||
    voices.find(voice => voice.lang === "en-GB") ||
    voices.find(voice => voice.lang.startsWith("en")) ||
    null;
}

function speechSettings(text) {
  if (/welcome aboard/i.test(text)) return { rate: 0.92, pitch: 0.98 };
  if (/next stop|this stop/i.test(text)) return { rate: 0.9, pitch: 0.98 };
  if (/diversion|continues as/i.test(text)) return { rate: 0.88, pitch: 0.97 };
  if (/alight here|connections/i.test(text)) return { rate: 0.89, pitch: 0.98 };
  return { rate: 0.91, pitch: 0.98 };
}

function speak(message) {
  const parts = (Array.isArray(message) ? message : [message])
    .map(part => cleanForSpeech(part))
    .filter(Boolean);

  if (!parts.length) return;

  state.lastAnnouncement = parts.join(" ");
  el.announcementStatus.textContent = state.lastAnnouncement;
  if (!state.audioEnabled || !("speechSynthesis" in window)) return;

  state.speechGeneration += 1;
  const generation = state.speechGeneration;
  speechSynthesis.cancel();

  parts.forEach((part, index) => {
    const utterance = new SpeechSynthesisUtterance(part);
    const settings = speechSettings(part);
    utterance.lang = "en-GB";
    utterance.voice = state.voice;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = 1;

    if (index < parts.length - 1) {
      utterance.onend = () => {
        if (generation !== state.speechGeneration) return;
      };
    }
    speechSynthesis.speak(utterance);
  });
}

function stopSpeech() {
  state.speechGeneration += 1;
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
