import React from 'react';
import {View, Text} from 'react-native';

module.exports = (props) => (
  <View>
    {
      props['info-attribute'].map((o, i) => (
        <Text style={{paddingBottom: 10}} key={i}>{o.text}: {props.info[o.id]}</Text>
      ))
    }
  </View>
);
