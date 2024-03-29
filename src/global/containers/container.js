import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const Container = props => (
  <View style={[Styles.container]}>
    <View style={[Styles.container]} />
    <Text style={Styles.text}>{props.title}</Text>
    {props.children}
    <View style={[Styles.container]} />
  </View>
)

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#093b6f'
  },
  text: {
    marginBottom: 40,
    color: 'white',
    alignSelf: 'center',
    fontSize: 30
  }
});

export default Container;
