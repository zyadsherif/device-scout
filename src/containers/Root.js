'use strict';
import React from 'react';
import {View, Text} from 'react-native';

import Login from '../components/Login';
import MainTabs from '../components/MainTabs';

const ROUTES = {
  'Login': Login,
  'MainTabs': MainTabs
}

export default class Root extends React.Component{

  render() {
    return (
      // <Navigator
      //   initialRoute={{ title: 'Awesome Scene', index: 0 }}
      //   renderScene={(route, navigator) =>
      //     <Text>Hello {route.title}!</Text>
      //   }
      //   style={{padding: 100}}
      // />
      <View>
        <Text>
          Hello from root
        </Text>
      </View>
    );
  }

}
