import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const Container = props => (
  <View
    style={[Styles.container, Styles.background]}
    resizeMode='cover'
  >
    <View style={Styles.container} />
      <Text style={Styles.text}>{props.title}</Text>
      {props.children}
    <View style={Styles.container} />
  </View>
)

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    width: null,
    height: null
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 30
  }
});

export default Container;
