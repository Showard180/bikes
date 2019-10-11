import React, {Component} from 'react';
import {View, Button, DatePickerAndroid, DatePickerIOS} from 'react-native';
import moment from 'moment'
import {Tile} from '../../global/components/index';

export default class EndDate extends Component {
  constructor(props) {
    super(props);
    const minDate = new Date(this.props.details.startDate)
    minDate.setDate(minDate.getDate() + 1);
    this.state = {
      date: minDate,
      minDate
    }
    this.submitDate = this.submitDate.bind(this)
    this.dateChange = this.dateChange.bind(this)
  }

  dateChange(date) {
    this.setState({date})
  }

  async pickDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        console.log(action);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  submitDate() {
    const {date} = this.state;
    this.props.addDetail({ type: 'endDate', value: date || this.state.minDate })
    console.log(this.props.bikes && this.props.bikes.length ? 'ChooseBike': 'BikeForm');
    this.props.nav.push({title: this.props.bikes && this.props.bikes.length ? 'ChooseBike': 'BikeForm'});
  }

  render() {
    return (
      <Tile
        title="When do you want to pick your bike up?"
        height={400}
      >
        <View style={{marginTop: 20}} />
        {
          this.props.device === 'ios' ?
          (
            <DatePickerIOS
              minimumDate={this.state.minDate}
              mode="date"
              date={this.state.date || this.state.minDate}
              textColor="white"
              onDateChange={this.dateChange}
            />
          ) : (
            <Button title="Pick date" onPress={this.pickDate}/>
          )
        }
        <View style={{marginTop: 20}} />
        <Button
          title="Submit"
          onPress={this.submitDate}
          />
      </Tile>
    )
  }
}
