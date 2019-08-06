import React from "react";
import { geolocated } from "react-geolocated";
import { getDistance } from 'geolib';

function App(props) {
  console.log(props);
  const { coords } = props.coords ? props : { coords: {} };
  const { isGeolocationAvailable, isGeolocationEnabled, positionError } = props;

  const centerIslandCoords = {
     longitude: 12.55136489868164,
     latitude: 55.6507156501139
  };

  const myCoords = coords.longitude ? {latitude : coords.latitude, longitude : coords.longitude} : {latitude : 0, longitude : 0};

  const distanceFromIsland = getDistance(myCoords, centerIslandCoords);
  console.log(myCoords, distanceFromIsland)
  console.log('hey', getDistance(myCoords, centerIslandCoords))

  return (
    <div>
      <h4>Updated version!</h4>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
      <p>Geo available: {isGeolocationAvailable.toString()}</p>
      <p>isGeolocationEnabled : {isGeolocationEnabled.toString()}</p>
      <p>positionError : {String(positionError)}</p>
      <p>You are currently {distanceFromIsland} mts from the center of the island </p>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000,
  watchPosition: true,
})(App);
