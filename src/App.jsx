import React, { Component } from 'react';
import Planet from './components/Planet/Planet';
import Satellite from './components/Satellite/Satellite';
import SatelliteSettings from './components/SatelliteSettings/SatelliteSettings';
import { DataProvider, withData } from 'react-orbitjs';
import store from './store';
import PlanetSettings from './components/PlanetSettings/PlanetSettings';

class System extends Component {
  state = {
    selectedSatellite: undefined,
    showSatelliteSettings: false,
    showPlanetSettings: false,
    settingsX: '50%',
    settingsY: '50%'
  };

  setSettingsPosition = e => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    this.setState(state => ({
      ...state,
      settingsX: clientX,
      settingsY: clientY
    }));
  };

  openSatelliteSettings = (satelliteId, e) => {
    if (!this.closeSettings(e)) {
      e.stopPropagation();
      this.setSettingsPosition(e);

      this.setState(state => ({
        ...state,
        selectedSatellite: this.props.satellites.find(
          satellite => satellite.id === satelliteId
        ),
        showSatelliteSettings: true
      }));
    }
  };

  openPlanetSettings = e => {
    if (!this.closeSettings(e)) {
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (this.isOverPlanet(clientX, clientY)) {
        this.setSettingsPosition(e);

        this.setState(state => ({
          ...state,
          showPlanetSettings: true
        }));
      }
    }
  };

  closeSettings = e => {
    let closed = false;
    if (this.state.showPlanetSettings || this.state.showSatelliteSettings) {
      e.stopPropagation();
      this.setState({
        ...this.state,
        showPlanetSettings: false,
        showSatelliteSettings: false
      });
      closed = true;
    }
    return closed;
  };

  isOverPlanet = (x, y) => {
    const divRect = document
      .getElementById(this.props.planet.id)
      .getBoundingClientRect();
    return (
      x >= divRect.left &&
      x <= divRect.right &&
      y >= divRect.top &&
      y <= divRect.bottom
    );
  };

  render() {
    const { planet, satellites } = this.props;
    const {
      selectedSatellite,
      showPlanetSettings,
      showSatelliteSettings,
      settingsX,
      settingsY
    } = this.state;

    return (
      <div>
        <div className="system-container" onClick={this.openPlanetSettings}>
          <p className="instructions">
            Add additional satellites, or click a planet or satellite to change
            its appearance.
          </p>

          <div className="system">
            <Planet
              id={planet.id}
              {...planet.attributes}
              onClick={this.openPlanetSettings}
            />

            {satellites.map(satellite => (
              <Satellite
                id={satellite.id}
                onClick={this.openSatelliteSettings}
              />
            ))}
          </div>
        </div>

        <SatelliteSettings
          satellite={selectedSatellite}
          visible={showSatelliteSettings}
          position={{ x: settingsX, y: settingsY }}
          onClose={this.closeSettings}
        />

        <PlanetSettings
          planet={planet}
          visible={showPlanetSettings}
          position={{ x: settingsX, y: settingsY }}
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
  recordProps => ({
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
