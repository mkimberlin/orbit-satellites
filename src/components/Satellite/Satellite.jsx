import React from 'react';
import PropTypes from 'prop-types';
import { withData } from 'react-orbitjs';
import cx from 'classnames';
import './styles.module.css';
import Orbit from '../Orbit/Orbit';

const displayName = 'Satellite';
const propTypes = {
  id: PropTypes.string.isRequired,
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

const pauseAnimation = id => () => {
  document.getElementById(`orbit-${id}`).style['animation-play-state'] =
    'paused';
  document.getElementById(id).style['animation-play-state'] = 'paused';
};

const restartAnimation = id => () => {
  document.getElementById(`orbit-${id}`).style['animation-play-state'] = null;
  document.getElementById(id).style['animation-play-state'] = null;
};

export const Satellite = ({
  id,
  color,
  label,
  orbit = 1,
  size = 1,
  onClick
}) => {
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

  const onClickCallback = e => onClick(id, e);

  return (
    <Orbit id={id} key={`orbit-${orbit}`} position={orbit}>
      <div
        id={id}
        style={styles}
        className={cx('satellite', `satellite-${orbit}-${size}`)}
        onMouseOver={pauseAnimation(id)}
        onMouseLeave={restartAnimation(id)}
        onClick={onClickCallback}
      >
        <p className="satellite-label">{label}</p>
      </div>
    </Orbit>
  );
};

Satellite.displayName = displayName;
Satellite.propTypes = propTypes;

export default withData(
  ownProps => ({
    satellite: q => q.findRecord({ type: 'satellite', id: ownProps.id })
  }),
  (recordProps, ownProps) => ({
    id: recordProps.satellite.id,
    onClick: ownProps.onClick,
    ...recordProps.satellite.attributes
  })
)(Satellite);
