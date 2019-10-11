import 'react-native';
import React from 'react';
import TextInput from '../../../../src/global/shards/text-input';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders', () => {
  const tree = renderer.create(
    <TextInput />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders when given title and placeholder props', () => {
  const props = {
    text: 'Placehoder',
    title: 'Text input test'
  }

  const tree = renderer.create(
    <TextInput {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders when given onChangeText props', () => {
  const props = {
    interactiveFunction: () => true
  }

  const tree = renderer.create(
    <TextInput {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('behaves correctly when an input is given', () => {
  let string = undefined;
  const props = {
    interactiveFunction: ({text}) => string = text
  }

  const tree = renderer.create(
    <TextInput {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  tree.children[1].children[0].props.onChangeText('Testing');
  expect(string).toEqual('Testing');
})
