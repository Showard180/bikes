import React, {Component} from 'react';
import Navigation from './navigation';

export default class Nav extends Component {
  render() {
    const Navigator = Navigation[this.props.device]
    return <Navigator />
  }
}
