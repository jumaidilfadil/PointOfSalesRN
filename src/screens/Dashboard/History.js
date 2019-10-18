import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  H1,
  View,
  Title,
  List,
  ListItem,
  Right,
  Button,
  Spinner,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {API} from '../../configs/api';
import RupiahFormat from '../../helpers/RupiahFormat';
import PercentFormat from '../../helpers/PercentFormat';
import NumberFormat from '../../helpers/NumberFormat';

export default class History extends Component {
  constructor() {
    super();
    this.state = {
      loading: 'Loading...',
      recentOrders: null,
      token: '',
      todayIncome: null,
      percentFromYesterday: null,
      ordersThisWeek: null,
      percentOrdersLastWeek: null,
      thisYearIncome: null,
      percentLastYearIncome: null,
    };
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({
      token,
    });
  };

  getRecentOrders = () => {
    let url = `${API.baseUrl}/history/recent-orders`;
    const header = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    axios
      .get(url, header)
      .then(result => {
        const recentOrders = result.data.data ? result.data.data : [];
        this.setState({
          recentOrders,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getTodayIncome = () => {
    const url = `${API.baseUrl}/history/income`;
    const header = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    axios
      .get(url, header)
      .then(result => {
        let percentOrdersLastWeek;
        result.data.data[0].percent_orders_last_week
          ? (percentOrdersLastWeek = PercentFormat(
              result.data.data[0].percent_orders_last_week,
            ))
          : (percentOrdersLastWeek = 'Nothing Order in ');

        let percentLastYearIncome;
        result.data.data[0].percent_last_year_income
          ? (percentLastYearIncome = PercentFormat(
              result.data.data[0].percent_last_year_income,
            ))
          : (percentLastYearIncome = 'Nothing Income in ');

        this.setState({
          todayIncome: result.data.data[0].today_income,
          percentFromYesterday: result.data.data[0].percent_from_yesterday,
          ordersThisWeek: result.data.data[0].orders_this_week,
          percentOrdersLastWeek,
          thisYearIncome: result.data.data[0].this_year_income,
          percentLastYearIncome,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  async componentDidMount() {
    await this.getToken();
    this.getRecentOrders();
    this.getTodayIncome();
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#ba000d"
          style={styles.backgroundColorDefault}>
          <Body style={styles.headerTitle}>
            <Title>Padang Restaurant</Title>
          </Body>
        </Header>
        <Content padder>
          <Grid>
            <Col style={styles.colTodayIncome}>
              <Card style={styles.cardTodayIncome}>
                <CardItem style={styles.cardTodayIncome}>
                  <Body style={styles.cardBody}>
                    <H1 style={styles.cardTitle}>Today's Income</H1>
                    {this.state.todayIncome == null ? (
                      <Spinner color="#f44336" />
                    ) : (
                      <Text style={styles.cardText}>
                        {RupiahFormat(this.state.todayIncome)}
                      </Text>
                    )}
                    <Text style={styles.cardNote}>
                      {this.state.percentFromYesterday == null
                        ? this.state.loading
                        : PercentFormat(this.state.percentFromYesterday)}{' '}
                      Yesterday
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </Col>
            <Col style={styles.colOrder}>
              <Card style={styles.cardOrders}>
                <CardItem style={styles.cardOrders}>
                  <Body style={styles.cardBody}>
                    <H1 style={styles.cardTitle}>Orders</H1>
                    {this.state.todayIncome == null ? (
                      <Spinner color="#f44336" />
                    ) : (
                      <Text style={styles.cardText}>
                        {NumberFormat(this.state.ordersThisWeek)}
                      </Text>
                    )}
                    <Text style={styles.cardNote}>
                      {this.state.percentFromYesterday == null
                        ? this.state.loading
                        : this.state.percentOrdersLastWeek}{' '}
                      Last Week
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.colYearIncome}>
              <Card style={styles.cardYearIncome}>
                <CardItem style={styles.cardYearIncome}>
                  <Body style={styles.cardBody}>
                    <H1 style={styles.cardTitle}>This Year's Income</H1>
                    {this.state.todayIncome == null ? (
                      <Spinner color="#f44336" />
                    ) : (
                      <Text style={styles.cardText}>
                        {RupiahFormat(this.state.thisYearIncome)}
                      </Text>
                    )}
                    <Text style={styles.cardNote}>
                      {this.state.percentLastYearIncome == null
                        ? this.state.loading
                        : this.state.percentLastYearIncome}{' '}
                      Last Year
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </Col>
          </Grid>
          <View>
            <H1 style={styles.titleH1}>Recent Order</H1>
            {this.state.recentOrders == null ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Spinner color="#f44336" />
              </View>
            ) : (
              <List>
                {this.state.recentOrders.map((item, index) => (
                  <ListItem thumbnail key={index}>
                    <Body>
                      <Text>{RupiahFormat(item.amount)}</Text>
                      <Text note numberOfLines={1}>
                        #{item.invoice}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                ))}
              </List>
            )}
          </View>
        </Content>
      </Container>
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
  headerTitle: {
    alignItems: 'center',
  },
  colTodayIncome: {
    marginRight: 5,
  },
  colOrder: {
    marginLeft: 5,
  },
  colYearIncome: {
    marginTop: 5,
  },
  cardTodayIncome: {
    backgroundColor: '#ffcdd2',
  },
  cardOrders: {
    backgroundColor: '#b3e5fc',
  },
  cardYearIncome: {
    backgroundColor: '#e1bee7',
  },
  cardBody: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
  },
  cardText: {
    fontSize: 18,
  },
  cardNote: {
    fontSize: 12,
  },
  titleH1: {
    fontSize: 24,
    marginTop: 20,
  },
});

/*
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>History</Text>
      </View>
*/
