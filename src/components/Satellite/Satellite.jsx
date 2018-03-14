import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';

const displayName = 'Satellite';
const propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number
  }),
  label: PropTypes.string,
  orbit: PropTypes.number,
  size: PropTypes.oneOf([1, 2, 3])
};

const Satellite = ({ color, label, orbit = 1, size = 1 }) => {
  let foreground = '#FFFFFF';
  if (color && color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 186) {
    foreground = '#000000';
  }

  const styles = {
    backgroundColor: color
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : undefined,
    boxShadow: color
      ? `0 0 1rem rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : undefined,
    color: foreground
  };

  return (
    <div
      style={styles}
      className={cx('satellite', `satellite-${orbit}-${size}`)}
    >
      {label}
    </div>
  );
};

Satellite.displayName = displayName;
Satellite.propTypes = propTypes;

export default Satellite;
