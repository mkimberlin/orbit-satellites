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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  planetSize: PropTypes.oneOf(['small', 'medium', 'large'])
};

const updateColor = color => {
  const planet = store.cache.query(q => q.findRecords('planet'))[0];
  planet.attributes.color = color.rgb;
  store.update(t => t.addRecord(planet));
};

const SatelliteSettings = ({
  color,
  orbit,
  size = 'medium',
  planetSize = 'medium'
}) => (
  <div className="satellite-settings">
    <div className="setting">
      <label htmlFor="satellite-size">Size:</label>
      <input type="range" min="1" max="3" value="2" step="2" id="orbit" />
    </div>
    <div className="setting">
      <label htmlFor="orbit">Orbit:</label>
      <input type="range" min="1" max="20" value="50" id="orbit" />
    </div>
    <ChromePicker color={color} onChange={updateColor} />
  </div>
);

SatelliteSettings.displayName = displayName;
SatelliteSettings.propTypes = propTypes;

export default SatelliteSettings;
