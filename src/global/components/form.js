import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import shards from '../shards/index';

module.exports = props => (
  <View>
    {
      props.err
       &&
      <Text style={Styles.err}>{props.err}</Text>
    }
    {
      props.shards.map((o, i) => {
        const Input = shards[o.type];
        const interactiveFunction = props.functions[o.function];
        return (
          <Input
            key={i}
            interactiveFunction={interactiveFunction}
            nav={props.nav}
            {...o}
          />
        )
      })
    }
  </View>
);

const Styles = StyleSheet.create({
  err: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 30
  }
})
