// // import React, { useState, useEffect } from 'react';
// // import mapboxgl from 'mapbox-gl';

// // const Maps = () => {
// //     const [map, setMap] = useState(null);

// //     useEffect(() => {
// //         mapboxgl.accessToken = 'sk.eyJ1IjoicmFjaGVseSIsImEiOiJjbHhzMWMwbXMwOHduMmlwZXA4dGttdWgyIn0.2TGVlSPJW1uuPV8hZI7akA'; // Set your Mapbox access token here

// //         const initializeMap = () => {
// //             const map = new mapboxgl.Map({
// //                 container: 'map',
// //                 style: 'mapbox://styles/mapbox/light-v11',
// //                 center: [-77.034084, 38.909671],
// //                 zoom: 13,
// //                 scrollZoom: false
// //             });

// //             setMap(map);
// //         };

// //         if (!mapboxgl.supported()) {
// //             console.log('Mapbox GL not supported');
// //         } else {
// //             initializeMap();
// //         }

// //         return () => {
// //             if (map) {
// //                 map.remove();
// //             }
// //         };
// //     }, []);

// //     return (
// //         <div id="map" style={{ width: '100%', height: '400px' }}></div>
// //     );
// // };

// // export default Maps;
// import mapboxgl from 'mapbox-gl';

// // Set your Mapbox Access Token
// mapboxgl.accessToken = '<UserAccessToken>';

// // Initialize the Mapbox map
// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/light-v11',
//   center: [-77.034084, 38.909671],
//   zoom: 13,
//   scrollZoom: false
// });
// function buildLocationList(stores) {
//     for (const store of stores.features) {
//       /* Add a new listing section to the sidebar. */
//       const listings = document.getElementById('listings');
//       const listing = listings.appendChild(document.createElement('div'));
//       /* Assign a unique `id` to the listing. */
//       listing.id = `listing-${store.properties.id}`;
//       /* Assign the `item` class to each listing for styling. */
//       listing.className = 'item';
  
//       /* Add the link to the individual listing created above. */
//       const link = listing.appendChild(document.createElement('a'));
//       link.href = '#';
//       link.className = 'title';
//       link.id = `link-${store.properties.id}`;
//       link.innerHTML = `${store.properties.address}`;
  
//       /* Add details to the individual listing. */
//       const details = listing.appendChild(document.createElement('div'));
//       details.innerHTML = `${store.properties.city}`;
//       if (store.properties.phone) {
//         details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
//       }
//       if (store.properties.distance) {
//         const roundedDistance = Math.round(store.properties.distance * 100) / 100;
//         details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//       }
//     }
//   }
// map.on('load', () => {
//     /* Add the data to your map as a layer */
//     map.addLayer({
//       id: 'locations',
//       type: 'circle',
//       /* Add a GeoJSON source containing place coordinates and information. */
//       source: {
//         type: 'geojson',
//         data: stores
//       }
//     });
//   });
// const stores = {{ sweetgreenLocations }};
// stores.features.forEach(function (store, i) {
//     store.properties.id = i;
//   });
//   function flyToStore(currentFeature) {
//     map.flyTo({
//       center: currentFeature.geometry.coordinates,
//       zoom: 15
//     });
//   }
  
//   function createPopUp(currentFeature) {
//     const popUps = document.getElementsByClassName('mapboxgl-popup');
//     /** Check if there is already a popup on the map and if so, remove it */
//     if (popUps[0]) popUps[0].remove();
  
//     const popup = new mapboxgl.Popup({ closeOnClick: false })
//       .setLngLat(currentFeature.geometry.coordinates)
//       .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
//       .addTo(map);
//   }
//   link.addEventListener('click', function () {
//     for (const feature of stores.features) {
//       if (this.id === `link-${feature.properties.id}`) {
//         flyToStore(feature);
//         createPopUp(feature);
//       }
//     }
//     const activeItem = document.getElementsByClassName('active');
//     if (activeItem[0]) {
//       activeItem[0].classList.remove('active');
//     }
//     this.parentNode.classList.add('active');
//   });
//   map.on('click', (event) => {
//     /* Determine if a feature in the "locations" layer exists at that point. */
//     const features = map.queryRenderedFeatures(event.point, {
//       layers: ['locations']
//     });
  
//     /* If it does not exist, return */
//     if (!features.length) return;
  
//     const clickedPoint = features[0];
  
//     /* Fly to the point */
//     flyToStore(clickedPoint);
  
//     /* Close all other popups and display popup for clicked store */
//     createPopUp(clickedPoint);
  
//     /* Highlight listing in sidebar (and remove highlight for all other listings) */
//     const activeItem = document.getElementsByClassName('active');
//     if (activeItem[0]) {
//       activeItem[0].classList.remove('active');
//     }
//     const listing = document.getElementById(
//       `listing-${clickedPoint.properties.id}`
//     );
//     listing.classList.add('active');
//   });
//   map.addSource('places', {
//     type: 'geojson',
//     data: stores
//   });
//   .marker {
//     border: none;
//     cursor: pointer;
//     height: 56px;
//     width: 56px;
//     background-image: url('marker.png');
//   }
//   function addMarkers() {
//     /* For each feature in the GeoJSON object above: */
//     for (const marker of stores.features) {
//       /* Create a div element for the marker. */
//       const el = document.createElement('div');
//       /* Assign a unique `id` to the marker. */
//       el.id = `marker-${marker.properties.id}`;
//       /* Assign the `marker` class to each marker for styling. */
//       el.className = 'marker';
  
//       /**
//        * Create a marker using the div element
//        * defined above and add it to the map.
//        **/
//       new mapboxgl.Marker(el, { offset: [0, -23] })
//         .setLngLat(marker.geometry.coordinates)
//         .addTo(map);
//     }
//   }
//   el.addEventListener('click', (e) => {
//     /* Fly to the point */
//     flyToStore(marker);
//     /* Close all other popups and display popup for clicked store */
//     createPopUp(marker);
//     /* Highlight listing in sidebar */
//     const activeItem = document.getElementsByClassName('active');
//     e.stopPropagation();
//     if (activeItem[0]) {
//       activeItem[0].classList.remove('active');
//     }
//     const listing = document.getElementById(`listing-${marker.properties.id}`);
//     listing.classList.add('active');
//   });
//   addMarkers();