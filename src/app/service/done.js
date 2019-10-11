import React from 'react';
import { View, Text, Button } from 'react-native';
import moment from 'moment';

const { Component } = React;

class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={{ color: 'white' }}>Congratulations, your booking has now been sent. We'll contact you if there is a problem. See you on {moment(this.props.details.startDate).format('MMMM Do YYYY')}</Text>
        <Button
          title="Book another service"
          color="white"
          onPress={() => this.props.nav.push({ title: 'StartDate' })}
        />
      </View>
    )
  }
}

export default Done;
