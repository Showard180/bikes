import React, {Component} from 'react';
import {Text, View, AsyncStorage, Image} from 'react-native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import Container from '../../global/containers/container';
import Components from '../../global/components/index';
import {getAccessToken, verifyAccessToken} from '../utils';
import {login} from '../../json';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'login-phone': null,
      'login-pass': null,
      loading: true
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
              this.props.nav.push({title: 'App'});
              this.setState({ loading: false })
            })
            .catch(err => {
              this.setState({ loading: false })
              console.log(err);
            });
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({err: err.response.data.message, loading: false})
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
        this.setState({ loading: false })
        return;
      }

      if(!access) {
        getAccessToken({refresh, userId})
          .then(access => {
            this.setState({ loading: false })
            AsyncStorage.setItem('access', access)
          })
          .catch(err => {
            this.setState({ loading: false })
            return console.log(err);
          });
      } else {
        verifyAccessToken({access, userId})
          .then(res => {
            this.props.nav.push({title: 'App'});
            this.setState({ loading: false })
          })
          .catch(err => {
            getAccessToken({refresh, userId})
              .then(access => {
                AsyncStorage.setItem('access', access)
                this.props.nav.push({title: 'App'});
                this.setState({ loading: false })
              })
              .catch(err => {
                this.setState({ loading: false })
                console.log(err);
              });
          })
      }

    } catch (err) {
      this.setState({ loading: false })
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
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{color: '#FFF'}}
          overlayColor="#093b6f"
        />
        <Image
        source={require('../profile/big-on-bikes.jpg')}
        style={{
          width: 150,
          height: 112,
          alignSelf: 'center',
          marginBottom: 30
        }}
        />
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
