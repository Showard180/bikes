import React, {Component} from 'react';
import {Text, StyleSheet, Navigator, BackAndroid, AsyncStorage} from 'react-native';
import axios from 'axios';

import Container from '../../global/containers/app-container';
import Components from '../../global/components/index';
import {book} from '../../json';
import {Tile} from '../../global/components/index';
import StartDate from './start-date';
import EndDate from './end-date';
import ChooseBike from './choose-bike';
import BikeForm from './bike-form';
import Confirmation from './confirmation';
import Done from './done';

const scenes = {
  StartDate: {
    page: StartDate
  },
  EndDate: {
    page: EndDate
  },
  ChooseBike: {
    page: ChooseBike
  },
  BikeForm: {
    page: BikeForm
  },
  ConfirmService: {
    page: Confirmation
  },
  Done: {
    page: Done
  }
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.addDetail = this.addDetail.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  renderScene({title}, navigator) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if(title!=='Login') {
        navigator.pop();
        return true;
      }
      return false;
    });
    const options = scenes[title];
    console.log(options);
    const Page = options.page;
    return <Page device={this.props.device} confirm={this.confirm} bikes={this.props.bikes} details={{...this.state}} addDetail={this.addDetail} nav={navigator} {...options}/>
  }

  addDetail({ type, value }) {
    this.setState({ [type]: value });
  }

  confirm() {
    this.props.submit(this.state);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  render() {
    return (
      <Navigator
        initialRoute={{title: 'StartDate'}}
        passProps={{device: this.props.device}}
        renderScene={(route, nav) => this.renderScene(route, nav)}
      />
    );
  }
}

export default class BookService extends Component {
  constructor() {
    super();
    this.state ={
      bikes: []
    };
    this.submit = this.submit.bind(this);
  }
  async componentWillMount() {
    const userId = await AsyncStorage.getItem('userId');
    const access = await AsyncStorage.getItem('access');
    this.setState({
      userId,
      access
    });
    axios.get('http://localhost:8080/api/bikes', {headers: {bearer: userId, auth: access}})
      .then(res => {
        this.setState({ bikes: res.data.bikes });
      })
  }

  submit(detail) {
    const { userId, access } = this.state;
    axios({
      url: 'http://localhost:8080/api/create/service',
      method: 'POST',
      headers: {
        bearer: userId,
        auth: access
      },
      data: detail
    })
  }

  render() {
    const {
      title
    } = book;
    return (
      <Container title={title} titleColor={Styles.titleColor}>
        <Nav device={this.props.device} submit={this.submit} bikes={this.state.bikes} />
      </Container>
    )
  }
}

const Styles = StyleSheet.create({
  titleColor: {
    color: 'white'
  }
})
