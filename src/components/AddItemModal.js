'use strict';
import React from 'react';

import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Container, Content, Header, Button, Icon, List, ListItem, InputGroup, Input, Title} from 'native-base';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs'

export default class AddItemModal extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      item:{
        name: '',
        image: null,
        status:{
          is_used: false,
          user_id: false
        }
      }
    }
  }

  takePicture = () => {
    this.camera.capture()
      .then( ( data ) => {
        let base64Img = data.path;
        const currentState = Object.assign({}, this.state)

        RNFS.readFile( base64Img, 'base64' )
          .then( res => console.log(res) )
      });
    // this.camera.capture()
    //   .then( (data) => {
    //     var currentState = Object.assign({}, this.state)
    //     RNFS.readFile(data.path.substring(7), "base64")  //substring(7) -> to remove the file://
    //     .then(res => {
    //       console.log(res);
    //       currentState.item.image = res
    //       this.setState(currentState)
    //     })
    //   })
    //   .catch(err => console.error(err));
  }

  _submitItem = () => {

  }

  _updateName = (name) => {
    const newState = Object.assign({}, this.state)
    newState.item.name = name
    this.setState(newState)
    console.log(this.state);
  }

  _renderCamera () {
    if (this.state.item.image !== null) {
      return(
        <Image style={styles.itemImage} source={{uri: this.state.item.image}} />
      )
    } else {
      return(
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          target={Camera.constants.CaptureTarget.memory}>
          <Button primary large onPress={this.takePicture} style={styles.cameraCapture}>
            <Icon name="ios-camera"></Icon>
          </Button>
        </Camera>

      )
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Add new Item</Title>
          <Button transparent onPress={this.props.close}>
            <Icon name='ios-close' />
          </Button>
        </Header>

        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input onChangeText={(text) => this._updateName(text)} placeholder='Name' value={this.state.item.name} />
              </InputGroup>
            </ListItem>
          </List>
          <View style={styles.cameraContainer}>
            {this._renderCamera()}
          </View>
          <View style={styles.submit}>
            <Button large success block onPress={this._submitItem}>
              Submit
            </Button>
          </View>
        </Content>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraContainer: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 300,
    width: 300
  },
  cameraCapture: {
    flex: 0,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 40,
    padding: 10,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImage: {
    width: 300,
    height: 300
  },
  submit: {
    flex: .5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
