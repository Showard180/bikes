import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';

import shards from '../shards/index';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = props => (
  <View>
    {
      <ListView
        dataSource={ds.cloneWithRows(props[props['loop-over']])}
        renderRow={rowData => <Text>{rowData}</Text>}
      />
    }
  </View>
);
