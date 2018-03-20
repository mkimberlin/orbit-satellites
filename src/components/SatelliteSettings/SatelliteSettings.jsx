import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withData } from 'react-orbitjs';
import { ChromePicker } from 'react-color';
import store from '../../store';
import './styles.module.css';

const displayName = 'SatelliteSettings';
const propTypes = {
  satellites: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.shape({
        r: PropTypes.number,
        g: PropTypes.number,
        b: PropTypes.number,
        a: PropTypes.number
      }),
      orbit: PropTypes.number.isRequired,
      size: PropTypes.oneOf([1, 2, 3])
    })
  ),
  position: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }),
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

/**
 * Component for altering the attributes of the displayed satellites.
 */
class SatelliteSettings extends Component {
  state = {
    selectedOrbit: 0
  };

  /**
   * Alters the satellite currently being managed by this component.
   * @param e  the event triggering the change
   */
  changeSelectedOrbit = e => {
    const value = e.target.value;
    this.setState(state => ({ ...state, selectedOrbit: value }));
  };

  /**
   * Obtains the currently selected satellite from the list supplied via props.
   * @returns {Object}  the satellite instance currently being managed
   */
  getSelectedSatellite = () => {
    const { selectedOrbit } = this.state;
    const { satellites } = this.props;

    return satellites[selectedOrbit];
  };

  /**
   *
   * @param e  the event triggering the change
   */
  updateName = e => {
    e.stopPropagation();
    const satellite = this.getSelectedSatellite();
    satellite.attributes.label = e.target.value;
    store.update(t => t.addRecord(satellite));
  };

  /**
   *
   * @param {Object} color  the newly selected color
   * @param {Object} e      the event triggering the change
   */
  updateColor = (color, e) => {
    e.stopPropagation();
    const satellite = this.getSelectedSatellite();
    satellite.attributes.color = color.rgb;
    store.update(t => t.addRecord(satellite));
  };

  /**
   *
   * @param e  the event triggering the change
   */
  updateSize = e => {
    e.stopPropagation();
    const satellite = this.getSelectedSatellite();
    const orbit = satellite.attributes.orbit;
    satellite.attributes.size = Number.parseInt(e.target.value, 10);
    store.update(t => t.addRecord(satellite));

    // Remove and re-add the orbit class to restart the animation
    const orbits = document.getElementsByClassName(`orbit-${orbit}`);
    Array.from(orbits).forEach(orbitElem => {
      // take off the class
      orbitElem.classList.remove(`orbit-${orbit}`);

      // without this reflow is not triggered and restarting the animation does not work.
      void orbitElem.offsetWidth;

      // put the class back on
      orbitElem.classList.add(`orbit-${orbit}`);
    });
  };

  render() {
    const {
      satellites = [],
      position = {},
      visible = false,
      onClose
    } = this.props;
    const { selectedOrbit } = this.state;
    const selectedSatellite = satellites[selectedOrbit] ||
      satellites[0] || { attributes: {} };

    return (
      <div
        className="settings-dialog"
        style={{
          display: visible && 'block',
          top: position.y,
          left: position.x
        }}
      >
        <div className="dialog-close" onClick={onClose} />
        <div className="settings-title">Satellite Settings</div>
        <div className="setting">
          <label htmlFor="satellite-orbit">Orbit:</label>
          <select id="satellite-orbit" onChange={this.changeSelectedOrbit}>
            {satellites.map(
              satellite =>
                satellite.attributes.orbit ===
                selectedSatellite.attributes.orbit ? (
                  <option value={satellite.attributes.orbit - 1} selected>
                    {satellite.attributes.orbit}
                  </option>
                ) : (
                  <option value={satellite.attributes.orbit - 1}>
                    {satellite.attributes.orbit}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="setting">
          <label htmlFor="satellite-name">Name:</label>
          <input
            type="text"
            value={selectedSatellite.attributes.label || ''}
            id="satellite-name"
            onChange={this.updateName}
          />
        </div>
        <div className="setting">
          <label htmlFor="satellite-size">Size:</label>
          <input
            type="range"
            min="1"
            max="3"
            value={selectedSatellite.attributes.size || 1}
            step="1"
            id="satellite-size"
            onChange={this.updateSize}
          />
        </div>
        <ChromePicker
          color={
            selectedSatellite.attributes.color || { r: 201, g: 201, b: 201 }
          }
          onChange={this.updateColor}
        />
      </div>
    );
  }
}

SatelliteSettings.displayName = displayName;
SatelliteSettings.propTypes = propTypes;

export default withData(ownProps => ({
  satellites: q => q.findRecords('satellite').sort('orbit')
}))(SatelliteSettings);
