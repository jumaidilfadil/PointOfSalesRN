import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, TabBarBottom} from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import Checkout from './Checkout';
// import Cart from './Cart';
import History from './History';

class Logout extends Component {
  componentDidMount() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  render() {
    return null;
  }
}

const FooterTabs = createBottomTabNavigator(
  {
    Checkout: {screen: Checkout},
    // Cart: {screen: Cart},
    History: {screen: History},
    Logout: {screen: Logout},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Checkout') {
          iconName = 'utensils';
          //iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          /*
        } else if (routeName === 'Cart') {
          iconName = 'shopping-cart';
        */
        } else if (routeName === 'History') {
          iconName = 'history';
        } else if (routeName === 'Logout') {
          iconName = 'sign-out-alt';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#f44336',
      inactiveTintColor: 'gray',
    },
    animationEnabled: true,
    swipeEnabled: true,
  },
);

export default createAppContainer(FooterTabs);
