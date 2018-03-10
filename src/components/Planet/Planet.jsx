import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';

const displayName = 'Planet';
const propTypes = {
  label: PropTypes.string,
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number
  }),
  size: PropTypes.oneOf([1, 2, 3]),
  onClick: PropTypes.func
};

const Planet = ({ label, color, size = 2, onClick }) => {
  const styles = {
    backgroundColor: color
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : undefined,
    boxShadow: color
      ? `0 0 1rem rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : undefined
  };

  return (
    <div
      id="planet"
      className={cx('planet', `planet-${size}`)}
      onClick={onClick}
      style={styles}
    />
  );
};

Planet.displayName = displayName;
Planet.propTypes = propTypes;

export default Planet;
