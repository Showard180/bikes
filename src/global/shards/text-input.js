import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet
} from 'react-native';

module.exports = props => (
  <View>
    <Text style={Styles.text}>{props.title}</Text>
    <View style={Styles.inputWrap}>
      <TextInput
        style={Styles.input}
        placeholder={props.text}
        keyboardType={props['key-type']}
        secureTextEntry={props.secure}
        underlineColorAndroid={props.underline || 'transparent'}
        onChangeText={text => props.interactiveFunction({text, id: props.id})}
      />
    </View>
  </View>
)

const Styles = StyleSheet.create({
  inputWrap: {
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    backgroundColor: 'transparent'
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5
  },
  text: {
    marginLeft: 15,
    color: 'white'
  },
  error: {
    color: 'red'
  }
})
