import React from 'react';
import SatelliteSettings from './SatelliteSettings';

describe('SatelliteSettings component', () => {
  it('renders correctly with default props', () => {
    snapshot(<SatelliteSettings />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(<SatelliteSettings color={{ r: 100, g: 50, b: 150, a: 0.7 }} />);
  });
});
