import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import { getDistance, getPreciseDistance, isPointInPolygon } from "geolib";

class App extends Component {
  render() {
    console.log(this.props)
    const { coords } = this.props.coords ? this.props : { coords: {} };
    const {
      isGeolocationAvailable,
      isGeolocationEnabled,
      positionError
    } = this.props;

    const CornerIslandCoords = {
      longitude: 12.546826601028442,
      latitude: 55.649577556747985
    };

    const overTheIslandCoords = [[12.546858787536621, 55.64933540495564],
      [12.552652359008789, 55.647446569583096],
      [12.556257247924805, 55.650013426200665],
      [12.550764083862305, 55.65212006016091],
      [12.547845840454102, 55.6507156501139],
      [12.54711627960205, 55.649432265852276],
      [12.546858787536621, 55.64933540495564]];



    const overTheIslandPoligon = overTheIslandCoords.map(([longitude, latitude]) => ({longitude, latitude}) );

    console.log(overTheIslandPoligon)

    const myCoords = coords.longitude
      ? { latitude: coords.latitude, longitude: coords.longitude }
      : { latitude: 0, longitude: 0 };

    const distanceFromIsland = getDistance(myCoords, CornerIslandCoords);
    console.log(myCoords, distanceFromIsland);

    const preciseDistanceFromIsland = getPreciseDistance(
      myCoords,
      CornerIslandCoords
    );

    const isInTheOtherSide = isPointInPolygon(myCoords, overTheIslandPoligon)

    return (
      <div>
        <h4>Updated version!</h4>
        <p>Latitude: {coords.latitude}</p>
        <p>Longitude: {coords.longitude}</p>
        <p>Geo available: {isGeolocationAvailable.toString()}</p>
        <p>isGeolocationEnabled : {isGeolocationEnabled.toString()}</p>
        <p>positionError : {String(positionError)}</p>
        <p>
          You are currently {distanceFromIsland} mts from the corner of the
          island{" "}
        </p>
        <p>
          You are currently PRECISALY {preciseDistanceFromIsland} mts from the
          corner of the island{" "}
          <p>Accuaracy : {coords.accuracy}</p>
          Is on the other side of the bridge: {String(isInTheOtherSide)}
        </p>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(App);
