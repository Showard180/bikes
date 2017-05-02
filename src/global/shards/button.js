import React, {Component} from 'react';
import {Button} from 'react-native';

module.exports = props => (
  <Button
    onPress={props.interactiveFunction}
    title={props.text}
    color={props.color}
    accessibilityLabel={props.accessibility}
  />
)
