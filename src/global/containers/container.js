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
    flex: 1
  },
  text: {
    marginBottom: 40,
    color: 'black',
    alignSelf: 'center',
    fontSize: 30
  }
});

export default Container;
