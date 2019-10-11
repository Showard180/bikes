import 'react-native';
import React from 'react';
import Tile from '../../../../src/global/components/tile';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders', () => {
  const tree = renderer.create(
    <Tile />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders title and text when given in props', () => {
  const tree = renderer.create(
    <Tile title="Testing" text="Test"/>
  )
  expect(tree).toMatchSnapshot();
});

test('button when given', () => {
  const tree = renderer.create(
    <Tile button={{onPress: () => console.log('hello'), title: 'Hello'}}/>
  )
  expect(tree).toMatchSnapshot();
});
