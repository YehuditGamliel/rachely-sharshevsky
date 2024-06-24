// // import React, { useState, useEffect } from "react";
//  import opticsBranches from '../assets/data.json'
// // const Map = ({  }) => {
// //   const [nearestOptics, setNearestOptics] = useState(opticsBranches);
// //   const [opticsBranches, setOpticsBranches] = useState([]);
// //   const loadGoogleMapsScript = () => {
// //     // Check if Google Maps API script is already loaded
// //     if (!window.google) {
// //       // Load Google Maps API script if it's not already loaded
// //       const script = document.createElement('script');
// //       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk`;
// //       script.async = true;
// //       script.onload = () => {
// //         // Initialize the map when the script is loaded
// //         if (nearestOptics) {
// //           initializeMap();
// //         }
// //       };
// //       document.head.appendChild(script);
// //     } else {
// //       // Initialize the map if the Google Maps API is already loaded
// //       if (nearestOptics) {
// //         initializeMap();
// //       }
// //     }
// //   };

// //   const initializeMap = () => {
// //     const mapOptions = {
// //       zoom: 13,
// //       center: { lat: nearestOptics.lat, lng: nearestOptics.lng },
// //     };
// //     const map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);
// //     const marker = new window.google.maps.Marker({
// //       position: { lat: nearestOptics.lat, lng: nearestOptics.lng },
// //       map: map,
// //       title: nearestOptics.address
// //     });
// //   };

// //   useEffect(() => {
// //     const fetchedOpticsBranches = jsonData.opticsBranches; // Assuming jsonData contains your opticsBranches data
// //     if (Array.isArray(fetchedOpticsBranches)) {
// //         setOpticsBranches(fetchedOpticsBranches);
// //         loadGoogleMapsScript();
// //     }
   
// //   }, [nearestOptics]);

// //   // Additional code for geolocation and finding nearest optics branch

// //   return (
// //     <div id="map_canvas" style={{ height: '400px', width: '100%' }}>
// //         {opticsBranches.map(branch => (
// //             <div key={branch.address}>
// //                 <p>Branch Address: {branch.address}</p>
// //                 <p>Latitude: {typeof branch.lat === 'number' ? branch.lat : 'Invalid Latitude'}</p>
// //                 <p>Longitude: {typeof branch.lng === 'number' ? branch.lng : 'Invalid Longitude'}</p>
// //             </div>
// //         ))}
// //     </div>
// // );
// // };


// import React, { useState, useEffect } from 'react';
// import jsonData from '../assets/data.json';

// const Map = () => {
//     const [opticsBranches, setOpticsBranches] = useState([]);
//     const [nearestOptics, setNearestOptics] = useState(null);
//     // const initializeMap = () => {
        
//     const initializeMap = () => {
//         // if (!nearestOptics || typeof nearestOptics.lat !== 'number' || typeof nearestOptics.lng !== 'number') {
//         //     console.error('Invalid or missing nearestOptics data. Cannot initialize the map.');
//         //     return;
//         //   }
      
//         // Proceed with map initialization only if nearestOptics contains valid data
//         const mapOptions = {
//           zoom: 13,
//           center: { lat:  31.8111189072549, lng:35.21515356901045 },
//         };
//         const map = new window.google.maps.Map(document.getElementById('map_canvas'), mapOptions);
//         const marker = new window.google.maps.Marker({
//           position: { lat:  31.8111189072549, lng:35.21515356901045 },
//           map: map,
//           title: "ppp"
//         });
//       };
      
//       const loadGoogleMapsScript = () => {
//         if (!window.google) {
//           const script = document.createElement('script');
//           script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk&callback=initGoogleMap`;
//           script.async = true;
//           script.defer = true;
//           script.onload = initializeMap;
//           script.onerror = () => {
//             console.error('Error loading Google Maps API');
//           };
//           window.initGoogleMap = initializeMap;
      
//           document.head.appendChild(script);
//         } else {
//           initializeMap();
//         }
//       };  
//       useEffect(() => {
//         const fetchedOpticsBranches = jsonData.opticsBranches; // Assuming jsonData contains your opticsBranches data
//         if (Array.isArray(fetchedOpticsBranches)) {
//           setOpticsBranches(fetchedOpticsBranches);
//           loadGoogleMapsScript();
//         }
//       }, []);
   
  
//     return (
//       <div id="map_canvas" style={{ height: '400px', width: '100%' }}>
//         {opticsBranches.map(branch => (
//           <div key={branch.address}>
//             <p>Branch Address: {branch.address}</p>
//             <p>Latitude: {typeof branch.lat === 'number' ? branch.lat : 'Invalid Latitude'}</p>
//             <p>Longitude: {typeof branch.lng === 'number' ? branch.lng : 'Invalid Longitude'}</p>
//           </div>
//         ))}
//       </div>
//     );
// };

// export default Map;