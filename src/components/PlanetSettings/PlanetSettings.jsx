import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import store from '../../store';
import './styles.module.css';

const displayName = 'PlanetSettings';
const propTypes = {
  planet: PropTypes.shape({
    attributes: PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.shape({
        r: PropTypes.number,
        g: PropTypes.number,
        b: PropTypes.number,
        a: PropTypes.number
      }),
      size: PropTypes.oneOf([1, 2, 3])
    })
  }),
  position: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }),
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

const updateColor = (color, e) => {
  e.stopPropagation();
  const planet = store.cache.query(q => q.findRecords('planet'))[0];
  planet.attributes.color = color.rgb;
  store.update(t => t.addRecord(planet));
};

const updateSize = e => {
  e.stopPropagation();
  const planet = store.cache.query(q => q.findRecords('planet'))[0];
  planet.attributes.size = Number.parseInt(e.target.value, 10);
  store.update(t => t.addRecord(planet));
};

const updateName = e => {
  e.stopPropagation();
  const planet = store.cache.query(q => q.findRecords('planet'))[0];
  planet.attributes.label = e.target.value;
  store.update(t => t.addRecord(planet));
};

const PlanetSettings = ({
  planet = { attributes: {} },
  position = {},
  visible = false,
  onClose
}) => (
  <div
    className="settings-dialog"
    style={{ display: visible && 'block', top: position.y, left: position.x }}
  >
    <div className="dialog-close" onClick={onClose} />
    <div className="settings-title">Planet Settings</div>
    <div className="setting">
      <label htmlFor="planet-name">Name:</label>
      <input
        type="text"
        value={planet.attributes.label}
        id="planet-name"
        onChange={updateName}
      />
    </div>
    <div className="setting">
      <label htmlFor="planet-size">Size:</label>
      <input
        type="range"
        min="1"
        max="3"
        value={planet.attributes.size || 2}
        step="1"
        id="planet-size"
        onChange={updateSize}
      />
    </div>
    <ChromePicker color={planet.attributes.color} onChange={updateColor} />
  </div>
);

PlanetSettings.displayName = displayName;
PlanetSettings.propTypes = propTypes;

export default PlanetSettings;
