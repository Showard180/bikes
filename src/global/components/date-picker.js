import React from 'react';
import DatePicker from 'react-native-datepicker'


module.exports = props => (
  <DatePicker
        style={{width: 200, alignSelf: 'center'}}
        date={props.date}
        mode="date"
        is24Hour={true}
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate={props.minDate || new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date, time) => {props.changeDate({date, time})}}
      />
);
