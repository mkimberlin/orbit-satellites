import React from 'react';
import SatelliteSettings from './SatelliteSettings';

describe('SatelliteSettings component', () => {
  it('renders correctly with default props', () => {
    snapshot(<SatelliteSettings onClose={jest.fn()} />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(
      <SatelliteSettings
        satellite={{
          attributes: {
            color: { r: 100, g: 50, b: 150, a: 0.7 },
            orbit: 2,
            size: 3,
            label: 'Moon'
          }
        }}
        visible
        onClose={jest.fn()}
      />
    );
  });
});
