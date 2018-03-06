import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';

const displayName = 'Satellite';
const propTypes = {
  color: PropTypes.string,
  orbit: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

const sizes = { small: 1, medium: 2, large: 3 };

const Satellite = ({ color, orbit = 1, size = 'medium' }) => (
  <div className={cx('satellite', `satellite-${orbit}-${sizes[size]}`)} />
);

Satellite.displayName = displayName;
Satellite.propTypes = propTypes;

export default Satellite;
