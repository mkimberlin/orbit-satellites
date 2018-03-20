import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.module.css';
import store from '../../store';

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

const MAX_SATELLITES = 10;

const onAddSatellite = e => {
  e.stopPropagation();
  const satellites = store.cache.query(q =>
    q.findRecords('satellite').sort('orbit')
  );

  if (satellites.length >= MAX_SATELLITES) return;

  const nextOrbit = satellites[satellites.length - 1].attributes.orbit + 1;

  store.update(t =>
    t.addRecord({
      type: 'satellite',
      attributes: {
        label: `${nextOrbit}`,
        orbit: nextOrbit
      }
    })
  );
};

const Planet = ({ label, color, size = 2, onClick }) => {
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
      id="planet"
      className={cx('planet', `planet-${size}`)}
      onClick={onClick}
      style={styles}
    >
      <p className="planet-label">{label}</p>
      <div className="add-button" onClick={onAddSatellite} />
    </div>
  );
};

Planet.displayName = displayName;
Planet.propTypes = propTypes;

export default Planet;
