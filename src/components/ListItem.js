import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  constructor(props){
    super(props)
    console.log(props);
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li, {backgroundColor: this.props.item.status.is_used ? 'red' : 'green' }}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
