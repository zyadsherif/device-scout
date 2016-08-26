'use strict';
import React from 'react';
import {View, Text, ListView, StyleSheet, Dimensions, Image} from 'react-native';
import firebase from 'firebase'


export default class ProfileTab extends React.Component{

  constructor(props) {
    super(props);

    console.log(firebase.auth().currentUser);

    this.state = {user: firebase.auth().currentUser}
  }

  render() {
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.state.user.photoURL}}/>
          <Text>
            {this.state.user.displayName}
          </Text>
        </View>
      )
    }else {
      return (
        <View style={styles.container}>
          <Text>
            Please Login
          </Text>
        </View>
      )

    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
