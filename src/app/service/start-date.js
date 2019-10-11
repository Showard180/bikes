import React, {Component} from 'react';
import {View, Button, DatePickerIOS, Text} from 'react-native';
import {Tile, DatePicker} from '../../global/components/index';
import Container from '../../global/containers/app-container';

export default class StartDate extends Component {
  constructor() {
    super();
    this.state = {
      minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      date: null
    }
    this.submitDate = this.submitDate.bind(this)
    this.dateChange = this.dateChange.bind(this)
  }

  submitDate() {
    const {date} = this.state;
    this.props.addDetail({ type: 'startDate', value: date || this.state.minDate });
    this.props.nav.push({title: 'EndDate'});
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

  render() {
    return (
      <Tile
        title="When do you want to drop your bike off?"
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
