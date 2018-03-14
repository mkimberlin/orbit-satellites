import React, { Component } from 'react';
import Orbit from './components/Orbit/Orbit';
import Planet from './components/Planet/Planet';
import Satellite from './components/Satellite/Satellite';
import SatelliteSettings from './components/SatelliteSettings/SatelliteSettings';
import { DataProvider, withData } from 'react-orbitjs';
import store from './store';
import PlanetSettings from './components/PlanetSettings/PlanetSettings';

class System extends Component {
  state = {
    showSatelliteSettings: false,
    showPlanetSettings: false,
    settingsX: '50%',
    settingsY: '50%'
  };

  openSettings = e => {
    if (this.state.showPlanetSettings || this.state.showSatelliteSettings)
      return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    this.setState(state => ({
      ...state,
      settingsX: clientX,
      settingsY: clientY
    }));

    if (!this.isOverPlanet(clientX, clientY)) {
      this.setState(state => ({
        ...state,
        showSatelliteSettings: true
      }));
    } else {
      this.setState(state => ({
        ...state,
        showPlanetSettings: true
      }));
    }
  };

  closeSettings = e => {
    e.stopPropagation();
    this.setState({
      ...this.state,
      showPlanetSettings: false,
      showSatelliteSettings: false
    });
  };

  isOverPlanet = (x, y) => {
    const divRect = document.getElementById('planet').getBoundingClientRect();
    return (
      x >= divRect.left &&
      x <= divRect.right &&
      y >= divRect.top &&
      y <= divRect.bottom
    );
  };

  render() {
    const { planets, satellites } = this.props;
    return (
      <div>
        <div className="system-container" onClick={this.openSettings}>
          <div className="system">
            <Planet
              label={planets[0] && planets[0].attributes.label}
              color={planets[0] && planets[0].attributes.color}
              size={planets[0] && planets[0].attributes.size}
            />
            {satellites.map(satellite => (
              <Orbit
                key={`orbit-${satellite.attributes.orbit}`}
                position={satellite.attributes.orbit}
              >
                <Satellite
                  label={satellite.attributes.label}
                  orbit={satellite.attributes.orbit}
                  color={satellite.attributes.color}
                  size={satellite.attributes.size}
                />
              </Orbit>
            ))}
          </div>
        </div>
        <SatelliteSettings
          visible={this.state.showSatelliteSettings}
          label={satellites[0] && satellites[0].attributes.label}
          color={satellites[0] && satellites[0].attributes.color}
          size={satellites[0] && satellites[0].attributes.size}
          position={{ x: this.state.settingsX, y: this.state.settingsY }}
          onClose={this.closeSettings}
        />
        <PlanetSettings
          visible={this.state.showPlanetSettings}
          label={planets[0] && planets[0].attributes.label}
          color={planets[0] && planets[0].attributes.color}
          size={planets[0] && planets[0].attributes.size}
          position={{ x: this.state.settingsX, y: this.state.settingsY }}
          onClose={this.closeSettings}
        />
      </div>
    );
  }
}

const ConnectedSystem = withData(ownProps => ({
  planets: q => q.findRecords('planet'),
  satellites: q => q.findRecords('satellite')
}))(System);

class App extends Component {
  render() {
    return (
      <DataProvider dataStore={store}>
        <ConnectedSystem />
      </DataProvider>
    );
  }
}

export default App;
