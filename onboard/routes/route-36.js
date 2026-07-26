"use strict";

window.LYNX_ROUTES = window.LYNX_ROUTES || {};

(function registerRoute36() {
  const SERVICE = "36";
  const NAPTAN_URL =
    "https://naptan.api.dft.gov.uk/v1/access-nodes" +
    "?dataFormat=csv&atcoAreaCodes=290";

  const outboundPattern = [
  {
    "id": "king-s-lynn-transport-interchange-stand-e",
    "name": "King's Lynn Transport Interchange (Stand E)",
    "announcementName": "King's Lynn Transport Interchange (Stand E)",
    "offset": 0,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-opposite-austin-fields",
    "name": "King's Lynn, opposite Austin Fields",
    "announcementName": "King's Lynn, opposite Austin Fields",
    "offset": 1,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-opposite-retail-park",
    "name": "King's Lynn, opposite Retail Park",
    "announcementName": "King's Lynn, opposite Retail Park",
    "offset": 2,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-opposite-bergen-way",
    "name": "King's Lynn, opposite Bergen Way",
    "announcementName": "King's Lynn, opposite Bergen Way",
    "offset": 3,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-opposite-hamburg-way",
    "name": "King's Lynn, opposite Hamburg Way",
    "announcementName": "King's Lynn, opposite Hamburg Way",
    "offset": 4,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-st-james-medical-practice",
    "name": "King's Lynn, St James Medical Practice",
    "announcementName": "King's Lynn, St James Medical Practice",
    "offset": 5,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-nursery-lane",
    "name": "South Wootton, Nursery Lane",
    "announcementName": "South Wootton, Nursery Lane",
    "offset": 6,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-castle-rising-road",
    "name": "South Wootton, Castle Rising Road",
    "announcementName": "South Wootton, Castle Rising Road",
    "offset": 7,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-deas-road",
    "name": "South Wootton, Deas Road",
    "announcementName": "South Wootton, Deas Road",
    "offset": 9,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-opposite-langley-road",
    "name": "South Wootton, opposite Langley Road",
    "announcementName": "South Wootton, opposite Langley Road",
    "offset": 9,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-opposite-sandy-lane",
    "name": "South Wootton, opposite Sandy Lane",
    "announcementName": "South Wootton, opposite Sandy Lane",
    "offset": 10,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-opposite-castle-reach",
    "name": "South Wootton, opposite Castle Reach",
    "announcementName": "South Wootton, opposite Castle Reach",
    "offset": 10,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-opposite-knight-s-hill",
    "name": "South Wootton, opposite Knight's Hill",
    "announcementName": "South Wootton, opposite Knight's Hill",
    "offset": 11,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "castle-rising-opposite-mill-house-turn",
    "name": "Castle Rising, opposite Mill House Turn",
    "announcementName": "Castle Rising, opposite Mill House Turn",
    "offset": 13,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "sandringham-opposite-post-box",
    "name": "Sandringham, opposite Post Box",
    "announcementName": "Sandringham, opposite Post Box",
    "offset": 14,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "sandringham-opposite-cats-bottom-cottages",
    "name": "Sandringham, opposite Cats Bottom Cottages",
    "announcementName": "Sandringham, opposite Cats Bottom Cottages",
    "offset": 15,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "sandringham-edinburgh-plantation",
    "name": "Sandringham, Edinburgh Plantation",
    "announcementName": "Sandringham, Edinburgh Plantation",
    "offset": 16,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "dersingham-opposite-manor-road",
    "name": "Dersingham, opposite Manor Road",
    "announcementName": "Dersingham, opposite Manor Road",
    "offset": 19,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "dersingham-bank-road",
    "name": "Dersingham, Bank Road",
    "announcementName": "Dersingham, Bank Road",
    "offset": 20,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "dersingham-thaxters",
    "name": "Dersingham, Thaxters",
    "announcementName": "Dersingham, Thaxters",
    "offset": 22,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "ingoldisthorpe-ingoldsby-avenue",
    "name": "Ingoldisthorpe, Ingoldsby Avenue",
    "announcementName": "Ingoldisthorpe, Ingoldsby Avenue",
    "offset": 23,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "ingoldisthorpe-opposite-pond",
    "name": "Ingoldisthorpe, opposite Pond",
    "announcementName": "Ingoldisthorpe, opposite Pond",
    "offset": 25,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "ingoldisthorpe-coaly-lane",
    "name": "Ingoldisthorpe, Coaly Lane",
    "announcementName": "Ingoldisthorpe, Coaly Lane",
    "offset": 25,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "snettisham-station-road",
    "name": "Snettisham, Station Road",
    "announcementName": "Snettisham, Station Road",
    "offset": 26,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "snettisham-strickland-avenue",
    "name": "Snettisham, Strickland Avenue",
    "announcementName": "Snettisham, Strickland Avenue",
    "offset": 26,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "snettisham-grapes",
    "name": "Snettisham, Grapes",
    "announcementName": "Snettisham, Grapes",
    "offset": 29,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-bottom-farm",
    "name": "Heacham, Bottom Farm",
    "announcementName": "Heacham, Bottom Farm",
    "offset": 32,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-collingwood-close",
    "name": "Heacham, opposite Collingwood Close",
    "announcementName": "Heacham, opposite Collingwood Close",
    "offset": 33,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-fenside",
    "name": "Heacham, opposite Fenside",
    "announcementName": "Heacham, opposite Fenside",
    "offset": 34,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-fengate",
    "name": "Heacham, opposite Fengate",
    "announcementName": "Heacham, opposite Fengate",
    "offset": 34,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-jennings-close",
    "name": "Heacham, Jennings Close",
    "announcementName": "Heacham, Jennings Close",
    "offset": 35,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-college-drive",
    "name": "Heacham, opposite College Drive",
    "announcementName": "Heacham, opposite College Drive",
    "offset": 36,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-poplar-avenue",
    "name": "Heacham, Poplar Avenue",
    "announcementName": "Heacham, Poplar Avenue",
    "offset": 37,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-fox-and-hound",
    "name": "Heacham, opposite Fox and Hound",
    "announcementName": "Heacham, opposite Fox and Hound",
    "offset": 38,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-high-street",
    "name": "Heacham, opposite High Street",
    "announcementName": "Heacham, opposite High Street",
    "offset": 39,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-church-lane",
    "name": "Heacham, opposite Church Lane",
    "announcementName": "Heacham, opposite Church Lane",
    "offset": 39,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-manor-road",
    "name": "Heacham, opposite Manor Road",
    "announcementName": "Heacham, opposite Manor Road",
    "offset": 40,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-redgate-hill",
    "name": "Hunstanton, Redgate Hill",
    "announcementName": "Hunstanton, Redgate Hill",
    "offset": 42,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-opposite-tesco",
    "name": "Hunstanton, opposite Tesco",
    "announcementName": "Hunstanton, opposite Tesco",
    "offset": 45,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-travel-hub-stand-b",
    "name": "Hunstanton Travel Hub (Stand B)",
    "announcementName": "Hunstanton Travel Hub (Stand B)",
    "offset": 58,
    "timingPoint": true,
    "preArrivalMessage": "Alight here for Hunstanton Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-opposite-lincoln-square",
    "name": "Hunstanton, opposite Lincoln Square",
    "announcementName": "Hunstanton, opposite Lincoln Square",
    "offset": 60,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-lighthouse-close",
    "name": "Hunstanton, Lighthouse Close",
    "announcementName": "Hunstanton, Lighthouse Close",
    "offset": 61,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "old-hunstanton-opposite-post-office",
    "name": "Old Hunstanton, opposite Post Office",
    "announcementName": "Old Hunstanton, opposite Post Office",
    "offset": 64,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Old Hunstanton Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "old-hunstanton-waterworks-road",
    "name": "Old Hunstanton, Waterworks Road",
    "announcementName": "Old Hunstanton, Waterworks Road",
    "offset": 65,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Old Hunstanton Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "holme-next-the-sea-beach-road",
    "name": "Holme-next-the-Sea, Beach Road",
    "announcementName": "Holme-next-the-Sea, Beach Road",
    "offset": 65,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for the Norfolk Coast Path.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "holme-next-the-sea-peddars-way",
    "name": "Holme-next-the-Sea, Peddars Way",
    "announcementName": "Holme-next-the-Sea, Peddars Way",
    "offset": 68,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for the Norfolk Coast Path.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-drove-orchards",
    "name": "Thornham, Drove Orchards",
    "announcementName": "Thornham, Drove Orchards",
    "offset": 70,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-deli",
    "name": "Thornham Deli",
    "announcementName": "Thornham Deli",
    "offset": 71,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-the-orange-tree",
    "name": "Thornham, The Orange Tree",
    "announcementName": "Thornham, The Orange Tree",
    "offset": 73,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-green-lane",
    "name": "Thornham, Green Lane",
    "announcementName": "Thornham, Green Lane",
    "offset": 73,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-opposite-castle-cottages",
    "name": "Thornham, opposite Castle Cottages",
    "announcementName": "Thornham, opposite Castle Cottages",
    "offset": 74,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "rspb-titchwell-marsh",
    "name": "RSPB Titchwell Marsh",
    "announcementName": "RSPB Titchwell Marsh",
    "offset": 75,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "titchwell-lark-cottage",
    "name": "Titchwell, Lark Cottage",
    "announcementName": "Titchwell, Lark Cottage",
    "offset": 76,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-opposite-the-ship",
    "name": "Brancaster, opposite The Ship",
    "announcementName": "Brancaster, opposite The Ship",
    "offset": 78,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Brancaster Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-opposite-saxon-field",
    "name": "Brancaster, opposite Saxon Field",
    "announcementName": "Brancaster, opposite Saxon Field",
    "offset": 81,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Brancaster Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-staithe-opposite-jolly-sailors",
    "name": "Brancaster Staithe, opposite Jolly Sailors",
    "announcementName": "Brancaster Staithe, opposite Jolly Sailors",
    "offset": 82,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-staithe-the-white-horse",
    "name": "Brancaster Staithe, The White Horse",
    "announcementName": "Brancaster Staithe, The White Horse",
    "offset": 83,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-deepdale-opposite-dalegate-market",
    "name": "Burnham Deepdale, opposite Dalegate Market",
    "announcementName": "Burnham Deepdale, opposite Dalegate Market",
    "offset": 84,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-church-walk",
    "name": "Burnham Market, Church Walk",
    "announcementName": "Burnham Market, Church Walk",
    "offset": 89,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-opposite-the-green",
    "name": "Burnham Market, opposite The Green",
    "announcementName": "Burnham Market, opposite The Green",
    "offset": 91,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-bellamys-lane",
    "name": "Burnham Market, Bellamys Lane",
    "announcementName": "Burnham Market, Bellamys Lane",
    "offset": 92,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-friars-lane",
    "name": "Burnham Market, Friars Lane",
    "announcementName": "Burnham Market, Friars Lane",
    "offset": 93,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-overy-staithe-opposite-ostrich-house",
    "name": "Burnham Overy Staithe, opposite Ostrich House",
    "announcementName": "Burnham Overy Staithe, opposite Ostrich House",
    "offset": 93,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-overy-staithe-opposite-the-hero",
    "name": "Burnham Overy Staithe, opposite The Hero",
    "announcementName": "Burnham Overy Staithe, opposite The Hero",
    "offset": 96,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "holkham-opposite-the-victoria",
    "name": "Holkham, opposite The Victoria",
    "announcementName": "Holkham, opposite The Victoria",
    "offset": 104,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Holkham Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-mainsail-yard",
    "name": "Wells-next-the-Sea, Mainsail Yard",
    "announcementName": "Wells-next-the-Sea, Mainsail Yard",
    "offset": 107,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-quay",
    "name": "Wells-next-the-Sea, Quay",
    "announcementName": "Wells-next-the-Sea, Quay",
    "offset": 108,
    "timingPoint": true,
    "preArrivalMessage": "Alight here for Wells Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-northfield-lane",
    "name": "Wells-next-the-Sea, Northfield Lane",
    "announcementName": "Wells-next-the-Sea, Northfield Lane",
    "offset": 109,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-polka-road-co-op",
    "name": "Wells-next-the-Sea, Polka Road Co-op",
    "announcementName": "Wells-next-the-Sea, Polka Road Co-op",
    "offset": 120,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-opposite-grove-road",
    "name": "Wells-next-the-Sea, opposite Grove Road",
    "announcementName": "Wells-next-the-Sea, opposite Grove Road",
    "offset": 120,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for CH1 to Cromer.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "warham-road",
    "name": "Warham Road",
    "announcementName": "Warham Road",
    "offset": 122,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wighton-high-street",
    "name": "Wighton, High Street",
    "announcementName": "Wighton, High Street",
    "offset": 125,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wighton-buddell-s-lane",
    "name": "Wighton, Buddell's Lane",
    "announcementName": "Wighton, Buddell's Lane",
    "offset": 126,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "little-walsingham-school",
    "name": "Little Walsingham, School",
    "announcementName": "Little Walsingham, School",
    "offset": 130,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "little-walsingham-the-bull",
    "name": "Little Walsingham, The Bull",
    "announcementName": "Little Walsingham, The Bull",
    "offset": 132,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "houghton-st-giles-opposite-fakenham-road",
    "name": "Houghton St Giles, opposite Fakenham Road",
    "announcementName": "Houghton St Giles, opposite Fakenham Road",
    "offset": 133,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "east-barsham-water-lane",
    "name": "East Barsham, Water Lane",
    "announcementName": "East Barsham, Water Lane",
    "offset": 136,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "fakenham-toll-bar",
    "name": "Fakenham, Toll Bar",
    "announcementName": "Fakenham, Toll Bar",
    "offset": 140,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "fakenham-howland-close",
    "name": "Fakenham, Howland Close",
    "announcementName": "Fakenham, Howland Close",
    "offset": 141,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "fakenham-oak-street-stand-a",
    "name": "Fakenham Oak Street (Stand A)",
    "announcementName": "Fakenham Oak Street (Stand A)",
    "offset": 145,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  }
];
  const inboundPattern = [
  {
    "id": "fakenham-oak-street-stand-a",
    "name": "Fakenham Oak Street (Stand A)",
    "announcementName": "Fakenham Oak Street (Stand A)",
    "offset": 0,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "fakenham-opposite-howland-close",
    "name": "Fakenham, opposite Howland Close",
    "announcementName": "Fakenham, opposite Howland Close",
    "offset": 1,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "fakenham-opposite-toll-bar",
    "name": "Fakenham, opposite Toll Bar",
    "announcementName": "Fakenham, opposite Toll Bar",
    "offset": 2,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "east-barsham-opposite-water-lane",
    "name": "East Barsham, opposite Water Lane",
    "announcementName": "East Barsham, opposite Water Lane",
    "offset": 7,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "houghton-st-giles-fakenham-road",
    "name": "Houghton St Giles, Fakenham Road",
    "announcementName": "Houghton St Giles, Fakenham Road",
    "offset": 10,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "little-walsingham-opposite-the-bull",
    "name": "Little Walsingham, opposite The Bull",
    "announcementName": "Little Walsingham, opposite The Bull",
    "offset": 12,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "little-walsingham-opposite-school",
    "name": "Little Walsingham, opposite School",
    "announcementName": "Little Walsingham, opposite School",
    "offset": 15,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wighton-opposite-buddell-s-lane",
    "name": "Wighton, opposite Buddell's Lane",
    "announcementName": "Wighton, opposite Buddell's Lane",
    "offset": 18,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wighton-opposite-high-street",
    "name": "Wighton, opposite High Street",
    "announcementName": "Wighton, opposite High Street",
    "offset": 18,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "warham-road",
    "name": "Warham Road",
    "announcementName": "Warham Road",
    "offset": 21,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-grove-road",
    "name": "Wells-next-the-Sea, Grove Road",
    "announcementName": "Wells-next-the-Sea, Grove Road",
    "offset": 24,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for CH1 to Cromer.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-opposite-polka-road-co-op",
    "name": "Wells-next-the-Sea, opposite Polka Road Co-op",
    "announcementName": "Wells-next-the-Sea, opposite Polka Road Co-op",
    "offset": 33,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-opposite-northfield-lane",
    "name": "Wells-next-the-Sea, opposite Northfield Lane",
    "announcementName": "Wells-next-the-Sea, opposite Northfield Lane",
    "offset": 34,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-opposite-quay",
    "name": "Wells-next-the-Sea, opposite Quay",
    "announcementName": "Wells-next-the-Sea, opposite Quay",
    "offset": 36,
    "timingPoint": true,
    "preArrivalMessage": "Alight here for Wells Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "wells-next-the-sea-opposite-mainsail-yard",
    "name": "Wells-next-the-Sea, opposite Mainsail Yard",
    "announcementName": "Wells-next-the-Sea, opposite Mainsail Yard",
    "offset": 37,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "holkham-the-victoria",
    "name": "Holkham, The Victoria",
    "announcementName": "Holkham, The Victoria",
    "offset": 41,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Holkham Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-overy-staithe-the-hero",
    "name": "Burnham Overy Staithe, The Hero",
    "announcementName": "Burnham Overy Staithe, The Hero",
    "offset": 48,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-overy-staithe-ostrich-house",
    "name": "Burnham Overy Staithe, Ostrich House",
    "announcementName": "Burnham Overy Staithe, Ostrich House",
    "offset": 51,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-opposite-friars-lane",
    "name": "Burnham Market, opposite Friars Lane",
    "announcementName": "Burnham Market, opposite Friars Lane",
    "offset": 52,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-all-saints-church",
    "name": "Burnham Market, All Saints Church",
    "announcementName": "Burnham Market, All Saints Church",
    "offset": 53,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-the-green",
    "name": "Burnham Market, The Green",
    "announcementName": "Burnham Market, The Green",
    "offset": 54,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-market-opposite-church-walk",
    "name": "Burnham Market, opposite Church Walk",
    "announcementName": "Burnham Market, opposite Church Walk",
    "offset": 56,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "burnham-deepdale-dalegate-market",
    "name": "Burnham Deepdale, Dalegate Market",
    "announcementName": "Burnham Deepdale, Dalegate Market",
    "offset": 62,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-staithe-opposite-the-white-horse",
    "name": "Brancaster Staithe, opposite The White Horse",
    "announcementName": "Brancaster Staithe, opposite The White Horse",
    "offset": 63,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-staithe-jolly-sailors",
    "name": "Brancaster Staithe, Jolly Sailors",
    "announcementName": "Brancaster Staithe, Jolly Sailors",
    "offset": 64,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-saxon-field",
    "name": "Brancaster, Saxon Field",
    "announcementName": "Brancaster, Saxon Field",
    "offset": 66,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Brancaster Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "brancaster-the-ship",
    "name": "Brancaster, The Ship",
    "announcementName": "Brancaster, The Ship",
    "offset": 67,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Brancaster Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "titchwell-opposite-lark-cottage",
    "name": "Titchwell, opposite Lark Cottage",
    "announcementName": "Titchwell, opposite Lark Cottage",
    "offset": 69,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "rspb-titchwell-marsh",
    "name": "RSPB Titchwell Marsh",
    "announcementName": "RSPB Titchwell Marsh",
    "offset": 70,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-castle-cottages",
    "name": "Thornham, Castle Cottages",
    "announcementName": "Thornham, Castle Cottages",
    "offset": 71,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-choseley-road",
    "name": "Thornham, Choseley Road",
    "announcementName": "Thornham, Choseley Road",
    "offset": 72,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-opposite-the-orange-tree",
    "name": "Thornham, opposite The Orange Tree",
    "announcementName": "Thornham, opposite The Orange Tree",
    "offset": 73,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-deli",
    "name": "Thornham Deli",
    "announcementName": "Thornham Deli",
    "offset": 74,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "thornham-opposite-drove-orchards",
    "name": "Thornham, opposite Drove Orchards",
    "announcementName": "Thornham, opposite Drove Orchards",
    "offset": 75,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "holme-next-the-sea-opposite-peddars-way",
    "name": "Holme-next-the-Sea, opposite Peddars Way",
    "announcementName": "Holme-next-the-Sea, opposite Peddars Way",
    "offset": 77,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for the Norfolk Coast Path.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "holme-next-the-sea-opposite-beach-road",
    "name": "Holme-next-the-Sea, opposite Beach Road",
    "announcementName": "Holme-next-the-Sea, opposite Beach Road",
    "offset": 78,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for the Norfolk Coast Path.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "old-hunstanton-opposite-waterworks-road",
    "name": "Old Hunstanton, opposite Waterworks Road",
    "announcementName": "Old Hunstanton, opposite Waterworks Road",
    "offset": 80,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Old Hunstanton Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "old-hunstanton-post-office",
    "name": "Old Hunstanton, Post Office",
    "announcementName": "Old Hunstanton, Post Office",
    "offset": 81,
    "timingPoint": false,
    "preArrivalMessage": "Alight here for Old Hunstanton Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-opposite-lighthouse-close",
    "name": "Hunstanton, opposite Lighthouse Close",
    "announcementName": "Hunstanton, opposite Lighthouse Close",
    "offset": 82,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-lincoln-square",
    "name": "Hunstanton, Lincoln Square",
    "announcementName": "Hunstanton, Lincoln Square",
    "offset": 84,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-travel-hub-stand-a",
    "name": "Hunstanton Travel Hub (Stand A)",
    "announcementName": "Hunstanton Travel Hub (Stand A)",
    "offset": 95,
    "timingPoint": true,
    "preArrivalMessage": "Alight here for Hunstanton Beach.",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-tesco",
    "name": "Hunstanton, Tesco",
    "announcementName": "Hunstanton, Tesco",
    "offset": 97,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "hunstanton-opposite-redgate-hill",
    "name": "Hunstanton, opposite Redgate Hill",
    "announcementName": "Hunstanton, opposite Redgate Hill",
    "offset": 99,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-manor-road",
    "name": "Heacham, Manor Road",
    "announcementName": "Heacham, Manor Road",
    "offset": 102,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-church-lane",
    "name": "Heacham, Church Lane",
    "announcementName": "Heacham, Church Lane",
    "offset": 102,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-high-street",
    "name": "Heacham, High Street",
    "announcementName": "Heacham, High Street",
    "offset": 103,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-fox-and-hound",
    "name": "Heacham, Fox and Hound",
    "announcementName": "Heacham, Fox and Hound",
    "offset": 104,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-poplar-avenue",
    "name": "Heacham, Poplar Avenue",
    "announcementName": "Heacham, Poplar Avenue",
    "offset": 105,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-college-drive",
    "name": "Heacham, College Drive",
    "announcementName": "Heacham, College Drive",
    "offset": 106,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-jennings-close",
    "name": "Heacham, opposite Jennings Close",
    "announcementName": "Heacham, opposite Jennings Close",
    "offset": 107,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-fengate",
    "name": "Heacham, Fengate",
    "announcementName": "Heacham, Fengate",
    "offset": 108,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-fenside",
    "name": "Heacham, Fenside",
    "announcementName": "Heacham, Fenside",
    "offset": 109,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-collingwood-close",
    "name": "Heacham, Collingwood Close",
    "announcementName": "Heacham, Collingwood Close",
    "offset": 110,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "heacham-opposite-bottom-farm",
    "name": "Heacham, opposite Bottom Farm",
    "announcementName": "Heacham, opposite Bottom Farm",
    "offset": 111,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "snettisham-opposite-grapes",
    "name": "Snettisham, opposite Grapes",
    "announcementName": "Snettisham, opposite Grapes",
    "offset": 114,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "snettisham-opposite-strickland-avenue",
    "name": "Snettisham, opposite Strickland Avenue",
    "announcementName": "Snettisham, opposite Strickland Avenue",
    "offset": 114,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "snettisham-opposite-station-road",
    "name": "Snettisham, opposite Station Road",
    "announcementName": "Snettisham, opposite Station Road",
    "offset": 115,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "ingoldisthorpe-opposite-coaly-lane",
    "name": "Ingoldisthorpe, opposite Coaly Lane",
    "announcementName": "Ingoldisthorpe, opposite Coaly Lane",
    "offset": 116,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "ingoldisthorpe-pond",
    "name": "Ingoldisthorpe, Pond",
    "announcementName": "Ingoldisthorpe, Pond",
    "offset": 117,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "ingoldisthorpe-opposite-ingoldsby-avenue",
    "name": "Ingoldisthorpe, opposite Ingoldsby Avenue",
    "announcementName": "Ingoldisthorpe, opposite Ingoldsby Avenue",
    "offset": 118,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "dersingham-opposite-thaxters",
    "name": "Dersingham, opposite Thaxters",
    "announcementName": "Dersingham, opposite Thaxters",
    "offset": 120,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "dersingham-opposite-bank-road",
    "name": "Dersingham, opposite Bank Road",
    "announcementName": "Dersingham, opposite Bank Road",
    "offset": 121,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "dersingham-manor-road",
    "name": "Dersingham, Manor Road",
    "announcementName": "Dersingham, Manor Road",
    "offset": 123,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "sandringham-opposite-edinburgh-plantation",
    "name": "Sandringham, opposite Edinburgh Plantation",
    "announcementName": "Sandringham, opposite Edinburgh Plantation",
    "offset": 125,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "sandringham-cats-bottom-cottages",
    "name": "Sandringham, Cats Bottom Cottages",
    "announcementName": "Sandringham, Cats Bottom Cottages",
    "offset": 126,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "sandringham-cross-cottages",
    "name": "Sandringham, Cross Cottages",
    "announcementName": "Sandringham, Cross Cottages",
    "offset": 127,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "castle-rising-mill-house-turn",
    "name": "Castle Rising, Mill House Turn",
    "announcementName": "Castle Rising, Mill House Turn",
    "offset": 129,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-knight-s-hill",
    "name": "South Wootton, Knight's Hill",
    "announcementName": "South Wootton, Knight's Hill",
    "offset": 130,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-castle-reach",
    "name": "South Wootton, Castle Reach",
    "announcementName": "South Wootton, Castle Reach",
    "offset": 130,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-sandy-lane",
    "name": "South Wootton, Sandy Lane",
    "announcementName": "South Wootton, Sandy Lane",
    "offset": 132,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-langley-road",
    "name": "South Wootton, Langley Road",
    "announcementName": "South Wootton, Langley Road",
    "offset": 132,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-opposite-deas-road",
    "name": "South Wootton, opposite Deas Road",
    "announcementName": "South Wootton, opposite Deas Road",
    "offset": 133,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "south-wootton-opposite-nursery-lane",
    "name": "South Wootton, opposite Nursery Lane",
    "announcementName": "South Wootton, opposite Nursery Lane",
    "offset": 134,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-opposite-st-james-medical-practice",
    "name": "King's Lynn, opposite St James Medical Practice",
    "announcementName": "King's Lynn, opposite St James Medical Practice",
    "offset": 135,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-hamburg-way",
    "name": "King's Lynn, Hamburg Way",
    "announcementName": "King's Lynn, Hamburg Way",
    "offset": 136,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-bergen-way",
    "name": "King's Lynn, Bergen Way",
    "announcementName": "King's Lynn, Bergen Way",
    "offset": 138,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-retail-park",
    "name": "King's Lynn, Retail Park",
    "announcementName": "King's Lynn, Retail Park",
    "offset": 140,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-austin-fields",
    "name": "King's Lynn, Austin Fields",
    "announcementName": "King's Lynn, Austin Fields",
    "offset": 141,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-railway-station",
    "name": "King's Lynn, Railway Station",
    "announcementName": "King's Lynn, Railway Station",
    "offset": 143,
    "timingPoint": false,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  },
  {
    "id": "king-s-lynn-transport-interchange-stand-a",
    "name": "King's Lynn Transport Interchange (Stand A)",
    "announcementName": "King's Lynn Transport Interchange (Stand A)",
    "offset": 146,
    "timingPoint": true,
    "preArrivalMessage": "",
    "arrivalRadius": 100,
    "nextRadius": 350,
    "lat": null,
    "lng": null
  }
];

  const outboundDepartures = [
    "06:30", "07:30", "08:30", "09:30", "10:30", "11:30",
    "12:30", "13:30", "14:30", "15:30", "16:30"
  ];

  const inboundDepartures = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  function addMinutes(time, amount) {
    const [hours, minutes] = time.split(":").map(Number);
    const total = hours * 60 + minutes + amount;
    return String(Math.floor(total / 60) % 24).padStart(2, "0") +
      ":" + String(total % 60).padStart(2, "0");
  }

  function buildStops(pattern, departureTime) {
    return pattern.map(stop => ({
      ...stop,
      time: addMinutes(departureTime, stop.offset)
    }));
  }

  function departure(time, pattern, direction, destination) {
    return {
      id: `${SERVICE}-${direction}-${time.replace(":", "")}`,
      label: `${time} to ${destination}`,
      time,
      destination,
      brand: "Lynx",
      stops: buildStops(pattern, time)
    };
  }

  const outbound = outboundDepartures.map(time =>
    departure(time, outboundPattern, "outbound", "Fakenham Oak Street")
  );

  const inbound = inboundDepartures.map(time =>
    departure(
      time,
      inboundPattern,
      "inbound",
      "King's Lynn Transport Interchange"
    )
  );

  const hunstantonIndex = inboundPattern.findIndex(stop =>
    stop.name === "Hunstanton Travel Hub (Stand A)"
  );

  inbound.push(
    departure(
      "18:00",
      inboundPattern.slice(0, hunstantonIndex + 1),
      "inbound",
      "Hunstanton Travel Hub"
    )
  );

  const route = {
    service: SERVICE,
    brand: "Lynx",
    name: "King's Lynn - Hunstanton - Wells - Fakenham",
    description:
      "Coastliner 36 via Hunstanton, Burnham Market, " +
      "Wells-next-the-Sea Polka Road Co-op and Little Walsingham.",
    stopDisplaySettings: {
      showNextStopImmediatelyAfterDeparture: true,
      nextStopAnnouncementWithinMetres: 350,
      thisStopWithinMetres: 100,
      repeatAnnouncements: false
    },
    announcements: {
      welcome:
        "Welcome aboard Lynx service 36.",
      nextStopPrefix: "Next stop, ",
      thisStopPrefix: "This stop, ",
      destinationPrefix: "This is service 36 to "
    },
    journeys: [{
      id: "36-main",
      name: "Coastliner 36",
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
          name: "Fakenham to King's Lynn or Hunstanton",
          origin: "Fakenham Oak Street",
          destination: "King's Lynn Transport Interchange",
          departures: inbound
        }
      ]
    }]
  };

  window.LYNX_ROUTES[SERVICE] = route;

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];

      if (char === '"') {
        if (quoted && text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          quoted = !quoted;
        }
      } else if (char === "," && !quoted) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && text[index + 1] === "\n") index += 1;
        row.push(field);
        if (row.some(value => value !== "")) rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    if (field || row.length) {
      row.push(field);
      rows.push(row);
    }

    const headers = rows.shift().map(value => value.trim());
    return rows.map(values => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = values[index] || "";
      });
      return record;
    });
  }

  function normalise(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/&/g, "and")
      .replace(/opposite/g, "opp")
      .replace(/adjacent/g, "adj")
      .replace(/polka road/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function recordValue(record, names) {
    const keys = Object.keys(record);
    for (const wanted of names) {
      const key = keys.find(item => normalise(item) === normalise(wanted));
      if (key && record[key] !== "") return record[key];
    }
    return "";
  }

  function scoreStop(stop, record) {
    const locality = normalise(recordValue(record, [
      "LocalityName", "Locality Name"
    ]));
    const common = normalise(recordValue(record, [
      "CommonName", "Common Name"
    ]));
    const indicator = normalise(recordValue(record, ["Indicator"]));
    const street = normalise(recordValue(record, ["Street"]));
    const full = `${locality} ${common} ${indicator} ${street}`;
    const wanted = normalise(stop.name);

    let score = 0;
    for (const token of wanted.split(" ")) {
      if (token.length >= 3 && full.includes(token)) score += 1;
    }

    if (wanted.includes("opp") && indicator.includes("opp")) score += 6;
    if (!wanted.includes("opp") && indicator.includes("adj")) score += 2;
    if (wanted.includes("stand a") && indicator.includes("stand a")) score += 10;
    if (wanted.includes("stand b") && indicator.includes("stand b")) score += 10;
    if (wanted.includes("stand e") && indicator.includes("stand e")) score += 10;

    return score;
  }

  function allRouteStops() {
    const seen = new Set();
    const result = [];

    for (const stop of [...outboundPattern, ...inboundPattern]) {
      if (!seen.has(stop.id)) {
        seen.add(stop.id);
        result.push(stop);
      }
    }

    return result;
  }

  route.ready = fetch(NAPTAN_URL, { cache: "no-store" })
    .then(response => {
      if (!response.ok) {
        throw new Error(`NaPTAN returned ${response.status}.`);
      }
      return response.text();
    })
    .then(text => {
      const records = parseCsv(text);

      for (const stop of allRouteStops()) {
        let bestRecord = null;
        let bestScore = -1;

        for (const record of records) {
          const score = scoreStop(stop, record);
          if (score > bestScore) {
            bestScore = score;
            bestRecord = record;
          }
        }

        const lat = Number(recordValue(bestRecord || {}, ["Latitude"]));
        const lng = Number(recordValue(bestRecord || {}, ["Longitude"]));

        if (
          bestScore < 4 ||
          !Number.isFinite(lat) ||
          !Number.isFinite(lng)
        ) {
          throw new Error(
            `Could not find official GPS coordinates for ${stop.name}.`
          );
        }

        stop.lat = lat;
        stop.lng = lng;
        stop.atcoCode = recordValue(bestRecord, [
          "ATCOCode", "ATCO Code"
        ]);
      }

      /*
       * Journey stop objects were copied before GPS loading, so copy the
       * completed coordinates back into every departure.
       */
      const coordinates = new Map(
        allRouteStops().map(stop => [stop.id, stop])
      );

      for (const journey of route.journeys) {
        for (const direction of journey.directions) {
          for (const trip of direction.departures) {
            trip.stops = trip.stops.map(stop => ({
              ...stop,
              lat: coordinates.get(stop.id)?.lat ?? stop.lat,
              lng: coordinates.get(stop.id)?.lng ?? stop.lng,
              atcoCode:
                coordinates.get(stop.id)?.atcoCode ?? stop.atcoCode
            }));
          }
        }
      }

      route.coordinatesReady = true;
      return route;
    })
    .catch(error => {
      route.coordinateError = error;
      route.coordinatesReady = false;
      console.error("Route 36 coordinate error:", error);

      // Keep Service 36 available even when the external NaPTAN
      // request is blocked, unavailable or cannot match a stop.
      return route;
    });
})();