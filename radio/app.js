/*
========================================
BUSBASE RADIO
Live DJ + GitHub Auto Playlist
========================================
*/


// -------------------------------------
// CASTER.FM LIVE STREAM
// -------------------------------------

// Change this once Caster.fm gives you
// your actual HTTPS listening URL.

const LIVE_STREAM =
  "YOUR_CASTER_FM_STREAM_URL";


// -------------------------------------
// OFFLINE / AUTODJ SONGS
// -------------------------------------

const playlist = [

  {
    title: "Song One",
    artist: "Artist One",
    file: "music/song1.mp3"
  },

  {
    title: "Song Two",
    artist: "Artist Two",
    file: "music/song2.mp3"
  },

  {
    title: "Song Three",
    artist: "Artist Three",
    file: "music/song3.mp3"
  },

  {
    title: "Song Four",
    artist: "Artist Four",
    file: "music/song4.mp3"
  }

];


// -------------------------------------
// ELEMENTS
// -------------------------------------

const audio =
  document.getElementById("radioStream");

const playBtn =
  document.getElementById("playBtn");

const playerStatus =
  document.getElementById("playerStatus");

const songTitle =
  document.getElementById("songTitle");

const artistName =
  document.getElementById("artistName");

const broadcastStatus =
  document.getElementById("broadcastStatus");

const showName =
  document.getElementById("showName");

const djName =
  document.getElementById("djName");

const currentShow =
  document.getElementById("currentShow");

const currentPresenter =
  document.getElementById("currentPresenter");

const volume =
  document.getElementById("volume");


// -------------------------------------
// STATE
// -------------------------------------

let currentSong = 0;

let playing = false;

let usingLiveStream = false;

let checkingLive = false;


// -------------------------------------
// VOLUME
// -------------------------------------

audio.volume =
  Number(volume.value);

volume.addEventListener(
  "input",
  () => {

    audio.volume =
      Number(volume.value);

  }
);


// -------------------------------------
// SHOW AUTODJ INFORMATION
// -------------------------------------

function showAutoDJ() {

  usingLiveStream = false;

  broadcastStatus.textContent =
    "AUTODJ";

  showName.textContent =
    "Non-Stop Music";

  djName.textContent =
    "BusBase Radio";

  currentShow.textContent =
    "Non-Stop Music";

  currentPresenter.textContent =
    "BusBase AutoDJ";

}


// -------------------------------------
// SHOW LIVE INFORMATION
// -------------------------------------

function showLive() {

  usingLiveStream = true;

  broadcastStatus.textContent =
    "LIVE";

  songTitle.textContent =
    "BusBase Radio";

  artistName.textContent =
    "LIVE";

  showName.textContent =
    "Live Broadcast";

  djName.textContent =
    "On Air";

  currentShow.textContent =
    "Live on BusBase Radio";

  currentPresenter.textContent =
    "Live DJ";

}


// -------------------------------------
// LOAD AUTODJ SONG
// -------------------------------------

function loadSong(index) {

  const song =
    playlist[index];

  audio.src =
    song.file;

  songTitle.textContent =
    song.title;

  artistName.textContent =
    song.artist;

  showAutoDJ();

}


// -------------------------------------
// RANDOM SONG
// -------------------------------------

function randomSong() {

  if (playlist.length <= 1) {

    currentSong = 0;

    return;

  }


  let nextSong;

  do {

    nextSong =
      Math.floor(
        Math.random() *
        playlist.length
      );

  } while (
    nextSong === currentSong
  );


  currentSong =
    nextSong;

}


// -------------------------------------
// NEXT AUTODJ SONG
// -------------------------------------

async function nextSong() {

  randomSong();

  loadSong(currentSong);


  if (playing) {

    try {

      await audio.play();

    } catch (error) {

      console.log(error);

    }

  }

}


// -------------------------------------
// CHECK IF DJ IS LIVE
// -------------------------------------

