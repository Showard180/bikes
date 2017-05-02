import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import axios from 'axios';

import Container from '../../global/containers/container';
import Components from '../../global/components/index';
import {getAccessToken, verifyAccessToken} from '../utils';
import {login} from '../../json';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'login-phone': null,
      'login-pass': null
    }

    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submitLogin() {
    const phone = this.state['login-phone'];
    const pass = this.state['login-pass'];
    axios.post('http://localhost:8080/user/login', {phone, pass})
      .then(res => {
        AsyncStorage.multiSet([['refresh', res.data.refresh], ['userId', res.data.userId.toString()]], () => {
          getAccessToken(res.data)
            .then(access => {
              AsyncStorage.setItem('access', access)
              this.props.nav.push({title: 'UserProfile'});
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({err: err.response.data.message})
        console.log(err);
      })
  }

  onChange({text, id}) {
    this.setState({[id]: text});
  }

  async componentWillMount() {
    try {
      const userId = await AsyncStorage.getItem('userId')
      const access = await AsyncStorage.getItem('access');
      const refresh = await AsyncStorage.getItem('refresh');
      if(!userId || !refresh) {
        console.log('hello');
        return;
      }

      if(!access) {
        getAccessToken({refresh, userId})
          .then(access => {
            AsyncStorage.setItem('access', access)
          })
          .catch(err => {
            return console.log(err);
          });
      } else {
        verifyAccessToken({access, userId})
          .then(res => {
            this.props.nav.push({title: 'UserProfile'});
          })
          .catch(err => {
            console.log('getting access');
            getAccessToken({refresh, userId})
              .then(access => {
                AsyncStorage.setItem('access', access)
                this.props.nav.push({title: 'UserProfile'});
              })
              .catch(err => {
                console.log(err);
              });
          })
      }

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      title,
      components
    } = login;

    return (
      <Container title={title}>
        {
          components.map((component, i) => {
            const Main = Components[component.type];
            return (
              <Main
                {...component}
                nav={this.props.nav}
                err={this.state.err}
                key={i}
                functions={{
                  submitLogin: this.submitLogin,
                  onChange: this.onChange
                }}
              />
            )
          })
        }
      </Container>
    );
  }
}
