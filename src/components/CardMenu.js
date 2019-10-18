import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Button,
  View,
  Spinner,
} from 'native-base';
import RupiahFormat from '../helpers/RupiahFormat';
import {API} from '../configs/api';

const CardMenu = props =>
  props.menu == null ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Spinner color="#f44336" />
    </View>
  ) : (
    props.menu.map(item => {
      let buttonCart = 'Add to Cart';
      let borderType = false;
      let buttonBackgroundColor = '#f44336';
      if (props.selected.includes(item.id)) {
        buttonCart = 'Remove from Cart';
        borderType = true;
        buttonBackgroundColor = '#fff';
      }

      return (
        <Card style={styles.card} key={item.id}>
          <CardItem>
            <Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note>{RupiahFormat(item.price)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri: `${API.baseUrl}/uploads/${item.image}`,
              }}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Body>
              <Button
                bordered={borderType}
                danger={borderType}
                style={{backgroundColor: buttonBackgroundColor}}
                onPress={() => props.addToCartPress(item.id)}
                block>
                <Text style={styles.buttonCartText}>{buttonCart}</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      );
    })
  );

const styles = StyleSheet.create({
  backgroundColorDefault: {
    backgroundColor: '#f44336',
  },
  card: {
    width: '49%',
  },
  buttonCartText: {
    textAlign: 'center',
  },
});

export default CardMenu;
