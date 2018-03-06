import React from 'react';
import Satellite from './Satellite';

describe('Satellite component', () => {
  it('renders correctly with default props', () => {
    snapshot(<Satellite />);
  });

  it('renders correctly with alternate props', () => {
    snapshot(<Satellite color="yellow" size="large" />);
  });
});
