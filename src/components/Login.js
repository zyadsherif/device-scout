'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
  Dimensions,
  Image
} from 'react-native';
import firebase from 'firebase'

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import store from 'react-native-simple-store';
import { Container, Content, Header, Title, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'

const windowSize = Dimensions.get('window')


export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  validateEmail(email){
    return /^\"?[\w-_\.]*\"?@raisin\.com$/.test(email);
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Image style={styles.bg} source={ require('./img/loginBG.png') } />
          <View style={styles.header}>
              <Image style={styles.mark} source={{uri: 'https://i.imgur.com/da4G0Io.png'}} />
          </View>
          <View style={styles.inputs}>
            <Button style={styles.gBtn} block onPress={this._signIn}>
              <View style={styles.gBtnView}>
                <Icon name="google" style={styles.gBtnIcon} >
                </Icon>
                <Text style={styles.gBtnText}>
                  Login with Google
                </Text>
              </View>
            </Button>
          </View>
        </View>
      );
    }

    if (this.state.user) {
      console.log(this.props.navigator);
      this.props.navigator.immediatelyResetRouteStack([{name: 'MainTabs'}])
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        iosClientId: '694966211472-0idjf1neetd98dv8oj7udffj84uns252.apps.googleusercontent.com',
        offlineAccess: false
      });

      // const user = await GoogleSignin.currentUserAsync();
      // console.log(user);
      // this.setState({user});
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    var that = this;
    console.log('Something');
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user)
      // if(that.validateEmail(user.email)){
      store.save('user', user);
      that.props.navigator.immediatelyResetRouteStack({name: 'MainTabs'})
      // }else{
      //   that._signOut()
      //   AlertIOS.alert(
      //    'Unable to Login',
      //    'Only Raisin employees can login.'
      //   );
      // }
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent'
  },
  mark: {
    width: 150,
    height: 150
  },
  inputs: {
    marginTop: 10,
    flex: .3,
    padding: 20
  },
  input: {
    flex: 1,
    fontSize: 14
  },
  gBtn:{
    backgroundColor: '#db3236',
    height: 60,
  },
  gBtnView:{
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gBtnIcon:{
    paddingLeft: 10,
    flex: 1,
    fontSize: 24,
    color: 'white',
    },
  gBtnText:{
    flex: 3,
    color: 'white',
    fontSize: 16
  }
});
