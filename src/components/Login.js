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
import { Container, Content, Header, Title, Button, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'

const windowSize = Dimensions.get('window')


export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fetching: true
    };
  }

  _validateEmail(email){
    return /^\"?[\w-_\.]*\"?@raisin\.com$/.test(email);
  }

  _checkForUser = () => {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that._autoLogin(user)
        console.log(user)
        // User is signed in.
      } else {
        // No user is signed in.
        that._setupGoogleSignin();
      }
    });

  }

  _autoLogin = (user) => {
    this.props.navigator.immediatelyResetRouteStack([{name: 'MainTabs'}])
  }


  componentDidMount = () => {
    this._checkForUser();
  }

  render() {
    if (!this.state.user && this.state.fetching === false) {
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
    }else{
      return(
        <View style={styles.container}>
          <Image style={styles.bg} source={ require('./img/loginBG.png') } />
          <View style={styles.header}>
              <Image style={styles.mark} source={{uri: 'https://i.imgur.com/da4G0Io.png'}} />
          </View>
          <View style={styles.spinnerContainer}>
            <Spinner/>
          </View>
        </View>

      )
    }

    if (this.state.user) {
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
        iosClientId: '550445089526-0s34m3lq012n83lp1pqghvpfbsabgqb2.apps.googleusercontent.com',
        offlineAccess: false
      });
      this.setState({user: null, fetching: false})
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
    // User is signed in.
  }

  _signIn = () => {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user)
      if(this._validateEmail(user.email)){
        var credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        store.save('user', user);
        this.props.navigator.immediatelyResetRouteStack([{name: 'MainTabs'}])
      }else{
        this._signOut()
        AlertIOS.alert(
         'Unable to Login',
         'Only Raisin employees can login.'
        );
      }
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
  },
  spinnerContainer: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
