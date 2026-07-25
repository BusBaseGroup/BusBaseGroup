"use strict";

/*
Expected folder structure:

index.html
style.css
app.js
routes/
  route-34.js
  route-35.js
  route-36.js

Each route file must register itself like this:

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

window.LYNX_ROUTES["34"] = {
  service: "34",
  brand: "Lynx",
  journeys: [
    {
      id: "34-outbound",
      name: "King's Lynn to Hunstanton",
      direction: "outbound",
      destination: "Hunstanton Travel Hub",
      departures: [
        {
          id: "34-0800",
          time: "08:00",
          stops: [
            {
              name: "King's Lynn Transport Interchange",
              lat: 52.75543,
              lng: 0.40443,
              time: "08:00",
              timingPoint: true
            }
          ]
        }
      ]
    }
  ]
};
*/

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

const state = {
  selectedRoute: "",
  routeData: null,
  journey: null,
  departure: null,
  stops: [],

  active: false,
  currentStopIndex: 0,

  gpsWatchId: null,
  position: null,
  speedMph: 0,
  accuracy: null,

  audioEnabled: false,
  voice: null,
  lastAnnouncement: "",

  stationarySince: null,
  waitingBecauseEarly: false,
  earlyAnnouncementPlayed: false,
  departureThanksPlayed: false,
  lateAnnouncementPlayed: false,

  nextPlayed: new Set(),
  arrivalPlayed: new Set(),
  welcomePlayed: new Set(),
  specialPlayed: new Set(),

  routeScript: null,
  bannerTimer: null,
  clockTimer: null,

  settings: {
    automaticNext: true,
    automaticArrival: true,
    welcome: true,
    early: true,
    late: true,
    departureThanks: true
  },

  nextRadiusMetres: 250,
  arrivalRadiusMetres: 75,
  departureRadiusMetres: 130,
  stationarySpeedMph: 1,
  earlyThresholdSeconds: 60,
  lateThresholdSeconds: 300
};

const el = {};

document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  cacheElements();
  bindEvents();
  loadSavedSettings();
  loadVoices();
  startClock();
  resetPage();

  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function cacheElements() {
  const ids = [
    "systemStatus",
    "routeLoadedBadge",
    "routeSelect",
    "journeySelect",
    "directionSelect",
    "departureSelect",
    "linkedJourneyNotice",
    "startJourneyButton",
    "stopJourneyButton",
    "enableAudioButton",
    "testAudioButton",
    "displayRoute",
    "displayDestination",
    "nextStopName",
    "followingStopName",
    "connectionBanner",
    "runningStatusText",
    "journeyProgressBar",
    "currentTime",
    "stopProgress",
    "gpsAccuracyBadge",
    "gpsStatus",
    "speedDisplay",
    "distanceDisplay",
    "currentStopDisplay",
    "scheduledTimeDisplay",
    "timeDifferenceDisplay",
    "audioStatusBadge",
    "lastAnnouncement",
    "replayAnnouncementButton",
    "cancelAnnouncementButton",
    "previousStopButton",
    "nextStopButton",
    "announceNextButton",
    "announceThisButton",
    "announceDelayButton",
    "announceEarlyButton",
    "automaticNextStopToggle",
    "automaticArrivalToggle",
    "welcomeAnnouncementToggle",
    "earlyAnnouncementToggle",
    "lateAnnouncementToggle",
    "departureAnnouncementToggle",
    "clearHistoryButton",
    "announcementHistory",
    "announcementBanner",
    "announcementBannerText",
    "errorModal",
    "errorModalText",
    "closeErrorModalButton"
  ];

  ids.forEach(id => {
    el[id] = document.getElementById(id);
  });

  el.messageButtons = document.querySelectorAll(".message-button");
}

