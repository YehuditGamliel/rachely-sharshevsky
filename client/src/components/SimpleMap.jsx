
// // import GoogleMapReact from 'google-map-react';
// // import React, { useState } from "react";
// // // import { Map, Marker} from "@vis.gl/react-google-maps";

// // const AnyReactComponent = ({ text }) => <div>{text}</div>;

// // export default function SimpleMap(){
  
// //   const defaultProps = {
// //     center: {
// //       lat: 10.99835602,
// //       lng: 77.01502627
// //     },
// //     zoom: 11
// //   };
// //   var mapOptions = {
// //     zoom: 17,
// //     center: new google.maps.LatLng(-34.397, 150.644),
// //     mapTypeId: google.maps.MapTypeId.ROADMAP
// //   };
// //   var map = new google.maps.Map(document.getElementById('map_canvas'),
// //       mapOptions);
// //   var GeoMarker = new GeolocationMarker(map);
// //   const [markerLocation, setMarkerLocation] = useState({
// //     lat: 51.509865,
// //     lng: -0.118092,
// //   });
// //   return (
// //     // Important! Always set the container height explicitly
// //     <div style={{ height: '100vh', width: '100%' }}>
      
// //       <GoogleMapReact
// //         bootstrapURLKeys={{ key: "" }}
// //         defaultCenter={markerLocation}
// //         defaultZoom={defaultProps.zoom}
// //         gestureHandling={"greedy"}
// //         disableDefaultUI
// //       >
// //         <AnyReactComponent
// //           lat={59.955413}
// //           lng={30.337844}
// //           text="My Marker"
// //         />
// //       </GoogleMapReact>
// //         {/* <Map
// //         style={{ borderRadius: "20px" }}
// //         defaultZoom={13}
// //         defaultCenter={markerLocation}
// //         gestureHandling={"greedy"}
// //         disableDefaultUI
// //       >
// //         <Marker position={markerLocation} />
// //       </Map> */}
// //     </div>
    
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function SimpleMap(){
//   const [markerLocation, setMarkerLocation] = useState({
//     lat: 51.509865,
//     lng: -0.118092,
//   });

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk`;
//     script.async = true;
//     script.onload = initializeMap;
//     document.head.appendChild(script);
//   }, []);

//   const initializeMap = () => {
//     var mapOptions = {
//       zoom: 17,
//       center: { lat: -34.397, lng: 150.644 },
//       mapTypeId: window.google.maps.MapTypeId.ROADMAP
//     };
//     var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);
//     var GeoMarker = new window.GeolocationMarker(map);
//   };

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

export default function SimpleMap(){
  //31.8111189072549, 35.21515356901045
  const [opticsLocation, setShopLocation] = useState({
    lat: 31.8111189072549,
   lng: 35.21515356901045,
  });

  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk`;
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
          <h3>Shop Name</h3>
          <p>EyeCenter Address: זולטי 7 רמת שלמה ירושלים</p>
          <p>EyeCenter Details: אופטיקת מומחים</p>
        </div>`
    });

    shopMarker.addListener('click', function() {
      infoWindow.open(map, shopMarker);
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// //31.811759323159762, 35.217300964163925
// export default function SimpleMap(){
//   const [shopLocation, setShopLocation] = useState({
//     lat: 31.811759323159762,
//     lng: 35.217300964163925,
//   });

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk`;
//     script.async = true;
//     script.onload = initializeMap;
//     document.head.appendChild(script);
//   }, []);

//   const initializeMap = () => {
//     var mapOptions = {
//       zoom: 17,
//       center: { lat: shopLocation.lat, lng: shopLocation.lng },
//       mapTypeId: window.google.maps.MapTypeId.ROADMAP
//     };
//     var map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    
//     var shopMarker = new window.google.maps.Marker({
//       position: shopLocation,
//       map: map,
//       title: 'Shop Location'
//     });
//   };

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <div id="map_canvas" style={{ height: '100%', width: '100%' }}></div>
//     </div>
//   );
// }