import React, {Component} from 'react';
import {Text, View, ScrollView, AsyncStorage, Image, StyleSheet, Button, TextInput} from 'react-native';
import axios from 'axios';

import Container from '../../global/containers/app-container';
import {Tile, StravaLogin} from '../../global/components/index';
import {text} from '../../global/shards/index';
import {profile} from '../../json';

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      loading: true,
      editing: {
        state: false,
      }
    }

    this.renderTiles = this.renderTiles.bind(this);
    this.renderEditing = this.renderEditing.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentWillMount() {
    let userId;
    let access;
    try {
      userId = await AsyncStorage.getItem('userId');
      access = await AsyncStorage.getItem('access');
      this.setState({
        userId,
        access
      })
    } catch (e) {
      console.log(e);
      this.setState({
        userInfo: {
          err: 'Can\'t recieve info at this point, try again later'
        }
      });
    }

    axios.get('http://localhost:8080/api/user-info', {headers: {bearer: userId, auth: access}})
    .then(res => {
      const {user, stravaEnabled, picture} = res.data;
      this.setState({userInfo: user, picture, stravaEnabled, loading: false});
    })
    .catch(e => {
      console.log(e);
      this.setState({
        userInfo: {
          loading: false,
          err: 'Can\'t recieve info at this point, try again later'
        }
      });
    })
  }


  changeDetails() {
    const {
      userId,
      access,
      editing: {
        item,
        value
      }
    } = this.state;
    axios.get('http://localhost:8080/api/edit-details', {headers: {bearer: userId, auth: access, edit: this.state.userInfo[item].item, value}})
    .then(res => {
      userInfo = res.data.user;
      userInfo[item].value = value;
      this.setState({userInfo, editing: {state: false}})
    })
    .catch(e => {
      this.setState({res: 'Something went wrong, please try again later'});
    })
  }

  async logout() {
    try {
      this.setState({ loading: true })
      const userId = this.state.userId;
      axios.get(`http://localhost:8080/user/logout?userId=${userId}`).then(res => {
        AsyncStorage.multiRemove(['userId', 'access', 'refresh']);
        this.setState({
          userId: null,
          loading: false,
          access: null
        })
        this.props.nav.replace({title: 'Login'});
      })
      .catch(() => {
        loading: false,
        this.setState({res: 'Something went wrong, please try again later'});
      })
    } catch (e) {
      console.log(e);
      loading: false,
      this.setState({res: 'Something went wrong, please try again later'});
    }
  }

  renderTiles(arr, enabled) {
    return (
      <View style={{marginBottom: 30}}>
        {
          arr.map((o, i) => {
            return <Tile
              key={i}
              title={o.title}
              value={o.value}
              button={!enabled ? {title: 'Edit', onPress: () => this.setState({editing: {state: true, item: i}})} : null}
              />
          })
        }
        <Button
          title="Logout"
          color='red'
          onPress={this.logout}
          />
      </View>
    )
  }

  renderEditing({edit}) {
    const {
      res
    } = this.state;
    const TextInput = text;
    return (
      <Tile>
        <TextInput
          title={`Current ${edit.title} ${edit.value}`}
          interactiveFunction={({id, text}) => {
            const details = Object.assign({}, this.state.editing, {value: text});
            this.setState({editing: details})
          }}
          key-type={edit.item==='phone'?'phone-pad':'default'}
          id={edit.item}
          text="Enter your name"
          />
        <Button
          title="Submit"
          onPress={this.changeDetails.bind(this)}
          />
        <Button
          title="Cancel"
          onPress={() => this.setState({editing: {state: false}})}
          />
      </Tile>
    )
  }

  render() {
    const {
      userInfo,
      editing,
      picture,
      stravaEnabled,
      loading
    } = this.state;

    const {
      title
    } = profile;
    let image = picture ? { uri: picture.value} : require('./big-on-bikes.jpg');
    return (
      <ScrollView>
        <Container loading={loading} title={title} titleColor={Styles.titleColor}>
          <Image
            source={image}
            style={Styles.image}
            />
          {
            !stravaEnabled &&
            <StravaLogin />
          }
          {
            editing.state ?
            this.renderEditing({edit: this.state.userInfo[editing.item]})
            :
            this.renderTiles(userInfo, stravaEnabled)
          }
        </Container>
      </ScrollView>
    )
  }
}

const Styles = StyleSheet.create({
  titleColor: {
    color: 'white'
  },
  image: {
    width: 150,
    height: 112,
    alignSelf: 'center',
    marginBottom: 30
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1
  }
})