function bindEvents() {
  el.routeSelect.addEventListener("change", routeChanged);
  el.journeySelect.addEventListener("change", journeyChanged);
  el.directionSelect.addEventListener("change", directionChanged);
  el.departureSelect.addEventListener("change", departureChanged);

  el.startJourneyButton.addEventListener("click", startJourney);
  el.stopJourneyButton.addEventListener("click", () => stopJourney(true));

  el.enableAudioButton.addEventListener("click", enableAudio);
  el.testAudioButton.addEventListener("click", testVoice);

  el.replayAnnouncementButton.addEventListener("click", replayAnnouncement);
  el.cancelAnnouncementButton.addEventListener("click", stopAudio);

  el.previousStopButton.addEventListener("click", previousStop);
  el.nextStopButton.addEventListener("click", nextStop);

  el.announceNextButton.addEventListener("click", announceNextStop);
  el.announceThisButton.addEventListener("click", announceCurrentStop);
  el.announceDelayButton.addEventListener("click", playDelayAnnouncement);
  el.announceEarlyButton.addEventListener("click", playEarlyAnnouncement);

  el.clearHistoryButton.addEventListener("click", clearHistory);
  el.closeErrorModalButton.addEventListener("click", hideError);

  el.messageButtons.forEach(button => {
    button.addEventListener("click", () => {
      playSpecialMessage(button.dataset.message);
    });
  });

  bindSetting(
    el.automaticNextStopToggle,
    "automaticNext"
  );

  bindSetting(
    el.automaticArrivalToggle,
    "automaticArrival"
  );

  bindSetting(
    el.welcomeAnnouncementToggle,
    "welcome"
  );

  bindSetting(
    el.earlyAnnouncementToggle,
    "early"
  );

  bindSetting(
    el.lateAnnouncementToggle,
    "late"
  );

  bindSetting(
    el.departureAnnouncementToggle,
    "departureThanks"
  );
}

function bindSetting(input, key) {
  input.addEventListener("change", () => {
    state.settings[key] = input.checked;
    saveSettings();
  });
}

function loadSavedSettings() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("lynxAnnouncementSettings") || "{}"
    );

    state.settings = {
      ...state.settings,
      ...saved
    };
  } catch (error) {
    console.warn("Could not load settings.", error);
  }

  el.automaticNextStopToggle.checked =
    state.settings.automaticNext;

  el.automaticArrivalToggle.checked =
    state.settings.automaticArrival;

  el.welcomeAnnouncementToggle.checked =
    state.settings.welcome;

  el.earlyAnnouncementToggle.checked =
    state.settings.early;

  el.lateAnnouncementToggle.checked =
    state.settings.late;

  el.departureAnnouncementToggle.checked =
    state.settings.departureThanks;
}

function saveSettings() {
  localStorage.setItem(
    "lynxAnnouncementSettings",
    JSON.stringify(state.settings)
  );
}

function resetPage() {
  el.systemStatus.textContent = "Offline";
  el.routeLoadedBadge.textContent = "No route loaded";

  el.displayRoute.textContent = "—";
  el.displayDestination.textContent = "Select a journey";
  el.nextStopName.textContent = "Journey not started";
  el.followingStopName.textContent = "Following stop: —";

  el.runningStatusText.textContent = "Timetable not loaded";
  el.stopProgress.textContent = "Stop 0 of 0";
  el.journeyProgressBar.style.width = "0%";

  el.gpsStatus.textContent = "Not started";
  el.gpsAccuracyBadge.textContent = "Not active";
  el.speedDisplay.textContent = "— mph";
  el.distanceDisplay.textContent = "—";
  el.currentStopDisplay.textContent = "—";
  el.scheduledTimeDisplay.textContent = "—";
  el.timeDifferenceDisplay.textContent = "—";

  setJourneyControls(false);
}

async function routeChanged() {
  const route = el.routeSelect.value;

  stopJourney(false);
  resetRouteSelectors();

  if (!route) {
    state.selectedRoute = "";
    state.routeData = null;
    el.routeLoadedBadge.textContent = "No route loaded";
    return;
  }

  state.selectedRoute = route;
  el.routeLoadedBadge.textContent = "Loading route...";

  try {
    await loadRouteScript(route);

    const routeData = window.LYNX_ROUTES[route];

    if (!routeData) {
      throw new Error(
        `Route ${route} did not register itself in window.LYNX_ROUTES.`
      );
    }

    state.routeData = routeData;
    populateJourneys();

    el.routeLoadedBadge.textContent = `Service ${route} loaded`;
    el.systemStatus.textContent = "Ready";
  } catch (error) {
    console.error(error);
    el.routeLoadedBadge.textContent = "Route failed";
    showError(
      error?.message ||
      `The file routes/route-${route}.js could not be loaded.`
    );
  }
}

function loadRouteScript(route) {
  return new Promise((resolve, reject) => {
    if (window.LYNX_ROUTES[route]) {
      resolve();
      return;
    }

    if (state.routeScript) {
      state.routeScript.remove();
      state.routeScript = null;
    }

    const script = document.createElement("script");
    script.src = `routes/route-${route}.js?v=${Date.now()}`;
    script.async = true;

    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
    state.routeScript = script;
  });
}

