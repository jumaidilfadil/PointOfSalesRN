import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text, Card, CardItem, Body, Left, Button} from 'native-base';
import RupiahFormat from '../helpers/RupiahFormat';

const CardMenu = props =>
  props.menu.map(item => (
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
            uri: `http://10.0.2.2:5000/uploads/${item.image}`,
          }}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Body>
          <Button
            style={styles.backgroundColorDefault}
            onPress={() => props.addToCartPress(item.id)}
            block>
            <Text>Add to Cart</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  ));

const styles = StyleSheet.create({
  backgroundColorDefault: {
    backgroundColor: '#f44336',
  },
  card: {
    width: '49%',
  },
});

export default CardMenu;
