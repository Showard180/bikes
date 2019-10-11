import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

import Container from '../../global/containers/container';
import Components from '../../global/components/index';
import {register} from '../../json';

export default class RegisterForm extends Component {
  constructor(props) {
    console.log(props.device);
    super(props);
    this.state = {
      'register-phone': null,
      'register-name': null,
      'register-pass': null
    }

    this.submitRegister = this.submitRegister.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submitRegister() {
    const name = this.state['register-name'];
    const pass = this.state['register-pass'];
    const phone = this.state['register-phone'];
    axios.post('http://localhost:8080/user/register', {name, pass, phone})
      .then(res => {
        this.props.nav.push({title: 'Login'});
      })
      .catch(err => {
        this.setState({error: err.response.data.message});
      })
  }

  onChange({text, id}) {
    this.setState({[id]: text});
  }

  render() {
    const {
      title,
      components
    } = register;
    console.log(this.state.error);
    return (
      <Container title={title}>
        {
          components.map((component, i ) => {
            const Main = Components[component.type];
            return (
              <Main
                {...component}
                nav={this.props.nav}
                err={this.state.error}
                key={i}
                functions={{
                  submitRegister: this.submitRegister,
                  onChange: this.onChange
                }}
              />
            )
          })
        }
      </Container>
    )
  }
}
