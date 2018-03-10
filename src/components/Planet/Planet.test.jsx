import React from 'react';
import Planet from './Planet';

describe('Planet component', () => {
  it('renders correctly with default props', () => {
    snapshot(<Planet />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(
      <Planet
        label="Saturn"
        color={{ r: 255, g: 205, b: 155, a: 0.5 }}
        size={3}
        onClick={jest.fn()}
      />
    );
  });
});
