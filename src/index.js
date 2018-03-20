import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './styles/index.css';

// Setup some initial data...
store.update(t => [
  t.addRecord({
    type: 'planet',
    attributes: {
      label: 'Planet'
    }
  }),
  t.addRecord({
    type: 'satellite',
    attributes: {
      label: '1',
      orbit: 1
    }
  })
]);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
