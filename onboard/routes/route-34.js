"use strict";

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

(function registerRoute34() {
  const SERVICE = "34";

  function addMinutes(time, minutesToAdd) {
    const parts = String(time).split(":").map(Number);

    if (
      parts.length !== 2 ||
      !Number.isFinite(parts[0]) ||
      !Number.isFinite(parts[1])
    ) {
      return "";
    }

    const totalMinutes =
      parts[0] * 60 +
      parts[1] +
      minutesToAdd;

    const normalised =
      ((totalMinutes % 1440) + 1440) % 1440;

    const hours = Math.floor(normalised / 60);
    const minutes = normalised % 60;

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0")
    );
  }

  function makeStop({
    id,
    name,
    announcementName,
    lat,
    lng,
    offset,
    timingPoint = false,
    arrivalRadius = 85,
    nextRadius = 260
  }) {
    return {
      id,
      name,
      announcementName:
        announcementName || name,
      lat,
      lng,
      offset,
      timingPoint,
      arrivalRadius,
      nextRadius
    };
  }

  /*
   * KING'S LYNN TO HUNSTANTON
   */
  const outboundPattern = [
    makeStop({
      id: "kings-lynn-interchange-e",
      name:
        "King's Lynn Transport Interchange, Stand E",
      announcementName:
        "Kings Lynn Transport Interchange",
      lat: 52.75543,
      lng: 0.40443,
      offset: 0,
      timingPoint: true,
      arrivalRadius: 110,
      nextRadius: 300
    }),

    makeStop({
      id: "kettlewell-lane",
      name:
        "King's Lynn, Kettlewell Lane",
      lat: 52.75972,
      lng: 0.41354,
      offset: 2
    }),

    makeStop({
      id: "highgate-school",
      name:
        "King's Lynn, Highgate School",
      lat: 52.76316,
      lng: 0.41883,
      offset: 3
    }),

    makeStop({
      id: "king-edward-school",
      name:
        "King's Lynn, King Edward VII School",
      announcementName:
        "King Edward the Seventh School",
      lat: 52.76627,
      lng: 0.42318,
      offset: 4
    }),

    makeStop({
      id: "gaywood-tesco",
      name: "Gaywood, Tesco",
      announcementName: "Gaywood Tesco",
      lat: 52.77189,
      lng: 0.43058,
      offset: 5,
      timingPoint: true
    }),

    makeStop({
      id: "health-centre",
      name:
        "King's Lynn, Health Centre",
      lat: 52.77323,
      lng: 0.43362,
      offset: 5
    }),

    makeStop({
      id: "kent-road",
      name:
        "King's Lynn, Kent Road",
      lat: 52.77441,
      lng: 0.43710,
      offset: 6
    }),

    makeStop({
      id: "queensway",
      name:
        "King's Lynn, Queensway",
      lat: 52.77538,
      lng: 0.44050,
      offset: 7
    }),

    makeStop({
      id: "elvington-road",
      name:
        "King's Lynn, Elvington Road",
      lat: 52.77644,
      lng: 0.44430,
      offset: 8
    }),

    makeStop({
      id: "qe-hospital-travel-hub",
      name:
        "Queen Elizabeth Hospital Travel Hub",
      announcementName:
        "Queen Elizabeth Hospital Travel Hub",
      lat: 52.77819,
      lng: 0.44908,
      offset: 10,
      timingPoint: true,
      arrivalRadius: 110,
      nextRadius: 320
    }),

    makeStop({
      id: "castle-rising-turn",
      name:
        "Castle Rising, Mill House Turn",
      lat: 52.80697,
      lng: 0.47461,
      offset: 16
    }),

    makeStop({
      id: "sandringham-post-box",
      name:
        "Sandringham, Post Box",
      lat: 52.82481,
      lng: 0.50059,
      offset: 18,
      timingPoint: true
    }),

    makeStop({
      id: "cats-bottom-cottages",
      name:
        "Sandringham, Cats Bottom Cottages",
      lat: 52.83112,
      lng: 0.50542,
      offset: 19
    }),

    makeStop({
      id: "edinburgh-plantation",
      name:
        "Sandringham, Edinburgh Plantation",
      lat: 52.83700,
      lng: 0.50595,
      offset: 20
    }),

    makeStop({
      id: "dersingham-manor-road",
      name:
        "Dersingham, Manor Road",
      lat: 52.84266,
      lng: 0.50387,
      offset: 24
    }),

    makeStop({
      id: "dersingham-hipkin-road",
      name:
        "Dersingham, Hipkin Road",
      lat: 52.84413,
      lng: 0.50393,
      offset: 24
    }),

    makeStop({
      id: "dersingham-viceroy-close",
      name:
        "Dersingham, Viceroy Close",
      lat: 52.84608,
      lng: 0.50426,
      offset: 25
    }),

    makeStop({
      id: "dersingham-station-road",
      name:
        "Dersingham, Station Road",
      lat: 52.84767,
      lng: 0.50372,
      offset: 26,
      timingPoint: true
    }),

    makeStop({
      id: "dersingham-pansey-drive",
      name:
        "Dersingham, Pansey Drive",
      lat: 52.84994,
      lng: 0.50298,
      offset: 27
    }),

    makeStop({
      id: "dersingham-thaxters",
      name:
        "Dersingham, Thaxters",
      lat: 52.85218,
      lng: 0.50242,
      offset: 29,
      timingPoint: true
    }),
    
        makeStop({
      id: "ingoldisthorpe-ingoldsby",
      name:
        "Ingoldisthorpe, Ingoldsby Avenue",
      lat: 52.86145,
      lng: 0.50093,
      offset: 30
    }),

    makeStop({
      id: "ingoldisthorpe-pond",
      name:
        "Ingoldisthorpe, The Pond",
      lat: 52.86465,
      lng: 0.50088,
      offset: 31
    }),

    makeStop({
      id: "ingoldisthorpe-coaly-lane",
      name:
        "Ingoldisthorpe, Coaly Lane",
      lat: 52.86806,
      lng: 0.50104,
      offset: 31
    }),

    makeStop({
      id: "snettisham-station-road",
      name:
        "Snettisham, Station Road",
      lat: 52.87321,
      lng: 0.50142,
      offset: 32
    }),

    makeStop({
      id: "snettisham-strickland",
      name:
        "Snettisham, Strickland Avenue",
      lat: 52.87542,
      lng: 0.50157,
      offset: 34
    }),

    makeStop({
      id: "snettisham-grapes",
      name:
        "Snettisham, Grapes",
      lat: 52.87754,
      lng: 0.50186,
      offset: 35,
      timingPoint: true
    }),

    makeStop({
      id: "heacham-bottom-farm",
      name:
        "Heacham, Bottom Farm",
      lat: 52.88713,
      lng: 0.49853,
      offset: 36
    }),

    makeStop({
      id: "heacham-collingwood",
      name:
        "Heacham, Collingwood Close",
      lat: 52.89142,
      lng: 0.49720,
      offset: 37
    }),

    makeStop({
      id: "heacham-fenside",
      name:
        "Heacham, Fenside",
      lat: 52.89516,
      lng: 0.49594,
      offset: 38
    }),

    makeStop({
      id: "heacham-fengate",
      name:
        "Heacham, Fengate",
      lat: 52.89725,
      lng: 0.49551,
      offset: 39
    }),

    makeStop({
      id: "heacham-jennings-close",
      name:
        "Heacham, Jennings Close",
      lat: 52.89950,
      lng: 0.49491,
      offset: 40
    }),

    makeStop({
      id: "heacham-college-drive",
      name:
        "Heacham, College Drive",
      lat: 52.90163,
      lng: 0.49447,
      offset: 41
    }),

    makeStop({
      id: "heacham-poplar-avenue",
      name:
        "Heacham, Poplar Avenue",
      lat: 52.90435,
      lng: 0.49386,
      offset: 42
    }),

    makeStop({
      id: "heacham-fox-hound",
      name:
        "Heacham, Fox and Hound",
      lat: 52.90836,
      lng: 0.49282,
      offset: 44,
      timingPoint: true
    }),

    makeStop({
      id: "heacham-high-street",
      name:
        "Heacham, High Street",
      lat: 52.91061,
      lng: 0.49301,
      offset: 45
    }),

    makeStop({
      id: "heacham-church-lane",
      name:
        "Heacham, Church Lane",
      lat: 52.91253,
      lng: 0.49322,
      offset: 46
    }),

    makeStop({
      id: "heacham-manor-road",
      name:
        "Heacham, Manor Road",
      lat: 52.91523,
      lng: 0.49350,
      offset: 47
    }),

    makeStop({
      id: "hunstanton-redgate-hill",
      name:
        "Hunstanton, Redgate Hill",
      lat: 52.92835,
      lng: 0.49421,
      offset: 49
    }),

    makeStop({
      id: "hunstanton-phillips-chase",
      name:
        "Hunstanton, Phillips Chase",
      lat: 52.93201,
      lng: 0.49442,
      offset: 51
    }),

    makeStop({
      id: "hunstanton-tudor-crescent",
      name:
        "Hunstanton, Tudor Crescent",
      lat: 52.93401,
      lng: 0.49434,
      offset: 52
    }),

    makeStop({
      id: "hunstanton-no-14",
      name:
        "Hunstanton, Number 14",
      lat: 52.93550,
      lng: 0.49416,
      offset: 52
    }),

    makeStop({
      id: "hunstanton-manor-park",
      name:
        "Hunstanton, Manor Park",
      lat: 52.93713,
      lng: 0.49393,
      offset: 53
    }),

    makeStop({
      id: "hunstanton-holiday-camp",
      name:
        "Hunstanton, Holiday Camp",
      lat: 52.93901,
      lng: 0.49385,
      offset: 53
    }),

    makeStop({
      id: "hunstanton-tesco",
      name:
        "Hunstanton, Tesco",
      lat: 52.94371,
      lng: 0.49369,
      offset: 54,
      timingPoint: true
    }),

    makeStop({
      id: "hunstanton-travel-hub",
      name:
        "Hunstanton Travel Hub",
      announcementName:
        "Hunstanton Travel Hub",
      lat: 52.93955,
      lng: 0.48967,
      offset: 59,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 320
    })
  ];
  /*
   * ROUTE 34 INBOUND
   * HUNSTANTON TO KING'S LYNN
   */
  const inboundPattern = [
    makeStop({
      id: "hunstanton-travel-hub-in",
      name: "Hunstanton Travel Hub, Stand A",
      announcementName: "Hunstanton Travel Hub",
      lat: 52.93955,
      lng: 0.48967,
      offset: 0,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 320
    }),

    makeStop({
      id: "hunstanton-tesco-in",
      name: "Hunstanton, Tesco",
      announcementName: "Hunstanton Tesco",
      lat: 52.94371,
      lng: 0.49369,
      offset: 2,
      timingPoint: true
    }),

    makeStop({
      id: "hunstanton-redgate-hill-in",
      name: "Hunstanton, Redgate Hill",
      lat: 52.92835,
      lng: 0.49421,
      offset: 3
    }),

    makeStop({
      id: "hunstanton-manor-park-in",
      name: "Hunstanton, Manor Park",
      lat: 52.93713,
      lng: 0.49393,
      offset: 4
    }),

    makeStop({
      id: "hunstanton-number-14-in",
      name: "Hunstanton, Number 14",
      lat: 52.93550,
      lng: 0.49416,
      offset: 5
    }),

    makeStop({
      id: "hunstanton-tudor-crescent-in",
      name: "Hunstanton, Tudor Crescent",
      lat: 52.93401,
      lng: 0.49434,
      offset: 6
    }),

    makeStop({
      id: "hunstanton-phillips-chase-in",
      name: "Hunstanton, Phillips Chase",
      lat: 52.93201,
      lng: 0.49442,
      offset: 7
    }),

    makeStop({
      id: "heacham-manor-road-in",
      name: "Heacham, Manor Road",
      lat: 52.91523,
      lng: 0.49350,
      offset: 9
    }),

    makeStop({
      id: "heacham-church-lane-in",
      name: "Heacham, Church Lane",
      lat: 52.91253,
      lng: 0.49322,
      offset: 10
    }),

    makeStop({
      id: "heacham-high-street-in",
      name: "Heacham, High Street",
      lat: 52.91061,
      lng: 0.49301,
      offset: 11
    }),

    makeStop({
      id: "heacham-fox-and-hound-in",
      name: "Heacham, Fox and Hound",
      lat: 52.90836,
      lng: 0.49282,
      offset: 12,
      timingPoint: true
    }),

    makeStop({
      id: "heacham-poplar-avenue-in",
      name: "Heacham, Poplar Avenue",
      lat: 52.90435,
      lng: 0.49386,
      offset: 13
    }),

    makeStop({
      id: "heacham-college-drive-in",
      name: "Heacham, College Drive",
      lat: 52.90163,
      lng: 0.49447,
      offset: 14
    }),

    makeStop({
      id: "heacham-jennings-close-in",
      name: "Heacham, Jennings Close",
      lat: 52.89950,
      lng: 0.49491,
      offset: 15
    }),

    makeStop({
      id: "heacham-fengate-in",
      name: "Heacham, Fengate",
      lat: 52.89725,
      lng: 0.49551,
      offset: 16
    }),

    makeStop({
      id: "heacham-fenside-in",
      name: "Heacham, Fenside",
      lat: 52.89516,
      lng: 0.49594,
      offset: 17
    }),

    makeStop({
      id: "heacham-collingwood-close-in",
      name: "Heacham, Collingwood Close",
      lat: 52.89142,
      lng: 0.49720,
      offset: 18
    }),

    makeStop({
      id: "heacham-bottom-farm-in",
      name: "Heacham, Bottom Farm",
      lat: 52.88713,
      lng: 0.49853,
      offset: 19
    }),

    makeStop({
      id: "snettisham-grapes-in",
      name: "Snettisham, Grapes",
      lat: 52.87754,
      lng: 0.50186,
      offset: 22,
      timingPoint: true
    }),

    makeStop({
      id: "snettisham-strickland-avenue-in",
      name: "Snettisham, Strickland Avenue",
      lat: 52.87542,
      lng: 0.50157,
      offset: 23
    }),

    makeStop({
      id: "snettisham-station-road-in",
      name: "Snettisham, Station Road",
      lat: 52.87321,
      lng: 0.50142,
      offset: 24
    }),

    makeStop({
      id: "ingoldisthorpe-coaly-lane-in",
      name: "Ingoldisthorpe, Coaly Lane",
      lat: 52.86806,
      lng: 0.50104,
      offset: 25
    }),

    makeStop({
      id: "ingoldisthorpe-pond-in",
      name: "Ingoldisthorpe, The Pond",
      lat: 52.86465,
      lng: 0.50088,
      offset: 26
    }),

    makeStop({
      id: "ingoldisthorpe-ingoldsby-avenue-in",
      name: "Ingoldisthorpe, Ingoldsby Avenue",
      lat: 52.86145,
      lng: 0.50093,
      offset: 27
    }),

    makeStop({
      id: "dersingham-thaxters-in",
      name: "Dersingham, Thaxters",
      lat: 52.85218,
      lng: 0.50242,
      offset: 29,
      timingPoint: true
    }),

    makeStop({
      id: "dersingham-pansey-drive-in",
      name: "Dersingham, Pansey Drive",
      lat: 52.84994,
      lng: 0.50298,
      offset: 30
    }),

    makeStop({
      id: "dersingham-station-road-in",
      name: "Dersingham, Station Road",
      lat: 52.84767,
      lng: 0.50372,
      offset: 31,
      timingPoint: true
    }),

    makeStop({
      id: "dersingham-viceroy-close-in",
      name: "Dersingham, Viceroy Close",
      lat: 52.84608,
      lng: 0.50426,
      offset: 32
    }),

    makeStop({
      id: "dersingham-hipkin-road-in",
      name: "Dersingham, Hipkin Road",
      lat: 52.84413,
      lng: 0.50393,
      offset: 33
    }),

    makeStop({
      id: "dersingham-manor-road-in",
      name: "Dersingham, Manor Road",
      lat: 52.84266,
      lng: 0.50387,
      offset: 34
    }),

    makeStop({
      id: "sandringham-edinburgh-plantation-in",
      name: "Sandringham, Edinburgh Plantation",
      lat: 52.83700,
      lng: 0.50595,
      offset: 35
    }),

    makeStop({
      id: "sandringham-cats-bottom-cottages-in",
      name: "Sandringham, Cats Bottom Cottages",
      lat: 52.83112,
      lng: 0.50542,
      offset: 36
    }),

    makeStop({
      id: "sandringham-post-box-in",
      name: "Sandringham, Post Box",
      lat: 52.82481,
      lng: 0.50059,
      offset: 37,
      timingPoint: true
    }),

    makeStop({
      id: "castle-rising-mill-house-turn-in",
      name: "Castle Rising, Mill House Turn",
      lat: 52.80697,
      lng: 0.47461,
      offset: 40
    }),

    makeStop({
      id: "qe-hospital-travel-hub-in",
      name: "Queen Elizabeth Hospital Travel Hub",
      announcementName: "Queen Elizabeth Hospital Travel Hub",
      lat: 52.77819,
      lng: 0.44908,
      offset: 46,
      timingPoint: true,
      arrivalRadius: 110,
      nextRadius: 320
    }),

    makeStop({
      id: "kings-lynn-elvington-road-in",
      name: "King's Lynn, Elvington Road",
      lat: 52.77644,
      lng: 0.44430,
      offset: 47
    }),

    makeStop({
      id: "kings-lynn-queensway-in",
      name: "King's Lynn, Queensway",
      lat: 52.77538,
      lng: 0.44050,
      offset: 48
    }),

    makeStop({
      id: "kings-lynn-kent-road-in",
      name: "King's Lynn, Kent Road",
      lat: 52.77441,
      lng: 0.43710,
      offset: 49
    }),

    makeStop({
      id: "kings-lynn-health-centre-in",
      name: "King's Lynn, Health Centre",
      lat: 52.77323,
      lng: 0.43362,
      offset: 50
    }),

    makeStop({
      id: "gaywood-tesco-in",
      name: "Gaywood, Tesco",
      announcementName: "Gaywood Tesco",
      lat: 52.77189,
      lng: 0.43058,
      offset: 51,
      timingPoint: true
    }),

    makeStop({
      id: "kings-lynn-woolpack-in",
      name: "King's Lynn, The Woolpack",
      lat: 52.76871,
      lng: 0.42563,
      offset: 52
    }),

    makeStop({
      id: "kings-lynn-st-katherines-court-in",
      name: "King's Lynn, St Katherines Court",
      announcementName: "Saint Katherines Court",
      lat: 52.76472,
      lng: 0.41918,
      offset: 53
    }),

    makeStop({
      id: "kings-lynn-railway-station-in",
      name: "King's Lynn, Railway Station",
      announcementName: "Kings Lynn Railway Station",
      lat: 52.75397,
      lng: 0.40358,
      offset: 55
    }),

    makeStop({
      id: "kings-lynn-transport-interchange-in",
      name: "King's Lynn Transport Interchange, Stand A",
      announcementName: "Kings Lynn Transport Interchange",
      lat: 52.75543,
      lng: 0.40443,
      offset: 57,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 320
    })
  ];

  const outboundDepartures = [
    "06:10",
    "06:45",
    "07:15",
    "07:40",
    "08:05",
    "08:45",
    "09:15",
    "09:45",
    "10:15",
    "10:45",
    "11:15",
    "11:45",
    "12:15",
    "12:45",
    "13:15",
    "13:45",
    "14:15",
    "14:45",
    "15:15",
    "15:45",
    "16:15",
    "16:50",
    "17:20",
    "18:10",
    "19:10",
    "20:10",
    "21:10"
  ];

  const inboundDepartures = [
    "06:10",
    "06:40",
    "07:20",
    "07:50",
    "08:20",
    "08:50",
    "09:20",
    "09:50",
    "10:20",
    "10:50",
    "11:20",
    "11:50",
    "12:20",
    "12:50",
    "13:20",
    "13:50",
    "14:20",
    "14:50",
    "15:20",
    "15:50",
    "16:20",
    "16:50",
    "17:20",
    "17:50",
    "18:20",
    "19:05",
    "19:35",
    "20:05",
    "21:05",
    "22:05"
  ];

  function buildStops(pattern, departureTime) {
    return pattern.map(stop => ({
      id: stop.id,
      name: stop.name,
      announcementName: stop.announcementName,

      lat: stop.lat,
      lng: stop.lng,

      time: addMinutes(
        departureTime,
        stop.offset
      ),

      timingPoint: stop.timingPoint,

      arrivalRadius: stop.arrivalRadius,
      nextRadius: stop.nextRadius
    }));
  }

  function buildDepartures({
    times,
    pattern,
    direction,
    destination
  }) {
    return times.map(time => ({
      id:
        `${SERVICE}-${direction}-` +
        time.replace(":", ""),

      label:
        `${time} to ${destination}`,

      time,
      destination,
      brand: "Lynx",

      stops: buildStops(
        pattern,
        time
      )
    }));
  }

  const outbound = buildDepartures({
    times: outboundDepartures,
    pattern: outboundPattern,
    direction: "outbound",
    destination: "Hunstanton Travel Hub"
  });

  const inbound = buildDepartures({
    times: inboundDepartures,
    pattern: inboundPattern,
    direction: "inbound",
    destination:
      "King's Lynn Transport Interchange"
  });

  window.LYNX_ROUTES[SERVICE] = {
    service: SERVICE,
    brand: "Lynx",

    name: "King's Lynn to Hunstanton",

    description:
      "Via Gaywood, Queen Elizabeth Hospital, " +
      "Sandringham, Dersingham, Snettisham and Heacham",

    journeys: [
      {
        id: "34-main",

        name: "King's Lynn and Hunstanton",

        directions: [
          {
            id: "outbound",

            name:
              "King's Lynn to Hunstanton",

            origin:
              "King's Lynn Transport Interchange",

            destination:
              "Hunstanton Travel Hub",

            departures: outbound
          },

          {
            id: "inbound",

            name:
              "Hunstanton to King's Lynn",

            origin:
              "Hunstanton Travel Hub",

            destination:
              "King's Lynn Transport Interchange",

            departures: inbound
          }
        ]
      }
    ]
  };
})();