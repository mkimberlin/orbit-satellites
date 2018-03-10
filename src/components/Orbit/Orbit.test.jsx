import React from 'react';
import Orbit from './Orbit';

describe('Orbit component', () => {
  it('renders correctly with default props', () => {
    snapshot(<Orbit />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(
      <Orbit position={2} onClick={jest.fn()}>
        <div>Stuff</div>
      </Orbit>
    );
  });
});
