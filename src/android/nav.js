import React, {Component} from 'react';
import {Text, Navigator, BackAndroid} from 'react-native';

import {
  nav
} from '../json';
import pages from '../app/pages';

export default class Nav extends Component {
  renderScene({title}, navigator) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if(title!=='Login') {
        navigator.pop();
        return true;
      }
      return false;
    })
    const options = nav[title];
    const App = pages[options.component];
    return <App nav={navigator} {...options}/>
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  render() {
    return (
      <Navigator
        initialRoute={{title: 'Login'}}
        renderScene={(route, nav) => this.renderScene(route, nav)}
      />
    );
  }
}
