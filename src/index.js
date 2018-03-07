import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './styles/index.css';

// Setup some initial data...
store.update(t =>
  t.addRecord({
    type: 'planet',
    attributes: {
      color: {
        r: 252,
        g: 212,
        b: 64,
        a: 1
      },
      size: 'medium'
    }
  })
);

window.orbitStore = store;

let planets = store.cache.query(q => q.findRecords('planet'));
console.log(JSON.stringify(planets));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
