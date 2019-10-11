import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import {app} from '../../json';

export default class App extends Component {
  render() {
    const {
      pages
    } = app;

    const Pages = require('../pages');

    return (
      <ScrollableTabView style={{marginTop: 30}} tabBarActiveTextColor="#093b6f" tabBarUnderlineStyle={{backgroundColor: "#093b6f"}}>
        {
          pages.map((page, i) => {
            const Main = Pages[page.page];
            return (
              <Main
                tabLabel={page.title}
                {...page}
                nav={this.props.nav}
                device={this.props.device}
                key={i}
                functions={{}}
              />
            )
          })
        }
      </ScrollableTabView>
    );
  }
}