function resetRouteSelectors() {
  state.journey = null;
  state.departure = null;
  state.stops = [];

  el.journeySelect.innerHTML =
    `<option value="">Select a journey</option>`;

  el.directionSelect.innerHTML =
    `<option value="">Select a journey first</option>`;

  el.departureSelect.innerHTML =
    `<option value="">Select a direction first</option>`;

  el.journeySelect.disabled = true;
  el.directionSelect.disabled = true;
  el.departureSelect.disabled = true;
  el.startJourneyButton.disabled = true;
}

function populateJourneys() {
  const journeys = state.routeData.journeys || [];

  el.journeySelect.innerHTML =
    `<option value="">Select a journey</option>`;

  journeys.forEach((journey, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent =
      journey.name ||
      `${journey.origin || "Origin"} to ${
        journey.destination || "Destination"
      }`;

    el.journeySelect.appendChild(option);
  });

  el.journeySelect.disabled = journeys.length === 0;
}

function journeyChanged() {
  const index = Number(el.journeySelect.value);

  if (
    el.journeySelect.value === "" ||
    !state.routeData?.journeys?.[index]
  ) {
    state.journey = null;
    el.directionSelect.disabled = true;
    return;
  }

  state.journey = state.routeData.journeys[index];
  populateDirections();
}

function populateDirections() {
  const directions = getJourneyDirections(state.journey);

  el.directionSelect.innerHTML =
    `<option value="">Select a direction</option>`;

  directions.forEach(direction => {
    const option = document.createElement("option");
    option.value = direction;
    option.textContent = formatDirection(direction);
    el.directionSelect.appendChild(option);
  });

  el.directionSelect.disabled = directions.length === 0;

  if (directions.length === 1) {
    el.directionSelect.value = directions[0];
    directionChanged();
  }
}

function getJourneyDirections(journey) {
  if (Array.isArray(journey.directions)) {
    return journey.directions.map(item =>
      typeof item === "string" ? item : item.id
    );
  }

  return [journey.direction || "outbound"];
}

function directionChanged() {
  populateDepartures();
}

function populateDepartures() {
  const direction = el.directionSelect.value;

  el.departureSelect.innerHTML =
    `<option value="">Select a departure</option>`;

  if (!direction || !state.journey) {
    el.departureSelect.disabled = true;
    return;
  }

  const departures = getDeparturesForDirection(
    state.journey,
    direction
  );

  departures.forEach((departure, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent =
      departure.label ||
      departure.time ||
      `Journey ${index + 1}`;

    el.departureSelect.appendChild(option);
  });

  el.departureSelect.disabled = departures.length === 0;

  if (departures.length === 1) {
    el.departureSelect.value = "0";
    departureChanged();
  }
}

function getDeparturesForDirection(journey, direction) {
  if (Array.isArray(journey.directions)) {
    const directionData = journey.directions.find(item =>
      typeof item === "object" && item.id === direction
    );

    if (directionData) {
      return directionData.departures || [];
    }
  }

  return journey.departures || [];
}

function departureChanged() {
  const direction = el.directionSelect.value;
  const index = Number(el.departureSelect.value);

  const departures = getDeparturesForDirection(
    state.journey,
    direction
  );

  if (
    el.departureSelect.value === "" ||
    !departures[index]
  ) {
    state.departure = null;
    el.startJourneyButton.disabled = true;
    return;
  }

  state.departure = departures[index];
  state.stops = prepareStops(state.departure.stops || []);

  updateLinkedJourneyNotice();
  previewJourney();

  el.startJourneyButton.disabled =
    state.stops.length === 0;
}

function prepareStops(stops) {
  return stops.map((stop, index) => ({
    id: stop.id || `stop-${index}`,
    name: stop.name || `Stop ${index + 1}`,
    lat: Number(stop.lat ?? stop.latitude),
    lng: Number(stop.lng ?? stop.longitude),
    time: stop.time || "",
    timingPoint: Boolean(stop.timingPoint),
    nextRadius:
      Number(stop.nextRadius) || state.nextRadiusMetres,
    arrivalRadius:
      Number(stop.arrivalRadius) || state.arrivalRadiusMetres,
    announcementName:
      stop.announcementName || stop.name,
    specialAnnouncement:
      stop.specialAnnouncement || null,
    connectionMessage:
      stop.connectionMessage || null
  }));
}

