import React, { Component } from 'react';
import Orbit from './components/Orbit/Orbit';
import Planet from './components/Planet/Planet';
import Satellite from './components/Satellite/Satellite';

class App extends Component {
  render() {
    return (
      <div className="system-container">
        <div className="system">
          <Planet />
          <Orbit>
            <Satellite />
          </Orbit>
          <Orbit position={2}>
            <Satellite orbit={2} />
          </Orbit>
          <Orbit position={3}>
            <Satellite orbit={3} />
          </Orbit>
          <Orbit position={4}>
            <Satellite orbit={4} />
          </Orbit>
          <Orbit position={5}>
            <Satellite orbit={5} />
          </Orbit>
        </div>
      </div>
    );
  }
}

export default App;
