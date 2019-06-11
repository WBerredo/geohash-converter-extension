import React from 'react';
import './App.css';
import 'foundation-sites/dist/css/foundation.min.css';
import * as geohash  from 'ngeohash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      hash: '',
    };

    this.latitudeChanged = this.latitudeChanged.bind(this);
    this.longitudeChanged = this.longitudeChanged.bind(this);
    this.hashChanged = this.hashChanged.bind(this);
  }

  latitudeChanged(event) {
    this.setState({
      latitude: event.target.value,
    });

    this.calculateHash();
  }

  longitudeChanged(event) {
    this.setState({
      longitude: event.target.value,
    });

    this.calculateHash();
  }

  hashChanged(event) {
    this.setState({
      hash: event.target.value,
    });

    this.calculateCoordinates();
  }

  calculateCoordinates() {
    const { hash } = this.state;

    if (hash) {
      const { latitude, longitude } = geohash.decode(hash);
      this.setState({ latitude, longitude });
    }
  }

  calculateHash() {
    const { latitude, longitude } = this.state;

    if (latitude && longitude) {
      const hash = geohash.encode(latitude, longitude);

      this.setState({ hash });
    }
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <form className="form">
          <h4> Geohash Converter</h4>

          <label>
            Latitude
            <input
              type="number"
              placeholder="Latitude"
              aria-describedby="Latitude" 
              value={state.latitude}
              onChange={this.latitudeChanged}
            />
          </label>

          <label>
            Longitude
            <input
              type="number"
              placeholder="Longitude"
              aria-describedby="Longitude" 
              value={state.longitude}
              onChange={this.longitudeChanged}
            />
          </label>

          <label>
            Geohash
            <input
              type="text"
              placeholder="Geohash"
              aria-describedby="Geohash"
              value={state.hash}
              onChange={this.hashChanged}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
