import React from 'react';
import {Text, StyleSheet} from 'react-native';

module.exports = props => (
  <Text style={Styles.link} onPress={() => props.nav.push({title: props.to})}>{props.text}</Text>
);

const Styles = StyleSheet.create({
  link: {
    alignSelf: 'center',
    marginTop: 30
  }
});
