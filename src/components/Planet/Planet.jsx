import React from 'react';
import PropTypes from 'prop-types';
import './styles.module.css';

const displayName = 'Planet';
const propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

const Planet = ({ color, size = 'medium' }) => <div className="planet" />;

Planet.displayName = displayName;
Planet.propTypes = propTypes;

export default Planet;
