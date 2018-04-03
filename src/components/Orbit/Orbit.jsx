import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';

const displayName = 'Orbit';
const propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const Orbit = ({ id, children, position = 1 }) => (
  <div id={`orbit-${id}`} className={cx('orbit', `orbit-${position}`)}>
    {children}
  </div>
);

Orbit.displayName = displayName;
Orbit.propTypes = propTypes;

export default Orbit;
