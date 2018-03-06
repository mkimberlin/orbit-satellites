// Make Enzyme functions available in all test files without importing
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

global.snapshot = component =>
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
global.shallowSnapshot = component =>
  expect(shallowRenderer.createRenderer().render(component)).toMatchSnapshot();
