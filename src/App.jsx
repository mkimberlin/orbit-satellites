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
    selectedOrbit: 1,
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

  openSatelliteSettings = selectedOrbit => e => {
    if (!this.closeSettings(e)) {
      e.stopPropagation();
      this.setSettingsPosition(e);

      this.setState(state => ({
        ...state,
        selectedOrbit,
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
    const {
      selectedOrbit,
      showPlanetSettings,
      showSatelliteSettings,
      settingsX,
      settingsY
    } = this.state;

    const satellite = satellites.find(
      satellite => satellite.attributes.orbit === selectedOrbit
    );

    return (
      <div>
        <div className="system-container" onClick={this.openPlanetSettings}>
          <p className="instructions">
            Click a planet or satellite to change its appearance, or add more
            satellites.
          </p>

          <div className="system">
            <Planet {...planet.attributes} onClick={this.openPlanetSettings} />

            {satellites.map(satellite => {
              const { orbit } = satellite.attributes;

              return (
                <Orbit key={`orbit-${orbit}`} position={orbit}>
                  <Satellite
                    {...satellite.attributes}
                    onClick={this.openSatelliteSettings(orbit)}
                  />
                </Orbit>
              );
            })}
          </div>
        </div>

        <SatelliteSettings
          satellite={satellite}
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