function previewJourney() {
  const destination =
    state.departure.destination ||
    state.journey.destination ||
    state.routeData.destination ||
    "Destination";

  el.displayRoute.textContent =
    state.routeData.service || state.selectedRoute;

  el.displayDestination.textContent = destination;

  el.nextStopName.textContent =
    state.stops[0]?.name || "No stops loaded";

  el.followingStopName.textContent =
    state.stops[1]
      ? `Following stop: ${state.stops[1].name}`
      : "Following stop: —";

  el.stopProgress.textContent =
    `Stop 0 of ${state.stops.length}`;
}

function updateLinkedJourneyNotice() {
  const linked =
    state.departure?.linkedJourney ||
    state.journey?.linkedJourney;

  if (!linked) {
    el.linkedJourneyNotice.classList.add("hidden");
    return;
  }

  const route =
    linked.route || linked.service || "another service";

  el.linkedJourneyNotice.textContent =
    `This journey continues as service ${route}.`;

  el.linkedJourneyNotice.classList.remove("hidden");
}

function startJourney() {
  if (!state.departure || !state.stops.length) {
    showError("Select a valid journey and departure first.");
    return;
  }

  stopJourney(false);
  resetJourneyState();

  state.active = true;
  state.currentStopIndex = 0;

  setJourneyControls(true);
  updatePassengerDisplay();

  el.systemStatus.textContent = "Running";
  el.stopJourneyButton.disabled = false;
  el.startJourneyButton.disabled = true;

  playAnnouncement(
    `Welcome on board ${getBrandName()}. ` +
    `This is service ${getServiceNumber()} to ${cleanText(
      getDestination()
    )}.`,
    12000
  );

  startGps();
}

function resetJourneyState() {
  state.stationarySince = null;
  state.waitingBecauseEarly = false;
  state.earlyAnnouncementPlayed = false;
  state.departureThanksPlayed = false;
  state.lateAnnouncementPlayed = false;

  state.nextPlayed.clear();
  state.arrivalPlayed.clear();
  state.welcomePlayed.clear();
  state.specialPlayed.clear();
}

function startGps() {
  if (!navigator.geolocation) {
    el.gpsStatus.textContent = "Not supported";
    showError("This device does not support browser GPS.");
    return;
  }

  el.gpsStatus.textContent = "Requesting permission";

  state.gpsWatchId = navigator.geolocation.watchPosition(
    gpsUpdated,
    gpsFailed,
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 20000
    }
  );
}

function gpsUpdated(position) {
  if (!state.active) {
    return;
  }

  const coords = position.coords;

  state.position = {
    lat: coords.latitude,
    lng: coords.longitude
  };

  state.speedMph = Number.isFinite(coords.speed)
    ? Math.max(0, coords.speed * 2.236936)
    : 0;

  state.accuracy = coords.accuracy;

  el.gpsStatus.textContent = "Active";
  el.gpsAccuracyBadge.textContent =
    `Accurate to ${Math.round(state.accuracy)} m`;

  el.speedDisplay.textContent =
    `${state.speedMph.toFixed(1)} mph`;

  processLocation();
}

function gpsFailed(error) {
  let message = "Unable to access GPS.";

  if (error.code === 1) {
    message =
      "Location permission was denied. Allow location access in the browser settings.";
  } else if (error.code === 2) {
    message = "The device could not determine its location.";
  } else if (error.code === 3) {
    message = "The GPS request timed out.";
  }

  el.gpsStatus.textContent = "GPS error";
  el.gpsAccuracyBadge.textContent = "Unavailable";

  showError(message);
}

function processLocation() {
  const stop = getCurrentStop();

  if (!stop || !state.position) {
    return;
  }

  const distance = distanceMetres(
    state.position.lat,
    state.position.lng,
    stop.lat,
    stop.lng
  );

  el.distanceDisplay.textContent = formatDistance(distance);
  el.currentStopDisplay.textContent = stop.name;
  el.scheduledTimeDisplay.textContent = stop.time || "—";

  updateRunningStatus(stop);
  processStopAnnouncements(stop, distance);
  processStationaryAnnouncements(stop, distance);
  processDeparture(stop, distance);
}

function processStopAnnouncements(stop, distance) {
  const key = stopKey(stop);

  if (
    state.settings.automaticNext &&
    distance <= stop.nextRadius &&
    distance > stop.arrivalRadius &&
    !state.nextPlayed.has(key)
  ) {
    announceNextStop();
    state.nextPlayed.add(key);
  }

  if (
    state.settings.automaticArrival &&
    distance <= stop.arrivalRadius &&
    !state.arrivalPlayed.has(key)
  ) {
    announceArrival(stop);
    state.arrivalPlayed.add(key);

    if (stop.connectionMessage) {
      setTimeout(() => {
        playConnectionAnnouncement(
          stop.connectionMessage
        );
      }, 3500);
    }

    if (stop.specialAnnouncement) {
      setTimeout(() => {
        playAnnouncement(
          stop.specialAnnouncement,
          15000
        );
      }, 6500);
    }
  }
}

