import React from 'react';
import { geolocated } from "react-geolocated";

function App(props) {
  console.log(props)
  const {coords} = props.coords ? props : {coords: {}}
  return (
    <div>
      <p>Altitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
    </div>
  );
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);

