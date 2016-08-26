'use strict';
import React from 'react';
import {View, Text, ListView, StyleSheet, Dimensions} from 'react-native';
import firebase from 'firebase'
import Camera from 'react-native-camera';


export default class RegisterTab extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      camera_text: 'Scan the device you want to register',
      camera_text_color: '#ffffff'
    }

    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebase.database().ref();
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.barCodeDetected.bind(this)}>
          <Text style={styles.capture}>{this.state.camera_text}</Text>
        </Camera>

      </View>
    )
  }

  barCodeDetected(data) {
    console.log(data);
    var that = this

    var deviceItemRef = firebase.database().ref('items/' + data.data );

    deviceItemRef.on('value', function (snapshot) {
      const value = snapshot.val()
      if (value === null) {
        that.deviceFailureCallback()
      }else if(value.status.is_used === true) {
        that.deviceBusyCallback()
      }else{
        that.deviceExistsCallback(data.data, value)
      }
    })
  }

  deviceExistsCallback(id, value){
    firebase.database().ref('items/' + id ).set({ ...value,
      status: {
        is_used: true,
        user_id: firebase.auth().currentUser.uid
      }
    })
    this.setState({
      ...this.state,
      camera_text: 'Register another !',
      camera_text_color: 'orange'
    })
    AlertIOS.alert(
     'Awesome',
     'Device registered use it with care.'
    );

    this.props.changeTab();
  }

  deviceBusyCallback(){
    this.setState({
      ...this.state,
      camera_text: 'This device is already registered by another person !',
      camera_text_color: 'orange'
    })
  }

  deviceFailureCallback(){
    this.setState({
      ...this.state,
      camera_text: 'This Barcode is not correct !',
      camera_text_color: 'red'
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    fontSize: 20,
    flex: 0,
    color: '#ffffff',
    padding: 20,
    marginBottom: 80
  }
});
