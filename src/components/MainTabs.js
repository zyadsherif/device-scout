'use strict';
import React from 'react';
import {View, Text, TabBarIOS, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeTab from './HomeTab'
import RegisterTab from './RegisterTab'
import ProfileTab from './ProfileTab'

export default class MainTabs extends React.Component{

  constructor(props){
    super(props)

    this.state = {selectedTab: 'homeTab'}
  }

  changeTab(){
    this.setState({selectedTab: 'homeTab'})
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="#50d2c2"
        unselectedTintColor="#2e7970"
        barTintColor="white">
        <Icon.TabBarItem
          title="Home"
          iconName="home"
          color={'#2e7970'}
          selected={this.state.selectedTab === 'homeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'homeTab',
            });
          }}
          >
          <HomeTab />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Register"
          iconName="camera"
          selected={this.state.selectedTab === 'registerTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'registerTab',
            });
          }}
          >
          <RegisterTab changeTab={this.changeTab} />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Profile"
          iconName="face"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
            });
          }}
          >
          <ProfileTab />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

}

const styles = StyleSheet.create({
  tabContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbarIcon:{
    color: '#2e7970'
  }
})
