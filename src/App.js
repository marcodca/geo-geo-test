import React from "react";
import { geolocated } from "react-geolocated";

function App(props) {
  console.log(props);
  const { coords } = props.coords ? props : { coords: {} };
  const { isGeolocationAvailable, isGeolocationEnabled, positionError } = props;
  return (
    <div>
      <p>Altitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
      <p>Geo available: {isGeolocationAvailable.toString()}</p>
      <p>isGeolocationEnabled : {isGeolocationEnabled.toString()}</p>
      <p>positionError : {String(positionError)}</p>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);
