import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Container from '../../global/containers/container';
import Form from '../../global/forms/form';
import {pages} from '../../json';

export default class LoginForm extends Component {
  submitLogin() {
    console.log('Login submitted');
  }

  render() {
    const {
      login: {
        title,
        form
      }
    } = pages;

    return (
      <Container title={title}>
        <Form
          {...form}
          functions={{
            submitLogin: this.submitLogin.bind(this)
          }}
        />
      </Container>
    );
  }
}
