//  import React, { useState, useEffect } from "react";
//  import Autocomplete from '@mui/material/Autocomplete';
// import opticsBranches from '../assets/data.json'
// import TextField from '@mui/material/TextField';
// const [currentOptics,setCurrentOptics]=useState({"lat": 31.8111189072549, 
//           "lng": 35.21515356901045, 
//           "address": "זולטי 9 רמת שלמה ירושלים", 
//           "details": "אופטיקת מומחים"})
// const shopLocations =[

// { lat: 31.8111189072549, lng: 35.21515356901045, address: "זולטי 7 רמת שלמה ירושלים", details: "אופטיקת מומחים" },

// { lat: 31.790174968679562, lng: 35.19898014288, address: "Your Second Shop Address", details: "Details about the second shop" }

// ];

// // [

// // { lat: 31.8111189072549, lng: 35.21515356901045, address: "זולטי 7 רמת שלמה ירושלים", details: "אופטיקת מומחים" },

// // { lat: 31.790174968679562, lng: 35.19898014288, address: "Your Second Shop Address", details: "Details about the second shop" }

// // ];

// export default function SimpleMap(){

// useEffect(() => {

// const script = document.createElement('script');

// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk';

// script.async = true;

// script.onload = initializeMap;

// document.head.appendChild(script);

// }, []);


// // const initializeMap = () => {

// // var mapOptions = {

// // zoom: 13,

// // center: { lat: 31.8111189072549, lng: 35.21515356901045 },

// // mapTypeId: window.google.maps.MapTypeId.ROADMAP

// // };

// // var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);


// // shopLocations.forEach((location, index) => {

// // var shopMarker = new window.google.maps.Marker({

// // position: location,

// // map: map,

// // title: ShopLocation ${index + 1}

// // });
// const [shopLocation, setShopLocation] = useState({
//   lat: 51.509865,
//   lng: -0.118092,
// });

// const initializeMap = () => {
//   var mapOptions = {
//     zoom: 17,
//     center: { lat: shopLocation.lat, lng: shopLocation.lng },
//     mapTypeId: window.google.maps.MapTypeId.ROADMAP
//   };
//   var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  
//   var shopMarker = new window.google.maps.Marker({
//     position: shopLocation,
//     map: map,
//     title: 'Shop Location'
//   });
// var infoWindow = new window.google.maps.InfoWindow({
//   content: `
//     <div>
//       <h3>Shop Name</h3>
//       <p>Shop Address: Your Shop Address</p>
//       <p>Shop Details: Details about your shop</p>
//     </div>`
// });

// // var infoWindow = new window.google.maps.InfoWindow({

// // content: `

// // <div>

// // <h3>Shop Name ${index + 1}</h3>

// // <p>Shop Address: ${location.address}</p>

// // <p>Shop Details: ${location.details}</p>

// // </div>`

// // });


// shopMarker.addListener('click', function() {

// infoWindow.open(map, shopMarker);

// });



// };



// return (
//   <>
//   <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={top100Films}
//       sx={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Movie" />}
//     />

// <div style={{ height: '100vh', width: '100%' }}>

// <div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>

// </div>
// </>
// );

// }
import React, { useState, useEffect } from "react";

 import Autocomplete from '@mui/material/Autocomplete';
import opticsBranches from '../assets/data.json'
import TextField from '@mui/material/TextField';
export default function SimpleMap(){

//31.8111189072549, 35.21515356901045
const opticsLocation2 = [
 
  { label:"ירושלים","lat": 31.8111189072549, 
    "lng": 35.21515356901045, 
    "address": "זולטי 9 רמת שלמה ירושלים", 
    "details": "אופטיקת מומחים"}, 
    {label:"p","lat": 32.8111189072549, 
      "lng": 35.21515356901045, 
      "address": "זולטי 9 רמת שלמה ירושלים", 
      "details": "אופטיקת מומחים"},
      {label:"p","lat": 31.81189072549, 
        "lng": 35.21515356901045, 
        "address": "זולטי 9 רמת שלמה ירושלים", 
        "details": "אופטיקת מומחים"}]
const [opticsLocation, setShopLocation] = useState({

lat: 31.8111189072549,

lng: 35.21515356901045,

});

const [currentOptics,setCurrentOptics]=useState({"lat": 31.8111189072549, 
          "lng": 35.21515356901045, 
          "address": "זולטי 9 רמת שלמה ירושלים", 
          "details": "אופטיקת מומחים"})

useEffect(() => {

const script = document.createElement('script');

script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk';

script.async = true;

script.onload = initializeMap;

document.head.appendChild(script);

}, []);


const initializeMap = () => {

  var mapOptions = {
  
  zoom: 17,
  
  center: { lat: opticsLocation.lat, lng: opticsLocation.lng },
  
  mapTypeId: window.google.maps.MapTypeId.ROADMAP
  
  };

var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);

var shopMarker = new window.google.maps.Marker({

position: opticsLocation,

map: map,

title: 'Shop Location'

});


var infoWindow = new window.google.maps.InfoWindow({

content: `

<div>

<h3>EyeCenter</h3>

<p>EyeCenter Address: ${currentOptics.address}/p>

<p>EyeCenter Details:${currentOptics.details}</p>

</div>`

});


shopMarker.addListener('click', function() {

infoWindow.open(map, shopMarker);

});



}

return (

<div style={{ height: '100vh', width: '100%' }}>
   <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={opticsLocation2}
      sx={{ width: 300 }}
      onChange={(event, value) => setCurrentOptics({"lat": value.lat, 
        "lng": value.lng, 
        "address":value.address,
        "details": value.details})}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
<div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>

</div>

);

}