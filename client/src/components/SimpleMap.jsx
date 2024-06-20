import React, { useEffect } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Autocomplete from "react-google-autocomplete";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const center = { lat: 10.99835602, lng: 77.01502627 };
  const zoom = 11;

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }

    initMap();
  }, []); // Run initMap only once on component mount

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY" // Replace with your actual Google Maps API key
      >
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={zoom}
        >
          <Autocomplete
            apiKey="AIzaSyA33-COv0qHOuISWzrCxYIg_f-N7XtQOyk"
            onPlaceSelected={(place) => {
              const latitude = place.geometry.location.lat();
              const longitude = place.geometry.location.lng();
              // Handle latitude and longitude values as needed (example: setValue("location", { latitude, longitude });)
            }}
            options={{
              types: ["address"],
              componentRestrictions: { country: "il" }
            }}
            defaultValue={""}
            placeholder="Enter location"
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}