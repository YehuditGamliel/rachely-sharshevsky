// // //  import React, { useState, useEffect } from "react";
// // //  import Autocomplete from '@mui/material/Autocomplete';
// // // import opticsBranches from '../assets/data.json'
// // // import TextField from '@mui/material/TextField';
// // // const [currentOptics,setCurrentOptics]=useState({"lat": 31.8111189072549, 
// // //           "lng": 35.21515356901045, 
// // //           "address": "זולטי 9 רמת שלמה ירושלים", 
// // //           "details": "אופטיקת מומחים"})
// // // const shopLocations =[

// // // { lat: 31.8111189072549, lng: 35.21515356901045, address: "זולטי 7 רמת שלמה ירושלים", details: "אופטיקת מומחים" },

// // // { lat: 31.790174968679562, lng: 35.19898014288, address: "Your Second Shop Address", details: "Details about the second shop" }

// // // ];

// // // // [

// // // // { lat: 31.8111189072549, lng: 35.21515356901045, address: "זולטי 7 רמת שלמה ירושלים", details: "אופטיקת מומחים" },

// // // // { lat: 31.790174968679562, lng: 35.19898014288, address: "Your Second Shop Address", details: "Details about the second shop" }

// // // // ];

// // // export default function SimpleMap(){

// // // useEffect(() => {

// // // const script = document.createElement('script');

// // // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk';

// // // script.async = true;

// // // script.onload = initializeMap;

// // // document.head.appendChild(script);

// // // }, []);


// // // // const initializeMap = () => {

// // // // var mapOptions = {

// // // // zoom: 13,

// // // // center: { lat: 31.8111189072549, lng: 35.21515356901045 },

// // // // mapTypeId: window.google.maps.MapTypeId.ROADMAP

// // // // };

// // // // var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);


// // // // shopLocations.forEach((location, index) => {

// // // // var shopMarker = new window.google.maps.Marker({

// // // // position: location,

// // // // map: map,

// // // // title: ShopLocation ${index + 1}

// // // // });
// // // const [shopLocation, setShopLocation] = useState({
// // //   lat: 51.509865,
// // //   lng: -0.118092,
// // // });

// // // const initializeMap = () => {
// // //   var mapOptions = {
// // //     zoom: 17,
// // //     center: { lat: shopLocation.lat, lng: shopLocation.lng },
// // //     mapTypeId: window.google.maps.MapTypeId.ROADMAP
// // //   };
// // //   var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  
// // //   var shopMarker = new window.google.maps.Marker({
// // //     position: shopLocation,
// // //     map: map,
// // //     title: 'Shop Location'
// // //   });
// // // var infoWindow = new window.google.maps.InfoWindow({
// // //   content: `
// // //     <div>
// // //       <h3>Shop Name</h3>
// // //       <p>Shop Address: Your Shop Address</p>
// // //       <p>Shop Details: Details about your shop</p>
// // //     </div>`
// // // });

// // // // var infoWindow = new window.google.maps.InfoWindow({

// // // // content: `

// // // // <div>

// // // // <h3>Shop Name ${index + 1}</h3>

// // // // <p>Shop Address: ${location.address}</p>

// // // // <p>Shop Details: ${location.details}</p>

// // // // </div>`

// // // // });


// // // shopMarker.addListener('click', function() {

// // // infoWindow.open(map, shopMarker);

// // // });



// // // };



// // // return (
// // //   <>
// // //   <Autocomplete
// // //       disablePortal
// // //       id="combo-box-demo"
// // //       options={top100Films}
// // //       sx={{ width: 300 }}
// // //       renderInput={(params) => <TextField {...params} label="Movie" />}
// // //     />

// // // <div style={{ height: '100vh', width: '100%' }}>

// // // <div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>

// // // </div>
// // // </>
// // // );

// // // }
// // import React, { useState, useEffect } from "react";

// //  import Autocomplete from '@mui/material/Autocomplete';
// // import opticsBranches from '../assets/data.json'
// // import TextField from '@mui/material/TextField';
// // export default function SimpleMap(){

// // //31.8111189072549, 35.21515356901045
// // const opticsLocation2 = [
 
// //   { label:"ירושלים","lat": 31.8111189072549, 
// //     "lng": 35.21515356901045, 
// //     "address": "זולטי 9 רמת שלמה ירושלים", 
// //     "details": "אופטיקת מומחים"}, 
// //     {label:"p","lat": 32.8111189072549, 
// //       "lng": 35.21515356901045, 
// //       "address": "זולטי 9 רמת שלמה ירושלים", 
// //       "details": "אופטיקת מומחים"},
// //       {label:"p","lat": 31.81189072549, 
// //         "lng": 35.21515356901045, 
// //         "address": "זולטי 9 רמת שלמה ירושלים", 
// //         "details": "אופטיקת מומחים"}]
// // const [opticsLocation, setShopLocation] = useState({

// // lat: 31.8111189072549,

// // lng: 35.21515356901045,

// // });

// // const [currentOptics,setCurrentOptics]=useState({"index": 1, 
// //         })

// // useEffect(() => {

// // const script = document.createElement('script');

// // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk';

// // script.async = true;

// // script.onload = initializeMap;

// // document.head.appendChild(script);

// // }, []);


// // const initializeMap = () => {

// //   var mapOptions = {
  
// //   zoom: 17,
  
// //   center: { lat: opticsLocation.lat, lng: opticsLocation.lng },
  
// //   mapTypeId: window.google.maps.MapTypeId.ROADMAP
  
// //   };

// // var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);

// // var shopMarker = new window.google.maps.Marker({

// // position: opticsLocation,

// // map: map,

// // title: 'Shop Location'

// // });


// // var infoWindow = new window.google.maps.InfoWindow({

// // content: `

// // <div>

// // <h3>EyeCenter</h3>

// // <p>EyeCenter Address: ${opticsBranches[currentOptics.index].address}/p>

// // <p>EyeCenter Details:${opticsBranches[currentOptics.index].details}</p>

// // </div>`

// // });


// // shopMarker.addListener('click', function() {

// // infoWindow.open(map, shopMarker);

// // });



// // }

// // return (

// // <div style={{ height: '100vh', width: '100%' }}>
// //    <Autocomplete
// //       disablePortal
// //       id="combo-box-demo"
// //       options={opticsLocation2}
// //       sx={{ width: 300 }}
// //       onChange={(event, value) => setCurrentOptics({"index": value.index}
// //         //setShopLocation()
// //       )}
// //       renderInput={(params) => <TextField {...params} label="Movie" />}
// //     />
// // <div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>

// // </div>

// // );

// // }
// import React, { Component,useState } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import FmdGoodIcon from '@mui/icons-material/FmdGood';
// const mapStyles = {
//   right: "0%",
//   left: "0%",
//   bottom: "20%",
//   top: "0%",
// };

// export class GoogleMap extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: null,
//     selectedPlace: {},
//     validLocation: true
//   };

//   componentDidMount() {
//     if (isNaN(this.props.lat) || isNaN(this.props.lng)) {
//       this.setState({ validLocation: false });
//     }
//   }

//   onMarkerClick = (props, marker, e) => {
//     if (this.state.validLocation) {
//       this.setState({
//         selectedPlace: props,
//         activeMarker: marker,
//         showingInfoWindow: true
//       });
//     }
//   };

//   onClose = () => {
//     if (this.state.validLocation && this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };

//   render() {
//     if (!this.state.validLocation) {
//       return <div>Error: Invalid latitude or longitude value</div>;
//     }

//     return (
//       <div className="showmap">
     
//         <Map
//           google={this.props.google}
//           zoom={12
//           style={mapStyles}
//           initialCenter={{ lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng) }}
//         >
//           <Marker
//             onClick={this.onMarkerClick}
//             name={"צימר " + this.props.address }
//           />
//           <InfoWindow
         
//             marker={this.state.activeMarker}
//             visible={this.state.showingInfoWindow}
//             onClose={this.onClose}
//           >
//             <div>
//               <h4>{this.state.selectedPlace.name}</h4>
//             </div>
//           </InfoWindow>
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAVs59O_1wPg60JevpZRTHu4BxbyGIWt8Q",
// })(GoogleMap);