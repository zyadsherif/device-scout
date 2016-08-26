'use strict';
import React from 'react';
import {View, Text, Navigator} from 'react-native';
import firebase from 'firebase'
import config from '../../config.js'

import Login from '../components/Login';
import MainTabs from '../components/MainTabs';

const ROUTES = {
  'Login': Login,
  'MainTabs': MainTabs
}

export default class Root extends React.Component{

  constructor(props){
    super(props)
    console.log(config);
    firebase.initializeApp(config);
  }

  _renderScene = (route, navigator) => {
    var Component = ROUTES[route.name];
    return (
      <Component {...route.props} {...this.props} navigator={navigator} route={route} />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: "MainTabs",
          type: "right"
        }}
        renderScene={this._renderScene}
      />
    );
  }

}
