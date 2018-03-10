import React from 'react';
import PlanetSettings from './PlanetSettings';

describe('PlanetSettings component', () => {
  it('renders correctly with default props', () => {
    snapshot(<PlanetSettings />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(
      <PlanetSettings
        color={{ r: 100, g: 50, b: 150, a: 0.7 }}
        size={3}
        visible
        onClose={jest.fn()}
      />
    );
  });
});