function processStationaryAnnouncements(stop, distance) {
  const isStationary =
    state.speedMph <= state.stationarySpeedMph;

  const isAtStop =
    distance <= stop.arrivalRadius;

  if (!isStationary || !isAtStop) {
    state.stationarySince = null;
    return;
  }

  if (!state.stationarySince) {
    state.stationarySince = Date.now();
  }

  const stationarySeconds =
    (Date.now() - state.stationarySince) / 1000;

  if (stationarySeconds < 20) {
    return;
  }

  const difference = getScheduleDifference(stop);

  if (
    stop.timingPoint &&
    state.settings.early &&
    difference !== null &&
    difference <= -state.earlyThresholdSeconds &&
    !state.earlyAnnouncementPlayed
  ) {
    playEarlyAnnouncement();
    state.earlyAnnouncementPlayed = true;
    state.waitingBecauseEarly = true;
    return;
  }

  const key = stopKey(stop);

  if (
    state.settings.welcome &&
    !isFinalStop() &&
    !state.welcomePlayed.has(key)
  ) {
    playAnnouncement(
      `Welcome on board ${getBrandName()}. ` +
      `This is service ${getServiceNumber()} to ${cleanText(
        getDestination()
      )}.`,
      12000
    );

    state.welcomePlayed.add(key);
  }
}

function processDeparture(stop, distance) {
  const hasArrived =
    state.arrivalPlayed.has(stopKey(stop));

  const leaving =
    hasArrived &&
    distance > state.departureRadiusMetres &&
    state.speedMph > 2;

  if (!leaving) {
    return;
  }

  if (
    state.waitingBecauseEarly &&
    state.settings.departureThanks &&
    !state.departureThanksPlayed
  ) {
    playAnnouncement(
      "Thank you for your patience. " +
      "We will now continue our journey.",
      9000
    );

    state.departureThanksPlayed = true;
  }

  state.waitingBecauseEarly = false;
  state.stationarySince = null;

  if (state.currentStopIndex < state.stops.length - 1) {
    state.currentStopIndex += 1;

    state.earlyAnnouncementPlayed = false;
    state.departureThanksPlayed = false;
    state.lateAnnouncementPlayed = false;

    updatePassengerDisplay();
  }
}

function updateRunningStatus(stop) {
  const difference = getScheduleDifference(stop);

  if (difference === null) {
    el.runningStatusText.textContent =
      "No scheduled time";
    el.timeDifferenceDisplay.textContent = "—";
    return;
  }

  const absolute = Math.abs(difference);

  if (absolute < 60) {
    el.runningStatusText.textContent = "On time";
    el.timeDifferenceDisplay.textContent = "On time";
  } else if (difference < 0) {
    const minutes = Math.floor(absolute / 60);

    el.runningStatusText.textContent =
      `${minutes} min early`;

    el.timeDifferenceDisplay.textContent =
      `${minutes} min early`;
  } else {
    const minutes = Math.floor(difference / 60);

    el.runningStatusText.textContent =
      `${minutes} min late`;

    el.timeDifferenceDisplay.textContent =
      `${minutes} min late`;

    if (
      state.settings.late &&
      difference >= state.lateThresholdSeconds &&
      !state.lateAnnouncementPlayed
    ) {
      playDelayAnnouncement();
      state.lateAnnouncementPlayed = true;
    }
  }
}

function getScheduleDifference(stop) {
  if (!stop.time) {
    return null;
  }

  const scheduled = timeToday(stop.time);

  if (!scheduled) {
    return null;
  }

  return Math.round(
    (Date.now() - scheduled.getTime()) / 1000
  );
}

function timeToday(value) {
  const match = String(value).match(
    /^(\d{1,2}):(\d{2})$/
  );

  if (!match) {
    return null;
  }

  const date = new Date();

  date.setHours(
    Number(match[1]),
    Number(match[2]),
    0,
    0
  );

  return date;
}

function announceNextStop() {
  const stop = getCurrentStop();

  if (!stop) {
    return;
  }

  playAnnouncement(
    `The next stop is ${cleanText(
      stop.announcementName
    )}.`,
    9000
  );
}

