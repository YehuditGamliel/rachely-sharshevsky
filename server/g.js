// import express from 'express';
// import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';
// import geocoder from 'geocoder';
// const { GeocodingService } = require('@mapbox/mapbox-sdk/services/geocoding');

// // Mapbox API token
// const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

// // Initialize the geocoding service with the API token
// const geocodingService = new GeocodingService({ accessToken: 'sk.eyJ1IjoicmFjaGVseSIsImEiOiJjbHhzMWMwbXMwOHduMmlwZXA4dGttdWgyIn0.2TGVlSPJW1uuPV8hZI7akA' });

// const g = express();
// g.use(express.json());

// geocoder.geocode("1600 Pennsylvania Avenue NW, Washington, D.C.", function(err, data) {
//   if (err) {
//     console.error("Error:", err);
//   } else {
//     if (data.results && data.results.length > 0) {
//       const location = data.results[0].geometry.location;
//       console.log("Latitude:", location.lat);
//       console.log("Longitude:", location.lng);
//     } else {
//       console.log("Error: No results found for the address '1600 Pennsylvania Avenue NW, Washington, D.C.'");
//     }
//   }
// });

// const PORT = 4000; // Choose a port that is not in use

// g.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });