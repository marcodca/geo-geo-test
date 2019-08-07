import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import { getDistance, getPreciseDistance, isPointInPolygon } from "geolib";

const intialState = {
  oneChecked: false,
  twoChecked: false,
  threeChecked: false
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkpoints: intialState
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("checkpoints")) {
      localStorage.setItem(
        "checkpoints",
        JSON.stringify(this.state.checkpoints)
      );
    } else {
      const localCheckpoints = JSON.parse(localStorage.getItem("checkpoints"));

      this.setState(() => ({
        ...this.state,
        checkpoints: { ...localCheckpoints }
      }));
    }
  }

  componentDidUpdate() {
    if (
      JSON.stringify(this.state.checkpoints) !==
      JSON.stringify(localStorage.getItem("checkpoints"))
    ) {
      localStorage.setItem(
        "checkpoints",
        JSON.stringify(this.state.checkpoints)
      );
    }
  }

  render() {
    console.log(this.props);
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

    const overTheIslandCoords = [
      [12.546858787536621, 55.64933540495564],
      [12.552652359008789, 55.647446569583096],
      [12.556257247924805, 55.650013426200665],
      [12.550764083862305, 55.65212006016091],
      [12.547845840454102, 55.6507156501139],
      [12.54711627960205, 55.649432265852276],
      [12.546858787536621, 55.64933540495564]
    ];

    const makePoligon = coords => {
      return coords.map(([longitude, latitude]) => ({ longitude, latitude }));
    };

    const overTheIslandPoligon = makePoligon(overTheIslandCoords);

    const amagerFalledCoords = [
      [12.566900253295898, 55.64698645485987],
      [12.563724517822266, 55.64151309672179],
      [12.578144073486328, 55.64093181022273],
      [12.58380889892578, 55.64102869190496],
      [12.586126327514648, 55.64664741949936],
      [12.589130401611328, 55.654347641744195],
      [12.584066390991211, 55.6582213948113],
      [12.58157730102539, 55.65943186403787],
      [12.582263946533203, 55.66185269019934],
      [12.581233978271484, 55.66204634982437],
      [12.577714920043945, 55.660303378703865],
      [12.575998306274412, 55.661174873965955],
      [12.574796676635742, 55.66069071232698],
      [12.573165893554688, 55.65996445863948],
      [12.571020126342772, 55.6575435156944],
      [12.569732666015625, 55.65696246710842],
      [12.569046020507812, 55.65599403363318],
      [12.566986083984375, 55.652265341083876],
      [12.566471099853516, 55.649989211358346],
      [12.566900253295898, 55.64698645485987]
    ];

    const amagerFalledPoligon = makePoligon(amagerFalledCoords);

    //
    const smallBridgeCoords = {
      longitude: 12.551622390747069,
      latitude: 55.643002604002156
    };

    const myCoords = coords.longitude
      ? { latitude: coords.latitude, longitude: coords.longitude }
      : { latitude: 0, longitude: 0 };

    const distanceFromIsland = getDistance(myCoords, CornerIslandCoords);
    console.log(myCoords, distanceFromIsland);

    const preciseDistanceFromIsland = getPreciseDistance(
      myCoords,
      CornerIslandCoords
    );

    const isInTheOtherSide = isPointInPolygon(myCoords, overTheIslandPoligon);
    const isInAmagerFalled = isPointInPolygon(myCoords, amagerFalledPoligon);

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
          island
        </p>
        <p>
          You are currently PRECISALY {preciseDistanceFromIsland} mts from the
          corner of the island
        </p>
        <p>Accuaracy : {coords.accuracy}</p>
        <p>Is on the other side of the bridge: {String(isInTheOtherSide)}</p>
        <p>Is in amager falled : {String(isInAmagerFalled)}</p>

        <button onClick={() => {
          this.setState(()=>({...this.state, checkpoints : {...this.state.checkpoints, oneChecked : true}}))
        }}>Checkpoint one</button>
        {this.state.checkpoints.oneChecked && <button>Checkpoint two</button>}
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
