import React from 'react';
import { View, Picker, Button, Text } from 'react-native';

const { Component } = React;

class ChooseBike extends Component {
  constructor(props) {
    super(props);
    const { bikes } = this.props;
    const primaryBike = bikes.find(bike => bike.primary === true);
    this.state = {
      selectedValue: primaryBike
    };
    this.valueChange = this.valueChange.bind(this);
    this.submitBike = this.submitBike.bind(this);
  };

  valueChange(itemName, index) {
    let selectedBike;
    if (itemName === 'otherBike') {
      selectedBike = {
        itemName,
        id: itemName
      }
    } else {
      selectedBike = this.props.bikes[index];
    }

    console.log(selectedBike);
    this.setState({
      selectedValue: selectedBike
    });
  }

  submitBike() {
    if (this.state.selectedValue.itemName === 'otherBike') {
      return this.props.nav.push({ title: 'BikeForm' });
    }
    this.props.addDetail({ type: 'bike', value: this.state.selectedValue });
    this.props.nav.push({ title: 'ConfirmService' });
  }

  render() {
    console.log(this.state.selectedValue)
    return (
      <View>
        <Picker
          selectedValue={this.state.selectedValue.id}
          onValueChange={this.valueChange}>
          {
            this.props.bikes.map((bike, i) => (
              <Picker.Item color="white" label={bike.name} key={i} value={bike.id} />
            ))
          }
          <Picker.Item color="white" label="Other bike" value="otherBike" />
        </Picker>
        <Button
          title="Submit"
          onPress={this.submitBike}
          color="white"
        />
      </View>
    );
  }
}

export default ChooseBike;
