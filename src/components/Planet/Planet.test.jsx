import React from 'react';
import Planet from './Planet';

describe('Planet component', () => {
  it('renders correctly with default props', () => {
    snapshot(<Planet />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(<Planet color="yellow" size="large" />);
  });
});
