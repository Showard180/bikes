import React from 'react';
import {StyleSheet, Text, View, Button, DatePickerIOS} from 'react-native';


const Styles = StyleSheet.create({
  tile: {
    padding: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  textTitle: {
    fontSize: 30,
    textDecorationLine: 'underline'
  },
  textDetails: {
    marginLeft: 30,
    display: 'flex'
  }
})


module.exports = (props) => {
  let subtext = <Text style={Styles.textDetails}>{props.value}</Text>;
  if(Array.isArray(props.value)) {
    subtext = props.value.map((o, i) => (
      <Text key={i} style={Styles.textDetails}>{o.name}</Text>
    ));
  }
  return (
    <View style={[Styles.tile, props.style, {height: props.height || 150}]}>
    <Text style={Styles.textTitle}>{props.title}</Text>
    {subtext}

    {
      props.children ?
      props.children
      :
      <View>
        {
          props.button &&
            <Button
              {...props.button}
            />
        }
      </View>
    }
  </View>
  )
}
