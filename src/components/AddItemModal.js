'use strict';
import React from 'react';

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Header, Button, Icon, List, ListItem, InputGroup, Input, Title} from 'native-base';
import Camera from 'react-native-camera';

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
      .then( (data) => {
        console.log(data);
        this.setState({...this.state, item:{ image: data } })
      })
      .catch(err => console.error(err));
  }

  _submitItem = () => {

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
                <Input placeholder='Name' value={this.state.item.name} />
              </InputGroup>
            </ListItem>
          </List>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}>
              <Button primary large onPress={this.takePicture} style={styles.cameraCapture}>
                <Icon name="ios-camera"></Icon>
              </Button>
            </Camera>
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
  submit: {
    flex: .5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
