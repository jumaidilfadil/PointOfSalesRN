import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView, Modal} from 'react-native';
import {
  Content,
  Text,
  H1,
  Card,
  CardItem,
  Body,
  Left,
  Button,
  Thumbnail,
  Right,
  Container,
  List,
  ListItem,
} from 'native-base';
import dateFormat from 'dateformat';
import RupiahFormat from '../../helpers/RupiahFormat';

const _renderCart = (
  cart,
  modalCheckoutVisible,
  setModalVisible,
  invoice,
  orderDate,
  username,
  onPressCheckoutButton,
) => {
  if (cart.length > 0) {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    const ppn = total * 0.1;
    const totalAll = total + ppn;
    return (
      <>
        {cart.map(item => (
          <Card key={item.id}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{uri: `http://10.0.2.2:5000/uploads/${item.image}`}}
                />
                <Body>
                  <Text>{item.name}</Text>
                </Body>
              </Left>
              <Right>
                <Text>{RupiahFormat(item.price)}</Text>
              </Right>
            </CardItem>
          </Card>
        ))}
        <Button
          block
          style={styles.buttonCheckout}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text>Checkout</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalCheckoutVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Container>
            <Content style={{marginHorizontal: 10, marginVertical: 50}}>
              <View style={{marginBottom: 20}}>
                <H1 style={{marginBottom: 20}}>Checkout</H1>
                <Text>Date : {orderDate}</Text>
                <Text>Cashier : {username}</Text>
                <Text>Receipt no. : #{invoice}</Text>
              </View>
              <View style={{marginBottom: 20}}>
                <List>
                  {cart.map(item => (
                    <ListItem key={item.id}>
                      <Left>
                        <Text>{`${item.name} (${item.quantity}x)`}</Text>
                      </Left>
                      <Right>
                        <Text>{`${RupiahFormat(
                          item.price * item.quantity,
                        )}`}</Text>
                      </Right>
                    </ListItem>
                  ))}
                  <ListItem selected>
                    <Left>
                      <Text>Total</Text>
                    </Left>
                    <Right>
                      <Text>{RupiahFormat(total)}</Text>
                    </Right>
                  </ListItem>
                  <ListItem selected>
                    <Left>
                      <Text>PPN (10%)</Text>
                    </Left>
                    <Right>
                      <Text>{RupiahFormat(ppn)}</Text>
                    </Right>
                  </ListItem>
                  <ListItem selected>
                    <Left>
                      <Text style={{fontWeight: 'bold', color: '#f44336'}}>
                        Total All
                      </Text>
                    </Left>
                    <Right>
                      <Text style={{fontWeight: 'bold', color: '#f44336'}}>
                        {RupiahFormat(totalAll)}
                      </Text>
                    </Right>
                  </ListItem>
                </List>
              </View>
              <Button
                style={styles.buttonCheckout}
                onPress={onPressCheckoutButton}>
                <Text>Checkout Now</Text>
              </Button>
              <Button
                danger
                bordered
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.buttonTextCenter}>
                <Text>Cancel</Text>
              </Button>
            </Content>
          </Container>
        </Modal>
      </>
    );
  } else {
    return (
      <H1 style={{margin: 10, textAlign: 'center'}}>Your cart is empty.</H1>
    );
  }
};

const Cart = props => (
  <Content>
    <SafeAreaView>
      <ScrollView style={{padding: 10}}>
        {props.cart == null ? (
          <div className="col">
            <p>Loading...</p>
          </div>
        ) : (
          _renderCart(
            props.cart,
            props.modalCheckoutVisible,
            props.setModalVisible,
            props.invoice,
            props.orderDate,
            props.username,
            props.onPressCheckoutButton,
          )
        )}
      </ScrollView>
    </SafeAreaView>
  </Content>
);

const styles = StyleSheet.create({
  backgroundColorDefault: {
    backgroundColor: '#f44336',
  },
  backgroundColorOther: {
    backgroundColor: '#ba000d',
  },
  textColorDefault: {
    color: '#f44336',
  },
  buttonCheckout: {
    backgroundColor: '#f44336',
    marginVertical: 10,
    justifyContent: 'center',
  },
  buttonTextCenter: {
    justifyContent: 'center',
  },
});

export default Cart;