function announceCurrentStop() {
  const stop = getCurrentStop();

  if (!stop) {
    return;
  }

  announceArrival(stop);
}

function announceArrival(stop) {
  if (isFinalStop()) {
    handleFinalStop(stop);
    return;
  }

  playAnnouncement(
    `This stop is ${cleanText(
      stop.announcementName
    )}.`,
    9000
  );
}

function handleFinalStop(stop) {
  const linked =
    state.departure?.linkedJourney ||
    state.journey?.linkedJourney;

  if (linked) {
    const route =
      linked.route ||
      linked.service ||
      "the next service";

    const destination =
      linked.destination || "";

    const message =
      linked.announcement ||
      `This stop is ${cleanText(stop.name)}. ` +
      `This service will continue as service ${route}` +
      `${destination ? ` to ${cleanText(destination)}` : ""}. ` +
      `Passengers travelling onwards may remain on board.`;

    playAnnouncement(message, 20000);

    if (linked.autoChange !== false) {
      setTimeout(() => {
        changeToLinkedJourney(linked);
      }, Number(linked.changeDelay) || 10000);
    }

    return;
  }

  playAnnouncement(
    `Last stop, ${cleanText(stop.name)}. ` +
    `Please make sure you have all your personal belongings ` +
    `with you before leaving the bus. ` +
    `Thanks for travelling with Lynx.`,
    20000
  );
}

async function changeToLinkedJourney(linked) {
  try {
    const route =
      linked.route || linked.service;

    if (!route) {
      return;
    }

    await loadRouteScript(route);

    const routeData = window.LYNX_ROUTES[route];

    if (!routeData) {
      throw new Error(
        `Linked route ${route} is unavailable.`
      );
    }

    const journey =
      routeData.journeys.find(item =>
        linked.journeyId
          ? item.id === linked.journeyId
          : true
      );

    if (!journey) {
      throw new Error(
        `No linked journey was found for route ${route}.`
      );
    }

    const direction =
      linked.direction ||
      getJourneyDirections(journey)[0];

    const departures =
      getDeparturesForDirection(journey, direction);

    const departure =
      departures.find(item =>
        linked.departureId
          ? item.id === linked.departureId
          : true
      );

    if (!departure) {
      throw new Error(
        `No linked departure was found for route ${route}.`
      );
    }

    state.selectedRoute = route;
    state.routeData = routeData;
    state.journey = journey;
    state.departure = departure;
    state.stops = prepareStops(departure.stops || []);

    state.currentStopIndex =
      Number.isInteger(linked.startStopIndex)
        ? linked.startStopIndex
        : 0;

    resetJourneyState();
    updatePassengerDisplay();

    playAnnouncement(
      linked.welcomeAnnouncement ||
      `The service number is now ${route}. ` +
      `Welcome on board ${routeData.brand || "Lynx"}. ` +
      `This is service ${route} to ${cleanText(
        getDestination()
      )}.`,
      16000
    );
  } catch (error) {
    console.error(error);
    showError(
      "The linked journey could not be loaded."
    );
  }
}

function playEarlyAnnouncement() {
  playAnnouncement(
    "This bus is currently running ahead of schedule. " +
    "We will be waiting here briefly to help keep the " +
    "service running on time. Thank you for your patience.",
    17000
  );

  state.waitingBecauseEarly = true;
}

function playDelayAnnouncement() {
  playAnnouncement(
    "We apologise that this service is currently running late. " +
    "Thank you for your patience.",
    12000
  );
}

function playConnectionAnnouncement(message) {
  const text =
    message ||
    "Alight here for C H one to Cromer.";

  el.connectionBanner.textContent = text;
  el.connectionBanner.classList.remove("hidden");

  playAnnouncement(text, 45000);

  setTimeout(() => {
    el.connectionBanner.classList.add("hidden");
  }, 45000);
}

function playSpecialMessage(type) {
  const messages = {
    diversion:
      "This service is currently operating on diversion. " +
      "Please listen for further announcements.",

    delay:
      "We apologise that this service is currently running late. " +
      "Thank you for your patience.",

    early:
      "This bus is currently running ahead of schedule. " +
      "We will be waiting here briefly to help keep the " +
      "service running on time. Thank you for your patience.",

    connection:
      "Alight here for C H one to Cromer.",

    "remain-seated":
      "For your safety, please remain seated until the bus has stopped.",

    terminating:
      "This journey will terminate at the next stop. " +
      "Please make sure you have all your belongings with you."
  };

  const message = messages[type];

  if (message) {
    playAnnouncement(
      message,
      type === "connection" ? 45000 : 14000
    );
  }
}

