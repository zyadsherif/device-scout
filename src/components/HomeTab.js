'use strict';
import React from 'react';
import {View, Text, ListView} from 'react-native';
import firebase from 'firebase'

import { Container, Header, Title, Content } from 'native-base';

const styles = require('../styles.js')

import ListItem from './ListItem'

export default class HomeTab extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        console.log(child.val());
        items.push({
          title : child.val().name,
          status: child.val().status,
          _key  : child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <Container>
        <Header>
            <Title>Device List</Title>
        </Header>

        <Content>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={styles.listview}/>
        </Content>
      </Container>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}
