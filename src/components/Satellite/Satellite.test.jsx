import React from 'react';
import Satellite from './Satellite';

describe('Satellite component', () => {
  it('renders correctly with default props', () => {
    snapshot(<Satellite />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(
      <Satellite
        color={{ r: 255, g: 205, b: 155, a: 0.5 }}
        orbit={2}
        size={3}
      />
    );
  });
});
