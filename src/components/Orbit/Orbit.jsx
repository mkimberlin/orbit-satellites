import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';

const displayName = 'Orbit';
const propTypes = {
  position: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick: PropTypes.func
};

const Orbit = ({ children, position = 1, onClick }) => (
  <div className={cx('orbit', `orbit-${position}`)} onClick={onClick}>
    {children}
  </div>
);

Orbit.displayName = displayName;
Orbit.propTypes = propTypes;

export default Orbit;
