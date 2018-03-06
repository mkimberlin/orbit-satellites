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
          {[1, 2, 3, 4, 5, 6, 7, 8].map(position => (
            <Orbit position={position}>
              <Satellite orbit={position} />
            </Orbit>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
