import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import store from '../../store';
import './styles.module.css';

const displayName = 'SatelliteSettings';
const propTypes = {
  satellite: PropTypes.shape({
    attributes: PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.shape({
        r: PropTypes.number,
        g: PropTypes.number,
        b: PropTypes.number,
        a: PropTypes.number
      }),
      orbit: PropTypes.number.isRequired,
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

const updateName = satellite => e => {
  e.stopPropagation();
  satellite.attributes.label = e.target.value;
  store.update(t => t.addRecord(satellite));
};

const updateColor = satellite => (color, e) => {
  e.stopPropagation();
  satellite.attributes.color = color.rgb;
  store.update(t => t.addRecord(satellite));
};

const updateSize = satellite => e => {
  e.stopPropagation();
  const orbit = satellite.attributes.orbit;
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
  satellite = { attributes: {} },
  position = {},
  visible = false,
  onClose
}) => {
  const { label, color, size } = satellite.attributes;

  return (
    <div
      className="settings-dialog"
      style={{
        display: visible && 'block',
        top: position.y,
        left: position.x
      }}
    >
      <div className="dialog-close" onClick={onClose} />
      <div className="settings-title">Satellite Settings</div>
      <div className="setting">
        <label htmlFor="satellite-name">Name:</label>
        <input
          type="text"
          value={label || ''}
          id="satellite-name"
          onChange={updateName(satellite)}
        />
      </div>
      <div className="setting">
        <label htmlFor="satellite-size">Size:</label>
        <input
          type="range"
          min="1"
          max="3"
          value={size || 1}
          step="1"
          id="satellite-size"
          onChange={updateSize(satellite)}
        />
      </div>
      <ChromePicker
        color={color || { r: 201, g: 201, b: 201 }}
        onChange={updateColor(satellite)}
      />
    </div>
  );
};

SatelliteSettings.displayName = displayName;
SatelliteSettings.propTypes = propTypes;

export default SatelliteSettings;
