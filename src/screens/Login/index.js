import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {API} from '../../configs/api';
import bgLogin from '../../assets/images/waiter-welcome.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  loginHandler = () => {
    this.setState({isLoading: true});
    const {username, password} = this.state;
    const url = `${API.baseUrl}/user/login`;
    const payload = {
      username,
      password,
    };
    axios
      .post(url, payload)
      .then(response => {
        AsyncStorage.multiSet([
          ['username', username],
          ['token', response.data.data.token],
        ]);
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        this.setState({isLoading: false});
        ToastAndroid.showWithGravityAndOffset(
          'Invalid Username/Password!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#ba000d" barStyle="light-content" />
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={bgLogin} />
            <Text style={styles.title}>Padang Restaurant</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.containerFormLogin}>
              <TextInput
                placeholder="username"
                placeholderTextColor="#666"
                style={styles.input}
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={text => this.setState({username: text})}
              />
              <TextInput
                placeholder="password"
                placeholderTextColor="#666"
                style={styles.input}
                secureTextEntry
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={this.loginHandler}>
                {this.state.isLoading === true ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonLoginText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7961',
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9,
  },
  containerFormLogin: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,.5)',
    marginBottom: 10,
    color: '#111',
    paddingHorizontal: 10,
  },
  buttonLogin: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
  },
  buttonLoginText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: '700',
  },
});