function enableAudio() {
  state.audioEnabled = true;
  loadVoices();

  el.audioStatusBadge.textContent = "Enabled";
  el.enableAudioButton.textContent =
    "Announcements enabled";

  playAnnouncement(
    "Passenger announcements are now enabled.",
    6000
  );
}

function testVoice() {
  state.audioEnabled = true;
  loadVoices();

  el.audioStatusBadge.textContent = "Enabled";

  playAnnouncement(
    "This is a test of the passenger announcement system.",
    8000
  );
}

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const voices = speechSynthesis.getVoices();

  const preferredNames = [
    "Microsoft Sonia Online",
    "Microsoft Ryan Online",
    "Microsoft Libby Online",
    "Google UK English Female",
    "Google UK English Male",
    "Serena",
    "Daniel",
    "Kate",
    "Martha",
    "Arthur"
  ];

  state.voice =
    preferredNames
      .map(name =>
        voices.find(voice =>
          voice.name.includes(name)
        )
      )
      .find(Boolean) ||
    voices.find(voice =>
      voice.lang === "en-GB" &&
      /natural|enhanced|premium/i.test(voice.name)
    ) ||
    voices.find(voice =>
      voice.lang === "en-GB"
    ) ||
    voices.find(voice =>
      voice.lang.startsWith("en")
    ) ||
    null;
}

function playAnnouncement(text, duration = 9000) {
  state.lastAnnouncement = text;

  el.lastAnnouncement.textContent = text;
  showBanner(text, duration);
  addHistory(text);

  if (
    !state.audioEnabled ||
    !("speechSynthesis" in window)
  ) {
    return;
  }

  speechSynthesis.cancel();

  const sections = text
    .replace(/([.!?])\s+/g, "$1|")
    .split("|")
    .map(section => section.trim())
    .filter(Boolean);

  sections.forEach(section => {
    const utterance =
      new SpeechSynthesisUtterance(section);

    utterance.lang = "en-GB";
    utterance.voice = state.voice;
    utterance.volume = 1;
    utterance.pitch = 0.96;

    if (/welcome on board/i.test(section)) {
      utterance.rate = 0.86;
    } else if (/last stop/i.test(section)) {
      utterance.rate = 0.81;
    } else if (/running ahead|running late/i.test(section)) {
      utterance.rate = 0.83;
    } else {
      utterance.rate = 0.84;
    }

    speechSynthesis.speak(utterance);
  });
}

function replayAnnouncement() {
  if (state.lastAnnouncement) {
    playAnnouncement(
      state.lastAnnouncement,
      9000
    );
  }
}

function stopAudio() {
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  hideBanner();
}

function showBanner(text, duration) {
  clearTimeout(state.bannerTimer);

  el.announcementBannerText.textContent = text;
  el.announcementBanner.classList.add("show");

  state.bannerTimer = setTimeout(() => {
    hideBanner();
  }, duration);
}

function hideBanner() {
  clearTimeout(state.bannerTimer);
  el.announcementBanner.classList.remove("show");
}

function addHistory(text) {
  const empty =
    el.announcementHistory.querySelector(
      ".empty-history"
    );

  if (empty) {
    empty.remove();
  }

  const entry = document.createElement("div");
  entry.className = "history-entry";

  const time = document.createElement("time");
  time.textContent = new Date().toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }
  );

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  entry.append(time, paragraph);
  el.announcementHistory.prepend(entry);
}

function clearHistory() {
  el.announcementHistory.innerHTML =
    `<p class="empty-history">No announcements yet.</p>`;
}

function previousStop() {
  if (!state.active || state.currentStopIndex <= 0) {
    return;
  }

  state.currentStopIndex -= 1;
  state.stationarySince = null;

  updatePassengerDisplay();
}

function nextStop() {
  if (
    !state.active ||
    state.currentStopIndex >= state.stops.length - 1
  ) {
    return;
  }

  state.currentStopIndex += 1;
  state.stationarySince = null;

  updatePassengerDisplay();
}

