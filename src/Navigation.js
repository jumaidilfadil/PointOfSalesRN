import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import Login from './screens/Login';
import Checkout from './screens/Dashboard/Checkout';
import History from './screens/Dashboard/History';

class AuthLoading extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  Checkout,
  History,
});
const AuthStack = createStackNavigator({Login});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
