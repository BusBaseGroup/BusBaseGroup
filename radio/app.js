const STREAM_URL =
  "https://YOUR-RADIO-SERVER/live.mp3";


const radio =
  document.getElementById("radioStream");

const playBtn =
  document.getElementById("playBtn");

const playerStatus =
  document.getElementById("playerStatus");

const volume =
  document.getElementById("volume");


let playing = false;


radio.src = STREAM_URL;

radio.volume = Number(volume.value);


playBtn.addEventListener(
  "click",
  async () => {

    if (!playing) {

      playerStatus.textContent =
        "Connecting...";

      try {

        /*
          Reloading the stream here helps
          make sure listeners hear the
          current LIVE point rather than
          an old buffered section.
        */

        radio.src =
          STREAM_URL +
          "?t=" +
          Date.now();

        await radio.play();

        playing = true;

        playBtn.textContent = "❚❚";

        playerStatus.textContent =
          "Listening live";

      } catch (error) {

        console.error(error);

        playerStatus.textContent =
          "Unable to connect";

      }

    } else {

      radio.pause();

      playing = false;

      playBtn.textContent = "▶";

      playerStatus.textContent =
        "Paused";

    }

  }
);


volume.addEventListener(
  "input",
  () => {

    radio.volume =
      Number(volume.value);

  }
);


radio.addEventListener(
  "waiting",
  () => {

    playerStatus.textContent =
      "Buffering...";

  }
);


radio.addEventListener(
  "playing",
  () => {

    playing = true;

    playBtn.textContent = "❚❚";

    playerStatus.textContent =
      "Listening live";

  }
);


radio.addEventListener(
  "error",
  () => {

    playing = false;

    playBtn.textContent = "▶";

    playerStatus.textContent =
      "Station currently unavailable";

  }
);


/*
  =================================
  DEMO STATION INFORMATION
  =================================

  Later this will be replaced with
  real information from the radio
  server.

*/

const stationData = {

  live: false,

  title:
    "Non-Stop Music",

  artist:
    "BusBase Radio",

  show:
    "AutoDJ",

  dj:
    "BusBase Radio",

  listeners:
    "--"

};


function updateStation() {

  document.getElementById(
    "songTitle"
  ).textContent =
    stationData.title;


  document.getElementById(
    "artistName"
  ).textContent =
    stationData.artist;


  document.getElementById(
    "showName"
  ).textContent =
    stationData.show;


  document.getElementById(
    "djName"
  ).textContent =
    stationData.dj;


  document.getElementById(
    "listenerCount"
  ).textContent =
    stationData.listeners;


  const broadcastStatus =
    document.getElementById(
      "broadcastStatus"
    );


  const currentShow =
    document.getElementById(
      "currentShow"
    );


  const currentPresenter =
    document.getElementById(
      "currentPresenter"
    );


  if (stationData.live) {

    broadcastStatus.textContent =
      "LIVE";

    currentShow.textContent =
      stationData.show;

    currentPresenter.textContent =
      "Live with " +
      stationData.dj;

  } else {

    broadcastStatus.textContent =
      "AUTODJ";

    currentShow.textContent =
      "Non-Stop Music";

    currentPresenter.textContent =
      "Powered by AutoDJ";

  }

}


updateStation();
