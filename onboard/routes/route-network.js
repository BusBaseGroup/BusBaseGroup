"use strict";
window.LYNX_ROUTES = window.LYNX_ROUTES || {};

(function registerLynxNetworkCatalogue() {
  const DATA = {
    "33": {name:"King's Lynn – Docking – Hunstanton", via:"QE Hospital, Hillington, Bircham, Docking and Sedgeford", a:["King's Lynn Transport Interchange","Queen Elizabeth Hospital Travel Hub","Hillington","Flitcham","Anmer","Bircham","Bircham Tofts","Bircham Newton","Docking","Sedgeford","Heacham Norfolk Lavender","Hunstanton Tesco","Hunstanton Travel Hub"]},
    "33A": {name:"Hunstanton town circular", via:"Tesco, Lavender Chase, Medical Practice and Cliff Parade", a:["Hunstanton Travel Hub","Hunstanton Tesco","Redgate Hill","Lavender Chase","Park Road","Medical Practice","Yarrow Drive","Lighthouse Close","Lincoln Square","Hunstanton Travel Hub"]},
    "33B": {name:"Hunstanton – Ringstead circular", via:"Ringstead and Old Hunstanton", a:["Hunstanton Travel Hub","Hunstanton Tesco","Redgate Hill","Ringstead Gin Trap Inn","Ringstead Holme Road","Old Hunstanton Waterworks Road","Old Hunstanton Post Office","Lighthouse Close","Lincoln Square","Hunstanton Travel Hub"]},
    "33C": {name:"School service: Bircham – Docking – Hunstanton", via:"Bircham Newton, Docking and Sedgeford", a:["Bircham Country Stores","Great Bircham","Bircham Tofts","Bircham Newton CITB","Docking Primary School","Docking Village Hall","Sedgeford","Heacham Norfolk Lavender","Hunstanton Smithdon High School"]},
    "35": {name:"King's Lynn – Sandringham – Hunstanton", via:"Castle Rising, Sandringham, Dersingham, Snettisham and Heacham", a:["King's Lynn Transport Interchange","Edward Benefer Way","South Wootton","Castle Rising","Sandringham Village","Sandringham Visitor Centre","Dersingham","Ingoldisthorpe","Snettisham","Heacham","Hunstanton Tesco","Hunstanton Travel Hub"]},
    "37": {name:"King's Lynn – Downham Market", via:"West Winch, Hilgay, Southery and Ten Mile Bank", a:["King's Lynn Transport Interchange","Hardwick Retail Park","West Winch","Setchey","Watlington","Downham Market","Wimbotsham","Stow Bridge","Hilgay","Southery","Ten Mile Bank"]},
    "38": {name:"King's Lynn – Fair Green", via:"Hardwick Retail Park, West Winch and Middleton", a:["King's Lynn Transport Interchange","Hardwick Retail Park","West Winch","North Runcton","Middleton","Fair Green"]},
    "39": {name:"King's Lynn – Marham", via:"Hardwick Retail Park, West Winch and Shouldham", a:["King's Lynn Transport Interchange","Hardwick Retail Park","West Winch","Setchey","Wormegay","Shouldham","Marham"]},
    "41": {name:"King's Lynn – King's Reach", via:"Gaywood, QE Hospital and Fairstead", a:["King's Lynn Transport Interchange","Kettlewell Lane","Highgate School","Gaywood Tesco","Queen Elizabeth Hospital Travel Hub","Fairstead Corbyn Shaw Road","Montgomery Way","Anthony Nolan Road","Brockley Green","Postmill","Winston Churchill Drive","Queen Elizabeth Hospital Travel Hub","Gaywood Tesco","King's Lynn Transport Interchange"]},
    "42": {name:"King's Lynn – Fairstead", via:"Gaywood", a:["King's Lynn Transport Interchange","Kettlewell Lane","Highgate School","Gaywood Tesco","Queensway","Fairstead","King's Lynn Transport Interchange"]},
    "43": {name:"King's Lynn – North Wootton", via:"Gaywood and Wootton Road", a:["King's Lynn Transport Interchange","Gaywood","Wootton Road","South Wootton","North Wootton"]},
    "44": {name:"The loop: King's Lynn circular", via:"South Wootton, Knights Hill, QE Hospital and Hardwick", a:["King's Lynn Transport Interchange","Austin Fields","Retail Park","St James Medical Practice","South Wootton","Knights Hill","Queen Elizabeth Hospital Travel Hub","Hardwick Retail Park","King's Lynn Transport Interchange"]},
    "46": {name:"King's Lynn – Wisbech", via:"Saddlebow, Terrington St John and West Walton", a:["King's Lynn Transport Interchange","South Lynn","Saddlebow","Islington","Tilney All Saints","Terrington St John","Walpole Highway","West Walton","Walton Highway","Wisbech Horse Fair"]},
    "X46": {name:"King's Lynn – Wisbech express", via:"South Lynn, Tilney and Walton Highway", a:["King's Lynn Transport Interchange","South Lynn","Tilney All Saints","Tilney High End","Terrington St John","Walpole Highway","Walton Highway","Wisbech Horse Fair"]},
    "48": {name:"King's Lynn – Fakenham", via:"QE Hospital, Grimston and the Rudhams", a:["King's Lynn Transport Interchange","Gaywood Tesco","Queen Elizabeth Hospital Travel Hub","Bawsey","Grimston","Pott Row","Congham","Harpley","East Rudham","West Rudham","Tattersett","Fakenham"]},
    "49": {name:"King's Lynn – Fakenham", via:"Grimston and the Rudhams", a:["King's Lynn Transport Interchange","Gaywood Tesco","Grimston","Pott Row","Congham","Harpley","East Rudham","West Rudham","Tattersett","Fakenham"]},
    "49A": {name:"King's Lynn – Fakenham", via:"Gayton, Great Massingham and the Rudhams", a:["King's Lynn Transport Interchange","Gaywood Tesco","Queen Elizabeth Hospital Travel Hub","Gayton","Great Massingham","Harpley","East Rudham","West Rudham","Tattersett","Fakenham"]},
    "48A": {name:"Middleton – Springwood High School", via:"East Winch and Ashwicken", a:["Middleton","East Winch","Ashwicken","Bawsey","Gaywood","Springwood High School"]},
    "54": {name:"King's Lynn – Walpole St Peter", via:"South Lynn, Clenchwarton and Tilney All Saints", a:["King's Lynn Transport Interchange","South Lynn","West Lynn","Clenchwarton","Tilney All Saints","Shepherd's Gate","Hay Green","Walpole Cross Keys","Walpole St Andrew","Walpole St Peter"]},
    "54A": {name:"King's Lynn – Terrington High School", via:"South Lynn and Clenchwarton", a:["King's Lynn Transport Interchange","South Lynn","West Lynn","Clenchwarton","Tilney All Saints","Terrington High School"]},
    "60": {name:"Wisbech – Downham Market", via:"Emneth, Outwell, Upwell and Three Holes", a:["Wisbech Horse Fair","Emneth","Outwell","Upwell","Three Holes","Welney","Littleport Road","Downham Market"]},
    "414": {name:"Dersingham – Alderman Peel High School", via:"Snettisham, Heacham, Hunstanton and Docking", a:["Dersingham","Ingoldisthorpe","Snettisham","Heacham","Hunstanton","Old Hunstanton","Holme","Thornham","Titchwell","Brancaster","Burnham Market","Docking","Wells Alderman Peel High School"]},
    "415": {name:"Dersingham – Alderman Peel High School", via:"Snettisham, Heacham and the coast", a:["Dersingham","Snettisham","Heacham","Hunstanton","Old Hunstanton","Holme","Thornham","Titchwell","Brancaster","Burnham Market","Wells Alderman Peel High School"]}
  };

  const makeStops = (names, reverse=false) => (reverse ? [...names].reverse() : names).map((name,index)=>({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") + "-" + index,
    name,
    announcementName:name,
    lat:null,
    lng:null,
    time:"",
    timingPoint:index===0 || index===names.length-1,
    nextRadius:350,
    arrivalRadius:100
  }));

  Object.entries(DATA).forEach(([service,info])=>{
    if (window.LYNX_ROUTES[service]) return;
    const origin=info.a[0], destination=info.a[info.a.length-1];
    window.LYNX_ROUTES[service]={
      service, brand:"Lynx", name:info.name, description:info.via, manualOnly:true,
      journeys:[{id:`${service}-network`,name:info.name,directions:[
        {id:"outbound",name:`${origin} to ${destination}`,origin,destination,departures:[{id:`${service}-outbound`,label:`${origin} to ${destination}`,time:"",destination,brand:"Lynx",stops:makeStops(info.a)}]},
        {id:"inbound",name:`${destination} to ${origin}`,origin:destination,destination:origin,departures:[{id:`${service}-inbound`,label:`${destination} to ${origin}`,time:"",destination:origin,brand:"Lynx",stops:makeStops(info.a,true)}]}
      ]}]
    };
  });
})();
