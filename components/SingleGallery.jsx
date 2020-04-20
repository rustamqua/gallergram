import React, { Component } from 'react'
import {Image,View, TouchableHighlight } from 'react-native'
import { Card, CardItem, Text, Left, Body, Icon, Thumbnail } from 'native-base';
import {connect} from "react-redux";


 class SingleGallery extends Component {
  state = {
    isLiked: false,
    comments: []
  }
  render() {
    let heartColor = '#DCDCDC'
    if (this.state.isLiked) {
      heartColor = '#ED4A6A'
    }
    return (
      <Card>
        <CardItem>
          <Left>
            <Body>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Thumbnail
                  small
                  style={{ marginRight: 10 }}
                  source={{
                    uri: this.props.thumb,
                  }}
                />
                <View style={{ width: 150 }}>
                  <Text>{this.props.title}</Text>
                  <Text note>{this.props.location}</Text>
                </View>
                <View style={{ marginLeft: 40 }}>
                  <Text style={{ textAlign: "right" }} note>
                    By: {this.props.userName}
                  </Text>
                </View>
              </View>
            </Body>
          </Left>
        </CardItem>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("Post", {id: this.props.id});
          }}
        >
          <CardItem cardBody>
            <Image
              style={{ height: 300, flex: 1 }}
              source={{ uri: this.props.image }}
            />
          </CardItem>
        </TouchableHighlight>
        <CardItem>
          <Icon
            name="heart"
            style={{ color: heartColor }}
            onPress={() => {
              this.setState({ isLiked: !this.state.isLiked });
            }}
          />
          <Text>{this.props.description}</Text>
        </CardItem>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    thumb: state.userPhoto,
    userName: state.userName,
  }
}
export default connect(mapStateToProps)(SingleGallery);