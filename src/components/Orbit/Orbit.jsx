import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';

const displayName = 'Orbit';
const propTypes = {
  position: PropTypes.number
};

const Orbit = ({ children, position = 1 }) => (
  <div className={cx('orbit', `orbit-${position}`)}>{children}</div>
);

Orbit.displayName = displayName;
Orbit.propTypes = propTypes;

export default Orbit;
