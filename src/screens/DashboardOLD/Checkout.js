import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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

export default class Checkout extends Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
    header: null,
  };

  goToHistory = () => {
    this.props.navigation.navigate('History');
  };
  logoutHandler = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Container>
        <Header
          noLeft
          androidStatusBarColor="#ba000d"
          style={styles.backgroundColorPrimary}>
          <Left />
          <Body>
            <Title>Checkout</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H1>Checkout Page</H1>
        </Content>
        <FooterTabs
          onHistoryButtonPress={this.goToHistory}
          onLogoutButtonPress={this.logoutHandler}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColorPrimary: {
    backgroundColor: '#f44336',
  },
});
