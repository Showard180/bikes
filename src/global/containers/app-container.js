import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const Container = props => (
  <View style={[Styles.container, props.background]}>
      <Spinner
      visible={props.loading}
      textContent={"Loading..."}
      textStyle={{color: '#FFF'}}
      overlayColor="#093b6f"
    />
    <Text style={[Styles.text, props.titleColor]}>{props.title}</Text>
    {props.children}
  </View>
)

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#093b6f'
  },
  text: {
    marginBottom: 40,
    color: 'black',
    alignSelf: 'center',
    fontSize: 30
  }
});

export default Container;
