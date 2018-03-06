import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

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

const SatelliteSettings = ({
  color,
  orbit,
  size = 'medium',
  planetSize = 'medium'
}) => (
  <div className="satellite-settings">
    <label htmlFor="satellite-size">Size:</label>
    <input type="range" min="0.5" max="5" value="1.5" step="0.5" id="orbit" />
    <label htmlFor="orbit">Orbit:</label>
    <input type="range" min="1" max="20" value="50" id="orbit" />
    <ChromePicker color={color} />
  </div>
);

SatelliteSettings.displayName = displayName;
SatelliteSettings.propTypes = propTypes;

export default SatelliteSettings;