async function checkLiveStream() {

  if (
    checkingLive ||
    LIVE_STREAM.includes(
      "YOUR_CASTER"
    )
  ) {

    return false;

  }


  checkingLive = true;


  try {

    /*
      We create a temporary audio
      connection to see whether the
      live Icecast stream responds.
    */

    const testAudio =
      new Audio();


    testAudio.preload =
      "metadata";


    testAudio.src =
      LIVE_STREAM +
      "?check=" +
      Date.now();


    const result =
      await new Promise(
        resolve => {

          let finished = false;


          const success = () => {

            if (finished) return;

            finished = true;

            testAudio.src = "";

            resolve(true);

          };


          const failed = () => {

            if (finished) return;

            finished = true;

            testAudio.src = "";

            resolve(false);

          };


          testAudio.addEventListener(
            "loadedmetadata",
            success,
            {
              once: true
            }
          );


          testAudio.addEventListener(
            "canplay",
            success,
            {
              once: true
            }
          );


          testAudio.addEventListener(
            "error",
            failed,
            {
              once: true
            }
          );


          setTimeout(
            failed,
            5000
          );

        }
      );


    checkingLive = false;

    return result;


  } catch (error) {

    checkingLive = false;

    return false;

  }

}


// -------------------------------------
// SWITCH TO LIVE DJ
// -------------------------------------

async function switchToLive() {

  if (usingLiveStream) return;


  audio.pause();


  audio.src =
    LIVE_STREAM +
    "?live=" +
    Date.now();


  showLive();


  if (playing) {

    try {

      await audio.play();

      playerStatus.textContent =
        "Listening LIVE";

    } catch (error) {

      console.log(error);

    }

  }

}


// -------------------------------------
// SWITCH BACK TO AUTODJ
// -------------------------------------

async function switchToAutoDJ() {

  if (!usingLiveStream) return;


  randomSong();

  loadSong(currentSong);


  if (playing) {

    try {

      await audio.play();

      playerStatus.textContent =
        "Non-Stop Music";

    } catch (error) {

      console.log(error);

    }

  }

}


// -------------------------------------
// AUTOMATIC LIVE CHECK
// -------------------------------------

async function updateBroadcastSource() {

  const live =
    await checkLiveStream();


  if (
    live &&
    !usingLiveStream
  ) {

    switchToLive();

  }


  if (
    !live &&
    usingLiveStream
  ) {

    switchToAutoDJ();

  }

}


// Check roughly every 10 seconds

setInterval(
  updateBroadcastSource,
  10000
);


// -------------------------------------
// PLAY BUTTON
// -------------------------------------

playBtn.addEventListener(
  "click",
  async () => {


    if (!playing) {

      playing = true;

      playerStatus.textContent =
        "Connecting...";


      const live =
        await checkLiveStream();


      if (live) {

        await switchToLive();

      } else {

        if (
          !audio.src ||
          usingLiveStream
        ) {

          loadSong(currentSong);

        }


        try {

          await audio.play();

        } catch (error) {

          console.log(error);

        }

      }


      playBtn.textContent =
        "❚❚";


      playerStatus.textContent =
        usingLiveStream
          ? "Listening LIVE"
          : "Non-Stop Music";


    } else {

      playing = false;

      audio.pause();

      playBtn.textContent =
        "▶";

      playerStatus.textContent =
        "Paused";

    }

  }
);


// -------------------------------------
// SONG FINISHED
// -------------------------------------

audio.addEventListener(
  "ended",
  () => {

    if (!usingLiveStream) {

      nextSong();

    }

  }
);


// -------------------------------------
// LIVE STREAM FAILED
// -------------------------------------

audio.addEventListener(
  "error",
  () => {

    if (
      usingLiveStream &&
      playing
    ) {

      switchToAutoDJ();

    }

  }
);


// -------------------------------------
// INITIAL SONG
// -------------------------------------

randomSong();

loadSong(currentSong);


// Check for DJ immediately

updateBroadcastSource();
