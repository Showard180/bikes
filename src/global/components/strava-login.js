import React, {Component} from 'react';
import {View, Text, Alert, Linking, AsyncStorage, StyleSheet} from 'react-native';
import Link from 'react-native-hyperlink';

module.exports = class Strava extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    }
  }
  openLink(url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if(!supported) return console.log("Not supported");
        Linking.openURL(url);
      })
      .catch(err => {
        console.log(err)
      })
  }

  async componentWillMount() {
    const userId = await AsyncStorage.getItem('userId');
    this.setState({userId});
  }

  render() {
    const url = `https://www.strava.com/oauth/authorize?client_id=15984&response_type=code` +
      `&redirect_uri=http://localhost:8080/strava/${this.state.userId}&approval_prompt=force&scope=view_private`;
    return (
      <View>
        <Link onPress={this.openLink.bind(this)} linkStyle={Styles.linkText} linkText="Link your strava account to get a better experience">
          <Text style={{textAlign: 'center', color: 'white'}}>
            {url}
          </Text>
        </Link>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  linkText: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline'
  }
})
