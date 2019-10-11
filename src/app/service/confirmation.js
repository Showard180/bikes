import React from 'react';
import { View, Text, Button } from 'react-native';
import moment from 'moment';

const { Component } = React;

class Confirmation extends Component {
  render() {
    const {
      details: {
        startDate,
        endDate,
        bike
      },
      confirm,
      nav
    } = this.props;
    const confirmation = () => {
      confirm();
      nav.push({ title: 'Done' });
    }

    console.log(bike)

    const bikeDetail = bike && bike.name ? bike.name : `${bike['bike-make']} - ${bike['bike-model']}`
    return (
      <View>
        <Text style={{ color: 'white' }}>Confirmation</Text>
        <Text style={{ color: 'white' }}>Drop off date: {moment(startDate).format('MMMM Do YYYY')}</Text>
        <Text style={{ color: 'white' }}>Pick up date: {moment(endDate).format('MMMM Do YYYY')}</Text>
        <Text style={{ color: 'white' }}>Bike: {bikeDetail}</Text>
        <Button
          title="Confirm"
          color="white"
          onPress={confirmation}
        />
      </View>
    )
  }
}

export default Confirmation;