function updatePassengerDisplay() {
  const stop = getCurrentStop();
  const following =
    state.stops[state.currentStopIndex + 1];

  el.displayRoute.textContent =
    getServiceNumber();

  el.displayDestination.textContent =
    getDestination();

  el.nextStopName.textContent =
    stop?.name || "Journey complete";

  el.followingStopName.textContent =
    following
      ? `Following stop: ${following.name}`
      : "Final stop";

  el.currentStopDisplay.textContent =
    stop?.name || "—";

  el.scheduledTimeDisplay.textContent =
    stop?.time || "—";

  el.stopProgress.textContent =
    `Stop ${Math.min(
      state.currentStopIndex + 1,
      state.stops.length
    )} of ${state.stops.length}`;

  const percentage =
    state.stops.length > 0
      ? ((state.currentStopIndex + 1) /
          state.stops.length) *
        100
      : 0;

  el.journeyProgressBar.style.width =
    `${percentage}%`;

  el.previousStopButton.disabled =
    state.currentStopIndex <= 0;

  el.nextStopButton.disabled =
    state.currentStopIndex >=
    state.stops.length - 1;
}

function stopJourney(playEndMessage = true) {
  if (state.gpsWatchId !== null) {
    navigator.geolocation.clearWatch(
      state.gpsWatchId
    );

    state.gpsWatchId = null;
  }

  state.active = false;
  state.position = null;
  state.stationarySince = null;

  el.systemStatus.textContent = "Offline";
  el.gpsStatus.textContent = "Stopped";
  el.gpsAccuracyBadge.textContent = "Not active";
  el.speedDisplay.textContent = "— mph";
  el.distanceDisplay.textContent = "—";

  setJourneyControls(false);

  el.startJourneyButton.disabled =
    !state.departure;

  el.stopJourneyButton.disabled = true;

  if (playEndMessage) {
    stopAudio();
  }
}

function setJourneyControls(enabled) {
  el.previousStopButton.disabled = !enabled;
  el.nextStopButton.disabled = !enabled;
  el.announceNextButton.disabled = !enabled;
  el.announceThisButton.disabled = !enabled;
  el.announceDelayButton.disabled = !enabled;
  el.announceEarlyButton.disabled = !enabled;

  el.messageButtons.forEach(button => {
    button.disabled = !enabled;
  });
}

function getCurrentStop() {
  return state.stops[state.currentStopIndex] || null;
}

function isFinalStop() {
  return (
    state.currentStopIndex ===
    state.stops.length - 1
  );
}

function stopKey(stop) {
  return `${state.currentStopIndex}-${stop.id}-${stop.name}`;
}

function getServiceNumber() {
  return (
    state.routeData?.service ||
    state.selectedRoute ||
    "—"
  );
}

function getBrandName() {
  return (
    state.departure?.brand ||
    state.journey?.brand ||
    state.routeData?.brand ||
    "Lynx"
  );
}

function getDestination() {
  return (
    state.departure?.destination ||
    state.journey?.destination ||
    state.routeData?.destination ||
    "the destination"
  );
}

function cleanText(value) {
  return String(value || "")
    .replace(/Wells-next-the-Sea/gi, "Wells next the Sea")
    .replace(/King's Lynn/gi, "Kings Lynn")
    .replace(/\bCo-Op\b/gi, "Co-op")
    .replace(/\bCH1\b/gi, "C H one")
    .replace(/\s+/g, " ")
    .trim();
}

function distanceMetres(lat1, lng1, lat2, lng2) {
  if (
    !Number.isFinite(lat1) ||
    !Number.isFinite(lng1) ||
    !Number.isFinite(lat2) ||
    !Number.isFinite(lng2)
  ) {
    return Infinity;
  }

  const radius = 6371000;
  const toRadians = value =>
    value * Math.PI / 180;

  const latitude1 = toRadians(lat1);
  const latitude2 = toRadians(lat2);

  const latitudeDifference =
    toRadians(lat2 - lat1);

  const longitudeDifference =
    toRadians(lng2 - lng1);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDifference / 2) ** 2;

  return (
    2 *
    radius *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}

function formatDistance(distance) {
  if (!Number.isFinite(distance)) {
    return "—";
  }

  if (distance < 1000) {
    return `${Math.round(distance)} m`;
  }

  return `${(distance / 1000).toFixed(1)} km`;
}

function formatDirection(direction) {
  return String(direction)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, character =>
      character.toUpperCase()
    );
}

function startClock() {
  function update() {
    el.currentTime.textContent =
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      });
  }

  update();

  state.clockTimer = setInterval(
    update,
    1000
  );
}

function showError(message) {
  el.errorModalText.textContent = message;
  el.errorModal.classList.remove("hidden");
}

function hideError() {
  el.errorModal.classList.add("hidden");
}