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
    if (this.state.showPlanetSettings || this.state.showSatelliteSettings) {
      this.closeSettings(e);
      return;
    }

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
    const { planet, satellites } = this.props;
    return (
      <div>
        <div className="system-container" onClick={this.openSettings}>
          <p className="instructions">
            Click the planet to change its settings or anywhere else to change
            satellite settings.
          </p>
          <div className="system">
            <Planet
              label={planet.attributes.label}
              color={planet.attributes.color}
              size={planet.attributes.size}
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
          position={{ x: this.state.settingsX, y: this.state.settingsY }}
          onClose={this.closeSettings}
        />
        <PlanetSettings
          planet={planet}
          visible={this.state.showPlanetSettings}
          position={{ x: this.state.settingsX, y: this.state.settingsY }}
          onClose={this.closeSettings}
        />
      </div>
    );
  }
}

const ConnectedSystem = withData(
  {
    planets: q => q.findRecords('planet'),
    satellites: q => q.findRecords('satellite')
  },
  (recordProps, ownProps) => ({
    planet: recordProps.planets[0] || { attributes: {} },
    satellites: recordProps.satellites
  })
)(System);

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
