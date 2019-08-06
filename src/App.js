import React, {Component} from "react";
import { geolocated } from "react-geolocated";
import { getDistance, getPreciseDistance } from 'geolib';

class App extends Component {
 
  render(){
  const { coords } = this.props.coords ? this.props : { coords: {} };
  const { isGeolocationAvailable, isGeolocationEnabled, positionError } = this.props;

  const CornerIslandCoords = {
     longitude: 12.546826601028442,
     latitude: 55.649577556747985
  };

  const myCoords = coords.longitude ? {latitude : coords.latitude, longitude : coords.longitude} : {latitude : 0, longitude : 0};

  const distanceFromIsland = getDistance(myCoords, CornerIslandCoords);
  console.log(myCoords, distanceFromIsland)

  const preciseDistanceFromIsland = getPreciseDistance(myCoords, CornerIslandCoords)

  return (
    <div>
      <h4>Updated version!</h4>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
      <p>Geo available: {isGeolocationAvailable.toString()}</p>
      <p>isGeolocationEnabled : {isGeolocationEnabled.toString()}</p>
      <p>positionError : {String(positionError)}</p>
      <p>You are currently {distanceFromIsland} mts from the corner of the island </p>
      <p>You are currently PRECISALY {preciseDistanceFromIsland} mts from the corner of the island </p>
    </div>
  )
}
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000,
  watchPosition: true,
})(App);
