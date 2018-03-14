import React, { Component } from 'react';
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

class Planet extends Component {
  state = {
    addSatelliteVisible: false
  };

  showAddSatellite = () => {
    this.setState(state => ({
      ...state,
      addSatelliteVisible: true
    }));
  };

  hideAddSatellite = () => {
    this.setState(state => ({
      ...state,
      addSatelliteVisible: false
    }));
  };

  render() {
    const { label, color, size = 2, onClick } = this.props;
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
        onMouseOver={this.showAddSatellite}
        onMouseOut={this.hideAddSatellite}
        style={styles}
      >
        {label}
      </div>
    );
  }
}

Planet.displayName = displayName;
Planet.propTypes = propTypes;

export default Planet;
