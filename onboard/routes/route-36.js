"use strict";

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

(function registerRoute36() {
  const SERVICE = "36";

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
      announcementName: announcementName || name,
      lat,
      lng,
      offset,
      timingPoint,
      arrivalRadius,
      nextRadius
    };
  }

  const outboundPattern = [
    makeStop({
      id: "kings-lynn-interchange-e",
      name: "King's Lynn Transport Interchange, Stand E",
      announcementName: "Kings Lynn Transport Interchange",
      lat: 52.75543,
      lng: 0.40443,
      offset: 0,
      timingPoint: true,
      arrivalRadius: 110,
      nextRadius: 300
    }),

    makeStop({
      id: "austin-fields",
      name: "King's Lynn, Austin Fields",
      announcementName: "Austin Fields",
      lat: 52.75815,
      lng: 0.40053,
      offset: 1,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "retail-park",
      name: "King's Lynn, Retail Park",
      announcementName: "Retail Park",
      lat: 52.76022,
      lng: 0.39811,
      offset: 2,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "bergen-way",
      name: "King's Lynn, Bergen Way",
      announcementName: "Bergen Way",
      lat: 52.76302,
      lng: 0.39560,
      offset: 3,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "hamburg-way",
      name: "King's Lynn, Hamburg Way",
      announcementName: "Hamburg Way",
      lat: 52.76618,
      lng: 0.39385,
      offset: 4,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "st-james-medical",
      name: "King's Lynn, St James Medical Practice",
      announcementName: "St James Medical Practice",
      lat: 52.76917,
      lng: 0.39347,
      offset: 5,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "nursery-lane",
      name: "South Wootton, Nursery Lane",
      announcementName: "Nursery Lane",
      lat: 52.77309,
      lng: 0.39676,
      offset: 6,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "castle-rising-road",
      name: "South Wootton, Castle Rising Road",
      announcementName: "Castle Rising Road",
      lat: 52.77747,
      lng: 0.39870,
      offset: 7,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "deas-road",
      name: "South Wootton, Deas Road",
      announcementName: "Deas Road",
      lat: 52.78119,
      lng: 0.40136,
      offset: 9,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "langley-road",
      name: "South Wootton, Langley Road",
      announcementName: "Langley Road",
      lat: 52.78419,
      lng: 0.40275,
      offset: 9,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "sandy-lane",
      name: "South Wootton, Sandy Lane",
      announcementName: "Sandy Lane",
      lat: 52.78812,
      lng: 0.40406,
      offset: 10,
      timingPoint: true,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "castle-rising-mill-house",
      name: "Castle Rising, Mill House Turn",
      announcementName: "Castle Rising",
      lat: 52.80697,
      lng: 0.47461,
      offset: 18,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "sandringham-post-box",
      name: "Sandringham, Post Box",
      announcementName: "Sandringham",
      lat: 52.82481,
      lng: 0.50059,
      offset: 22,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 300
    }),

    makeStop({
      id: "dersingham-manor-road",
      name: "Dersingham, Manor Road",
      announcementName: "Dersingham Manor Road",
      lat: 52.84266,
      lng: 0.50387,
      offset: 28,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "dersingham-station-road",
      name: "Dersingham, Station Road",
      announcementName: "Dersingham Station Road",
      lat: 52.84767,
      lng: 0.50372,
      offset: 30,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "snettisham-coop",
      name: "Snettisham, Co-op",
      announcementName: "Snettisham Co-op",
      lat: 52.87752,
      lng: 0.50260,
      offset: 36,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "heacham-bushel-and-strike",
      name: "Heacham, Bushel and Strike",
      announcementName: "Heacham Bushel and Strike",
      lat: 52.90762,
      lng: 0.49071,
      offset: 43,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "heacham-tesco",
      name: "Heacham, Tesco",
      announcementName: "Heacham Tesco",
      lat: 52.91223,
      lng: 0.48902,
      offset: 45,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "hunstanton-smithdon",
      name: "Hunstanton, Smithdon High School",
      announcementName: "Smithdon High School",
      lat: 52.93455,
      lng: 0.49342,
      offset: 50,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "hunstanton-travel-hub",
      name: "Hunstanton Travel Hub",
      announcementName: "Hunstanton Travel Hub",
      lat: 52.93882,
      lng: 0.48964,
      offset: 55,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 320
    }),

    makeStop({
      id: "old-hunstanton-post-office",
      name: "Old Hunstanton, Post Office",
      announcementName: "Old Hunstanton",
      lat: 52.94912,
      lng: 0.48952,
      offset: 60,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "holme-the-white-horse",
      name: "Holme-next-the-Sea, The White Horse",
      announcementName: "Holme next the Sea",
      lat: 52.96026,
      lng: 0.53777,
      offset: 66,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "thornham-orange-tree",
      name: "Thornham, The Orange Tree",
      announcementName: "Thornham",
      lat: 52.95963,
      lng: 0.57835,
      offset: 72,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "titchwell-briarfields",
      name: "Titchwell, Briarfields",
      announcementName: "Titchwell",
      lat: 52.96273,
      lng: 0.62525,
      offset: 77,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "brancaster-village-hall",
      name: "Brancaster, Village Hall",
      announcementName: "Brancaster",
      lat: 52.96439,
      lng: 0.64075,
      offset: 80,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "brancaster-staithe-white-horse",
      name: "Brancaster Staithe, The White Horse",
      announcementName: "Brancaster Staithe",
      lat: 52.96753,
      lng: 0.68069,
      offset: 83,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-deepdale-dalegate",
      name: "Burnham Deepdale, Dalegate Market",
      announcementName: "Dalegate Market",
      lat: 52.96668,
      lng: 0.69135,
      offset: 84,
      timingPoint: true,
      arrivalRadius: 105,
      nextRadius: 300
    }),

    makeStop({
      id: "burnham-market-church-walk",
      name: "Burnham Market, Church Walk",
      announcementName: "Burnham Market Church Walk",
      lat: 52.94431,
      lng: 0.72669,
      offset: 89,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-market-green",
      name: "Burnham Market, The Green",
      announcementName: "Burnham Market",
      lat: 52.94518,
      lng: 0.72875,
      offset: 91,
      timingPoint: true,
      arrivalRadius: 105,
      nextRadius: 300
    }),

    makeStop({
      id: "burnham-market-bellamys",
      name: "Burnham Market, Bellamys Lane",
      announcementName: "Bellamys Lane",
      lat: 52.94640,
      lng: 0.73311,
      offset: 92,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-market-friars",
      name: "Burnham Market, Friars Lane",
      announcementName: "Friars Lane",
      lat: 52.94808,
      lng: 0.73952,
      offset: 93,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-overy-ostrich",
      name: "Burnham Overy Staithe, Ostrich House",
      announcementName: "Burnham Overy Staithe",
      lat: 52.96033,
      lng: 0.74872,
      offset: 93,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-overy-hero",
      name: "Burnham Overy Staithe, The Hero",
      announcementName: "The Hero",
      lat: 52.96062,
      lng: 0.76190,
      offset: 96,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "holkham-victoria",
      name: "Holkham, The Victoria",
      announcementName: "Holkham",
      lat: 52.95319,
      lng: 0.80340,
      offset: 104,
      timingPoint: true,
      arrivalRadius: 100,
      nextRadius: 300
    }),

    makeStop({
      id: "wells-mainsail-yard",
      name: "Wells-next-the-Sea, Mainsail Yard",
      announcementName: "Wells next the Sea Mainsail Yard",
      lat: 52.95438,
      lng: 0.84250,
      offset: 107,
      timingPoint: false,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "wells-quay",
      name: "Wells-next-the-Sea, The Quay",
      announcementName: "Wells next the Sea Quay",
      lat: 52.95604,
      lng: 0.85085,
      offset: 108,
      timingPoint: true,
      arrivalRadius: 115,
      nextRadius: 320
    }),

    makeStop({
      id: "wells-grove-road",
      name: "Wells-next-the-Sea, Grove Road",
      announcementName: "Wells next the Sea Grove Road",
      lat: 52.95093,
      lng: 0.85864,
      offset: 114,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "wells-buttlands",
      name: "Wells-next-the-Sea, The Buttlands",
      announcementName: "Wells next the Sea Buttlands",
      lat: 52.95136,
      lng: 0.85010,
      offset: 116,
      timingPoint: true,
      arrivalRadius: 100,
      nextRadius: 300
    }),

    makeStop({
      id: "wighton-high-street",
      name: "Wighton, High Street",
      announcementName: "Wighton",
      lat: 52.92218,
      lng: 0.88617,
      offset: 122,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "little-walsingham-school",
      name: "Little Walsingham, School",
      announcementName: "Little Walsingham School",
      lat: 52.89496,
      lng: 0.87343,
      offset: 125,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "little-walsingham-bull",
      name: "Little Walsingham, The Bull",
      announcementName: "Little Walsingham",
      lat: 52.89337,
      lng: 0.87398,
      offset: 128,
      timingPoint: true,
      arrivalRadius: 100,
      nextRadius: 300
    }),

    makeStop({
      id: "houghton-st-giles",
      name: "Houghton St Giles, Fakenham Road",
      announcementName: "Houghton St Giles",
      lat: 52.87771,
      lng: 0.87865,
      offset: 130,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "east-barsham-water-lane",
      name: "East Barsham, Water Lane",
      announcementName: "East Barsham",
      lat: 52.86839,
      lng: 0.85127,
      offset: 133,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "fakenham-toll-bar",
      name: "Fakenham, Toll Bar",
      announcementName: "Fakenham Toll Bar",
      lat: 52.84006,
      lng: 0.86149,
      offset: 138,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "fakenham-howland-close",
      name: "Fakenham, Howland Close",
      announcementName: "Howland Close",
      lat: 52.83701,
      lng: 0.85813,
      offset: 139,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "fakenham-oak-street-a",
      name: "Fakenham Oak Street, Stand A",
      announcementName: "Fakenham Oak Street",
      lat: 52.82969,
      lng: 0.84777,
      offset: 140,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 330
    })
  ];

  const inboundPattern = [
    makeStop({
      id: "fakenham-oak-street-a-in",
      name: "Fakenham Oak Street, Stand A",
      announcementName: "Fakenham Oak Street",
      lat: 52.82969,
      lng: 0.84777,
      offset: 0,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 330
    }),

    makeStop({
      id: "fakenham-howland-close-in",
      name: "Fakenham, Howland Close",
      announcementName: "Howland Close",
      lat: 52.83701,
      lng: 0.85813,
      offset: 1,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "fakenham-toll-bar-in",
      name: "Fakenham, Toll Bar",
      announcementName: "Fakenham Toll Bar",
      lat: 52.84006,
      lng: 0.86149,
      offset: 2,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "east-barsham-water-lane-in",
      name: "East Barsham, Water Lane",
      announcementName: "East Barsham",
      lat: 52.86839,
      lng: 0.85127,
      offset: 7,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "houghton-st-giles-in",
      name: "Houghton St Giles, Fakenham Road",
      announcementName: "Houghton St Giles",
      lat: 52.87771,
      lng: 0.87865,
      offset: 10,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "little-walsingham-bull-in",
      name: "Little Walsingham, The Bull",
      announcementName: "Little Walsingham",
      lat: 52.89337,
      lng: 0.87398,
      offset: 12,
      timingPoint: true,
      arrivalRadius: 100,
      nextRadius: 300
    }),

    makeStop({
      id: "little-walsingham-school-in",
      name: "Little Walsingham, School",
      announcementName: "Little Walsingham School",
      lat: 52.89496,
      lng: 0.87343,
      offset: 15,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "wighton-high-street-in",
      name: "Wighton, High Street",
      announcementName: "Wighton",
      lat: 52.92218,
      lng: 0.88617,
      offset: 18,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "wells-buttlands-in",
      name: "Wells-next-the-Sea, The Buttlands",
      announcementName: "Wells next the Sea Buttlands",
      lat: 52.95136,
      lng: 0.85010,
      offset: 24,
      timingPoint: true,
      arrivalRadius: 100,
      nextRadius: 300
    }),

    makeStop({
      id: "wells-grove-road-in",
      name: "Wells-next-the-Sea, Grove Road",
      announcementName: "Wells next the Sea Grove Road",
      lat: 52.95093,
      lng: 0.85864,
      offset: 26,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "wells-quay-in",
      name: "Wells-next-the-Sea, The Quay",
      announcementName: "Wells next the Sea Quay",
      lat: 52.95604,
      lng: 0.85085,
      offset: 32,
      timingPoint: true,
      arrivalRadius: 115,
      nextRadius: 320
    }),

    makeStop({
      id: "wells-mainsail-yard-in",
      name: "Wells-next-the-Sea, Mainsail Yard",
      announcementName: "Wells next the Sea Mainsail Yard",
      lat: 52.95438,
      lng: 0.84250,
      offset: 33,
      timingPoint: false,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "holkham-victoria-in",
      name: "Holkham, The Victoria",
      announcementName: "Holkham",
      lat: 52.95319,
      lng: 0.80340,
      offset: 36,
      timingPoint: true,
      arrivalRadius: 100,
      nextRadius: 300
    }),

    makeStop({
      id: "burnham-overy-hero-in",
      name: "Burnham Overy Staithe, The Hero",
      announcementName: "The Hero",
      lat: 52.96062,
      lng: 0.76190,
      offset: 44,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-overy-ostrich-in",
      name: "Burnham Overy Staithe, Ostrich House",
      announcementName: "Burnham Overy Staithe",
      lat: 52.96033,
      lng: 0.74872,
      offset: 47,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-market-friars-in",
      name: "Burnham Market, Friars Lane",
      announcementName: "Friars Lane",
      lat: 52.94808,
      lng: 0.73952,
      offset: 47,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-market-bellamys-in",
      name: "Burnham Market, Bellamys Lane",
      announcementName: "Bellamys Lane",
      lat: 52.94640,
      lng: 0.73311,
      offset: 48,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-market-green-in",
      name: "Burnham Market, The Green",
      announcementName: "Burnham Market",
      lat: 52.94518,
      lng: 0.72875,
      offset: 49,
      timingPoint: true,
      arrivalRadius: 105,
      nextRadius: 300
    }),

    makeStop({
      id: "burnham-market-church-walk-in",
      name: "Burnham Market, Church Walk",
      announcementName: "Burnham Market Church Walk",
      lat: 52.94431,
      lng: 0.72669,
      offset: 51,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "burnham-deepdale-dalegate-in",
      name: "Burnham Deepdale, Dalegate Market",
      announcementName: "Dalegate Market",
      lat: 52.96668,
      lng: 0.69135,
      offset: 56,
      timingPoint: true,
      arrivalRadius: 105,
      nextRadius: 300
    }),

    makeStop({
      id: "brancaster-staithe-white-horse-in",
      name: "Brancaster Staithe, The White Horse",
      announcementName: "Brancaster Staithe",
      lat: 52.96753,
      lng: 0.68069,
      offset: 57,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "brancaster-village-hall-in",
      name: "Brancaster, Village Hall",
      announcementName: "Brancaster",
      lat: 52.96439,
      lng: 0.64075,
      offset: 60,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "titchwell-briarfields-in",
      name: "Titchwell, Briarfields",
      announcementName: "Titchwell",
      lat: 52.96273,
      lng: 0.62525,
      offset: 63,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "thornham-orange-tree-in",
      name: "Thornham, The Orange Tree",
      announcementName: "Thornham",
      lat: 52.95963,
      lng: 0.57835,
      offset: 68,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "holme-the-white-horse-in",
      name: "Holme-next-the-Sea, The White Horse",
      announcementName: "Holme next the Sea",
      lat: 52.96026,
      lng: 0.53777,
      offset: 74,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "old-hunstanton-post-office-in",
      name: "Old Hunstanton, Post Office",
      announcementName: "Old Hunstanton",
      lat: 52.94912,
      lng: 0.48952,
      offset: 80,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "hunstanton-travel-hub-in",
      name: "Hunstanton Travel Hub",
      announcementName: "Hunstanton Travel Hub",
      lat: 52.93882,
      lng: 0.48964,
      offset: 85,
      timingPoint: true,
      arrivalRadius: 120,
      nextRadius: 320
    }),

    makeStop({
      id: "hunstanton-smithdon-in",
      name: "Hunstanton, Smithdon High School",
      announcementName: "Smithdon High School",
      lat: 52.93455,
      lng: 0.49342,
      offset: 90,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "heacham-tesco-in",
      name: "Heacham, Tesco",
      announcementName: "Heacham Tesco",
      lat: 52.91223,
      lng: 0.48902,
      offset: 95,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "heacham-bushel-and-strike-in",
      name: "Heacham, Bushel and Strike",
      announcementName: "Heacham Bushel and Strike",
      lat: 52.90762,
      lng: 0.49071,
      offset: 97,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "snettisham-coop-in",
      name: "Snettisham, Co-op",
      announcementName: "Snettisham Co-op",
      lat: 52.87752,
      lng: 0.50260,
      offset: 104,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "dersingham-station-road-in",
      name: "Dersingham, Station Road",
      announcementName: "Dersingham Station Road",
      lat: 52.84767,
      lng: 0.50372,
      offset: 110,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 280
    }),

    makeStop({
      id: "dersingham-manor-road-in",
      name: "Dersingham, Manor Road",
      announcementName: "Dersingham Manor Road",
      lat: 52.84266,
      lng: 0.50387,
      offset: 112,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "sandringham-post-box-in",
      name: "Sandringham, Post Box",
      announcementName: "Sandringham",
      lat: 52.82481,
      lng: 0.50059,
      offset: 118,
      timingPoint: true,
      arrivalRadius: 95,
      nextRadius: 300
    }),

    makeStop({
      id: "castle-rising-mill-house-in",
      name: "Castle Rising, Mill House Turn",
      announcementName: "Castle Rising",
      lat: 52.80697,
      lng: 0.47461,
      offset: 122,
      timingPoint: false,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "sandy-lane-in",
      name: "South Wootton, Sandy Lane",
      announcementName: "Sandy Lane",
      lat: 52.78812,
      lng: 0.40406,
      offset: 130,
      timingPoint: true,
      arrivalRadius: 90,
      nextRadius: 280
    }),

    makeStop({
      id: "langley-road-in",
      name: "South Wootton, Langley Road",
      announcementName: "Langley Road",
      lat: 52.78419,
      lng: 0.40275,
      offset: 131,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "deas-road-in",
      name: "South Wootton, Deas Road",
      announcementName: "Deas Road",
      lat: 52.78119,
      lng: 0.40136,
      offset: 131,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "castle-rising-road-in",
      name: "South Wootton, Castle Rising Road",
      announcementName: "Castle Rising Road",
      lat: 52.77747,
      lng: 0.39870,
      offset: 133,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "nursery-lane-in",
      name: "South Wootton, Nursery Lane",
      announcementName: "Nursery Lane",
      lat: 52.77309,
      lng: 0.39676,
      offset: 134,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "st-james-medical-in",
      name: "King's Lynn, St James Medical Practice",
      announcementName: "St James Medical Practice",
      lat: 52.76917,
      lng: 0.39347,
      offset: 135,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "hamburg-way-in",
      name: "King's Lynn, Hamburg Way",
      announcementName: "Hamburg Way",
      lat: 52.76618,
      lng: 0.39385,
      offset: 136,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "bergen-way-in",
      name: "King's Lynn, Bergen Way",
      announcementName: "Bergen Way",
      lat: 52.76302,
      lng: 0.39560,
      offset: 137,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "retail-park-in",
      name: "King's Lynn, Retail Park",
      announcementName: "Retail Park",
      lat: 52.76022,
      lng: 0.39811,
      offset: 138,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "austin-fields-in",
      name: "King's Lynn, Austin Fields",
      announcementName: "Austin Fields",
      lat: 52.75815,
      lng: 0.40053,
      offset: 139,
      timingPoint: false,
      arrivalRadius: 85,
      nextRadius: 260
    }),

    makeStop({
      id: "kings-lynn-interchange-e-in",
      name: "King's Lynn Transport Interchange, Stand E",
      announcementName: "Kings Lynn Transport Interchange",
      lat: 52.75543,
      lng: 0.40443,
      offset: 140,
      timingPoint: true,
      arrivalRadius: 110,
      nextRadius: 300
    })
  ];

  const outboundDepartures = [
    "06:30",
    "07:30",
    "08:30",
    "09:30",
    "10:30",
    "11:30",
    "12:30",
    "13:30",
    "14:30",
    "15:30",
    "16:30"
  ];

  const inboundDepartures = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
  ];

  function buildStops(pattern, departureTime) {
    return pattern.map(stop => ({
      id: stop.id,
      name: stop.name,
      announcementName: stop.announcementName,
      lat: stop.lat,
      lng: stop.lng,
      time: addMinutes(departureTime, stop.offset),
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
      label: `${time} to ${destination}`,
      time,
      destination,
      brand: "Lynx",
      stops: buildStops(pattern, time)
    }));
  }

  const outbound = buildDepartures({
    times: outboundDepartures,
    pattern: outboundPattern,
    direction: "outbound",
    destination: "Fakenham Oak Street"
  });

  const inbound = buildDepartures({
    times: inboundDepartures,
    pattern: inboundPattern,
    direction: "inbound",
    destination: "King's Lynn Transport Interchange"
  });

  window.LYNX_ROUTES[SERVICE] = {
    service: SERVICE,
    brand: "Lynx",
    name: "King's Lynn to Fakenham",
    description:
      "Coastliner via South Wootton, Sandringham, " +
      "Dersingham, Snettisham, Heacham, Hunstanton, " +
      "Burnham Market, Wells-next-the-Sea and Walsingham",
    journeys: [
      {
        id: "36-main",
        name: "King's Lynn and Fakenham",
        directions: [
          {
            id: "outbound",
            name: "King's Lynn to Fakenham",
            origin: "King's Lynn Transport Interchange",
            destination: "Fakenham Oak Street",
            departures: outbound
          },
          {
            id: "inbound",
            name: "Fakenham to King's Lynn",
            origin: "Fakenham Oak Street",
            destination: "King's Lynn Transport Interchange",
            departures: inbound
          }
        ]
      }
    ]
  };
})();