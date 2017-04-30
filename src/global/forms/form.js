import React, {Component} from 'react';
import {View} from 'react-native';

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
      </View>
    )
  }
}
