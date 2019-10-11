const React = require('react');
const { Component } = React;
import { View } from 'react-native';
import Components from '../../global/components/index';
import {bike} from '../../json/index';

class BikeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.valueChange = this.valueChange.bind(this);
    this.submitBike = this.submitBike.bind(this);
  }

  submitBike() {
    this.props.addDetail({ type: 'bike', value: {...this.state} });
    this.props.nav.push({ title: 'ConfirmService' });
  }

  valueChange({ text, id }) {
    this.setState({
      [id]: text
    });
  }

  render() {
    const { components } = bike;
    return (
      <View>
        {
          components.map((component, i) => {
            const Main = Components[component.type];
            return (
              <Main
                {...component}
                key={i}
                functions={{
                  valueChange: this.valueChange,
                  submitBike: this.submitBike
                }}
              />
            )
          })
        }
      </View>
    )
  }
}

export default BikeForm;
