import React, {Component} from 'react';
import {Text} from 'react-native';

import Container from '../global/containers/container';

export default class App extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <Container>
        <Text>This is the {this.props.device} app</Text>
      </Container>
    );
  }
}
