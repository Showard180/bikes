import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Container from '../../global/containers/container';
import Components from '../../global/components/index';
import {profile} from '../../json';

export default class UserProfile extends Component {
  render() {
    const {
      title,
      components
    } = profile;

    return (
      <Container title={title}>
        {
          components.map((component, i) => {
            const Main = Components[component.type];
            return (
              <Main
                {...component}
                nav={this.props.nav}
                key={i}
                functions={{}}
              />
            )
          })
        }
      </Container>
    );
  }
}
