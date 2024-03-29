import React, {Component} from 'react';
import {NavigatorIOS as Navigator} from 'react-native';

import {nav} from '../json';
import pages from '../app/pages';


export default class IOSNav extends Component {
  renderScene({title}, option = 'push') {
    const options = nav[title];
    this.refs.nav[option]({
      ...options,
      component: pages[options.component],
      passProps: {device: 'ios', nav: {push: title => this.renderScene(title), replace: this.replace.bind(this)}}
    });
  }

  replace({title}) {
    this.renderScene({title}, 'replace')
  }

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={{
          title: "Login",
          passProps: {nav: {push: title => this.renderScene(title)}, device: this.props.device},
          component: pages.LoginForm,
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    )
  }
}
