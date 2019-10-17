import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  H1,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import FooterTabs from '../../components/FooterTabs';

export default class History extends Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
    header: null,
  };

  goToCheckout = () => {
    this.props.navigation.navigate('Checkout');
  };
  logoutHandler = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Container>
        <Header noLeft>
          <Left />
          <Body>
            <Title>History</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H1>History Page</H1>
        </Content>
        <FooterTabs
          onCheckoutButtonPress={this.goToCheckout}
          onLogoutButtonPress={this.logoutHandler}
        />
      </Container>
    );
  }
}
