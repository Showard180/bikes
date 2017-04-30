import React, {Component} from 'react';
import {View, Text} from 'react-native';

import inputs from './index';

export default class Form extends Component {
  render() {
    return (
      <View>
        {
          this.props.inputs.map((o, i) => {
            const Input = inputs[o.type];
            const interactiveFunction = this.props.functions[o.function];
            return (
              <Input
                key={i}
                interactiveFunction={interactiveFunction}
                {...o}
              />
            )
          })
        }
        {
          this.props.links.map((o, i) => (
            <Text
              key={i}
              onPress={() => this.props.nav.push({Title: o.to})}>
              {o.text}
            </Text>
          ))
        }
      </View>
    )
  }
}
