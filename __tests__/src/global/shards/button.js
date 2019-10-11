import 'react-native';
import React from 'react';
import Button from '../../../../src/global/shards/button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders', () => {
  const props = {
    text: 'Title',
    interactiveFunction: () => true
  }
  const tree = renderer.create(
    <Button {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
