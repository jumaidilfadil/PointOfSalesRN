import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {Content, Icon, Text, Item, H1} from 'native-base';
import IconMDC from 'react-native-vector-icons/MaterialCommunityIcons';

import CardMenu from '../../components/CardMenu';

const Menu = props => (
  <Content>
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerInputSearch}>
          <View>
            <Item rounded style={styles.inputSearch}>
              <Icon active name="search" />
              <TextInput placeholder="Search" style={{width: '100%'}} />
            </Item>
          </View>
        </View>
        <View style={styles.contentBody}>
          <H1 style={styles.title}>Category</H1>
          <View style={styles.contentCategory}>
            <View style={styles.categoryItem}>
              <View style={styles.contentIconCategory}>
                <IconMDC
                  name="format-list-bulleted"
                  style={styles.iconCategory}
                />
              </View>
              <View>
                <Text style={styles.textCategory}>All</Text>
              </View>
            </View>
            <View style={styles.categoryItem}>
              <View style={styles.contentIconCategory}>
                <IconMDC name="food" style={styles.iconCategory} />
              </View>
              <View>
                <Text style={styles.textCategory}>Food</Text>
              </View>
            </View>
            <View style={styles.categoryItem}>
              <View style={styles.contentIconCategory}>
                <IconMDC name="cup-water" style={styles.iconCategory} />
              </View>
              <View>
                <Text style={styles.textCategory}>Beverage</Text>
              </View>
            </View>
          </View>
          <H1 style={styles.title}>Menu List</H1>
          <View style={styles.flexRow}>
            <CardMenu
              menu={props.menu}
              addToCartPress={id => props.addToCartPress(id)}
              selected={props.selectedId}
            />
          </View>
        </View>
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
  scrollView: {
    backgroundColor: '#ffebee',
  },
  containerInputSearch: {
    height: 100,
    padding: 20,
  },
  inputSearch: {
    borderColor: '#6d6d6d',
    backgroundColor: '#ffff',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#424242',
    textAlign: 'center',
  },
  contentBody: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10,
    paddingTop: 30,
    elevation: 25,
  },
  title: {
    fontSize: 20,
  },
  contentCategory: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryItem: {
    width: 62,
    marginRight: 10,
  },
  contentIconCategory: {
    borderRadius: 20,
    backgroundColor: '#f44336',
    padding: 5,
  },
  iconCategory: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
  },
  textCategory: {
    color: '#192a56',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default Menu;
