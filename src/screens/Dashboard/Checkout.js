import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Tabs, Tab} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import dateFormat from 'dateformat';

import Menu from './Menu';
import Cart from './Cart';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      totalPage: '',
      fabActive: false,
      selectedId: [],
      cart: [],
      cartTotal: 0,
      modalCheckoutVisible: false,
      invoice: '',
      date: '',
      username: '',
      token: '',
    };
  }

  getProducts = () => {
    let url = `http://10.0.2.2:5000/api/v1/product`;
    axios
      .get(url)
      .then(result => {
        const data = result.data.data ? result.data.data : [];
        this.setState({
          data,
          totalPage: result.data.total_page,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUsername = async () => {
    const username = await AsyncStorage.getItem('username');
    this.setState({
      username,
    });
  };

  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({
      token,
    });
  };

  async componentDidMount() {
    await this.getProducts();
    this.getUsername();
    this.getToken();

    const dateNow = new Date();
    const invoice = dateFormat(dateNow, 'yyyymmddHHMMss');
    const orderDate = dateFormat(dateNow, 'yyyy-mm-dd HH:MM:ss');
    this.setState({
      invoice,
      date: orderDate,
    });
  }

  addToCartHandler = id => {
    let selectedId = [...this.state.selectedId];
    if (selectedId.includes(id)) {
      var index = selectedId.findIndex(selected => selected === id);
      selectedId.splice(index, 1);
      this.state.cart.splice(index, 1);
      this.setState({cartTotal: this.state.cartTotal - 1});
    } else {
      selectedId.push(id);

      var index = this.state.data.findIndex(menu => menu.id === id);
      var cartAdd = this.state.data[index];
      this.state.cart.push(cartAdd);
      var cart = [...this.state.cart];
      var indexCart = cart.findIndex(menu => menu.id === id);
      cart[indexCart].quantity = 1;

      this.setState({
        cart: cart,
        cartTotal: this.state.cartTotal + 1,
      });
    }

    this.setState({selectedId});
  };

  setModalVisible(visible) {
    this.setState({modalCheckoutVisible: visible});
  }

  checkoutHandler = () => {
    let url = 'http://10.0.2.2:5000/checkout';
    const header = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    let product_name = [];
    let price = [];
    let quantity = [];
    for (let i = 0; i < this.state.cart.length; i++) {
      product_name.push(this.state.cart[i].name);
      price.push(this.state.cart[i].price);
      quantity.push(this.state.cart[i].quantity);
    }
    let payload = {
      invoice: this.state.invoice,
      username: this.state.username,
      date: this.state.date,
      product_name,
      price,
      quantity,
    };

    this.checkout(url, payload, header);
  };

  checkout = (url, payload, header) => {
    axios
      .post(url, payload, header)
      .then(response => {
        this.setState({modalCheckoutVisible: false});

        const dateNow = new Date();
        const invoice = dateFormat(dateNow, 'yyyymmddHHMMss');
        const orderDate = dateFormat(dateNow, 'yyyy-mm-dd HH:MM:ss');

        this.setState({
          selectedId: [],
          cart: [],
          cartTotal: 0,
          invoice,
          date: orderDate,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonDisabled: false,
        });
      });
  };

  render() {
    return (
      <>
        <Container>
          <Header hasTabs />
          <Tabs>
            <Tab heading="Menu">
              <Menu
                menu={this.state.data}
                addToCartPress={id => this.addToCartHandler(id)}
                selected={this.state.selectedId}
              />
            </Tab>
            <Tab heading="Cart">
              <Cart
                cart={this.state.cart}
                modalCheckoutVisible={this.state.modalCheckoutVisible}
                setModalVisible={visible => this.setModalVisible(visible)}
                invoice={this.state.invoice}
                orderDate={this.state.date}
                username={this.state.username}
                onPressCheckoutButton={this.checkoutHandler}
              />
            </Tab>
          </Tabs>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColorDefault: {
    backgroundColor: '#f44336',
  },
  backgroundColorOther: {
    backgroundColor: '#ba000d',
  },
});
