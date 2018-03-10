import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import store from '../../store';
import './styles.module.css';

const displayName = 'SatelliteSettings';
const propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number
  }),
  orbit: PropTypes.number,
  size: PropTypes.oneOf([1, 2, 3]),
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

const updateColor = (color, e) => {
  e.stopPropagation();
  const satellite = store.cache.query(q => q.findRecords('satellite'))[0];
  satellite.attributes.color = color.rgb;
  store.update(t => t.addRecord(satellite));
};

const updateSize = orbit => e => {
  e.stopPropagation();
  const satellite = store.cache.query(q => q.findRecords('satellite'))[0];
  satellite.attributes.size = Number.parseInt(e.target.value, 10);
  store.update(t => t.addRecord(satellite));

  // Remove and re-add the orbit class to restart the animation
  const orbits = document.getElementsByClassName(`orbit-${orbit}`);
  Array.from(orbits).forEach(orbitElem => {
    // take off the class
    orbitElem.classList.remove(`orbit-${orbit}`);

    // without this reflow is not triggered and restarting the animation does not work.
    void orbitElem.offsetWidth;

    // put the class back on
    orbitElem.classList.add(`orbit-${orbit}`);
  });
};

const SatelliteSettings = ({
  color,
  orbit = 1,
  size = 1,
  visible = false,
  onClose
}) => (
  <div className="settings-dialog" style={{ display: visible && 'block' }}>
    <div className="dialog-close" onClick={onClose} />
    <div className="settings-title">Satellite Settings</div>
    <div className="setting">
      <label htmlFor="satellite-size">Size:</label>
      <input
        type="range"
        min="1"
        max="3"
        value={size}
        step="1"
        id="satellite-size"
        onChange={updateSize(orbit)}
      />
    </div>
    <ChromePicker color={color} onChange={updateColor} />
  </div>
);

SatelliteSettings.displayName = displayName;
SatelliteSettings.propTypes = propTypes;

export default SatelliteSettings;
