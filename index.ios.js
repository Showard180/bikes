import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import App from './src/app/index';

const Bikes = () => (
  <App device="ios" />
)

AppRegistry.registerComponent('Bikes', () => Bikes);
