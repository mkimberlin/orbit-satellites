import React, { Component } from 'react';
import Orbit from './components/Orbit/Orbit';
import Planet from './components/Planet/Planet';
import Satellite from './components/Satellite/Satellite';
import SatelliteSettings from './components/SatelliteSettings/SatelliteSettings';
import { DataProvider, withData } from 'react-orbitjs';
import store from './store';

let planets = store.cache.query(q => q.findRecords('planet'));
console.log(JSON.stringify(planets));

const System = props => (
  <div className="system-container">
    <div className="system">
      <Planet color={props.planets[0] && props.planets[0].attributes.color} />
      {[1, 2, 3, 4, 5, 6, 7, 8].map(position => (
        <Orbit position={position}>
          <Satellite orbit={position} />
        </Orbit>
      ))}
    </div>
    <div className="settings">
      <SatelliteSettings
        color={props.planets[0] && props.planets[0].attributes.color}
      />
    </div>
  </div>
);

const ConnectedSystem = withData(ownProps => ({
  planets: q => q.findRecords('planet'),
  orbits: q => q.findRecords('orbit'),
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
