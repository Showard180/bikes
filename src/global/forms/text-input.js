import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet
} from 'react-native';

module.exports = props => (
  <View>
    <Text>{props.title}</Text>
    <View style={Styles.inputWrap}>
      <TextInput
        style={Styles.input}
        placeholder={props.text}
        keyboardType={props['key-type']}
        secureTextEntry={props.secure}
      />
    </View>
  </View>
)

const Styles = StyleSheet.create({
  inputWrap: {
    marginVertical: 10,
    height: 40,
    backgroundColor: 'transparent'
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1
  }
})
