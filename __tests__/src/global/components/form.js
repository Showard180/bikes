import 'react-native';
import React from 'react';
import Form from '../../../../src/global/components/form';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders', () => {
  const props = {
    shards: []
  }

  const tree = renderer.create(
    <Form {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders an input when one given in props', () => {
  const props = {
    shards: [
      {
        type: 'text',
        'function': 'onChange',
        text: 'This is a test',
        title: 'Write here for a test'
      }
    ],
    functions: {
      onChange: () => null
    }
  }

  const tree = renderer.create(
    <Form {...props} />
  );
  expect(tree).toMatchSnapshot();
});

test('renders an error when given one in props', () => {
  const props = {
    shards: [],
    err: 'This is a test error'
  };

  const tree = renderer.create(
    <Form {...props} />
  );
  expect(tree).toMatchSnapshot();
})
