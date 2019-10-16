import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Dashboard extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={styles.backgroundColorPrimary}>
          <Button vertical onPress={this.props.onCheckoutButtonPress}>
            <Icon name="utensils" style={styles.icon} />
          </Button>
          <Button vertical onPress={this.props.onHistoryButtonPress}>
            <Icon name="history" style={styles.icon} />
          </Button>
          <Button vertical>
            <Icon name="plus" style={styles.icon} />
          </Button>
          <Button vertical onPress={this.props.onHistoryButtonPress}>
            <Icon name="list-alt" style={styles.icon} />
          </Button>
          <Button vertical onPress={this.props.onLogoutButtonPress}>
            <Icon name="sign-out-alt" style={styles.icon} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColorPrimary: {
    backgroundColor: '#f44336',
  },
  icon: {
    color: '#fff',
    fontSize: 25,
  },
});
