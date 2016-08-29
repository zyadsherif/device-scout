/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Root from './src/containers/Root'

class QR extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('QR', () => QR);
