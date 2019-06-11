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
      iframeUrl: '',
    };

    this.latitudeChanged = this.latitudeChanged.bind(this);
    this.longitudeChanged = this.longitudeChanged.bind(this);
    this.hashChanged = this.hashChanged.bind(this);
    this.updateIframeUrl = this.updateIframeUrl.bind(this);
  }

  updateIframeUrl() {
    const baseUrl = 'http://m.osmtools.de/?lon=LONGITUDE&lat=LATITUDE&zoom=7&mlon=LONGITUDE&mlat=LATITUDE&icon=4&iframe=1';
    const { latitude, longitude } = this.state;

    const newUrl = baseUrl
      .replace(/LATITUDE/g, latitude)
      .replace(/LONGITUDE/g, longitude);

    this.setState({ iframeUrl: newUrl });
  }

  latitudeChanged(event) {
    this.setState({
      latitude: event.target.value,
    }, () => {
      this.calculateHash();
      this.updateIframeUrl();
    });
  }

  longitudeChanged(event) {
    this.setState({
      longitude: event.target.value,
    }, () => {
      this.calculateHash();
      this.updateIframeUrl();
    });
  }

  hashChanged(event) {
    this.setState({
      hash: event.target.value,
    }, () => {
      this.calculateCoordinates();
      this.updateIframeUrl();
    });
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

        <br/>
        <iframe
          width="350"
          height="250"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={state.iframeUrl}
          style={{ border: '1px solid black' }}
          title="map"
        />
        <br/>
      </div>
    );
  }
}

export default App;
