import React, {Component} from 'react';
import {NavigatorIOS as Navigator} from 'react-native';

import {nav} from '../json';
import pages from '../app/pages';


export default class IOSNav extends Component {
  renderScene({title}) {
    const options = nav[title];
    this.refs.nav.push({
      ...options,
      component: pages[options.component],
      passProps: {nav: {push: title => this.renderScene(title)}}
    });
  }

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={{
          title: "Login",
          passProps: {nav: {push: title => this.renderScene(title)}},
          component: pages.LoginForm,
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    )
  }
}
