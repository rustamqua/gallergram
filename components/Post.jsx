import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import {addComment} from '../actions/index'
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Input,
  Item,
} from "native-base";
import store from "../store/index";
import { Dimensions } from "react-native";

class Post extends Component {
  state = {
    commentData: "",
  };
  findInStore = (id) => this.props.posts.filter((e) => e.id === id);
  render() {
    return (
      <Container>
        <ScrollView>
          <Content>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{ uri: store.getState().userPhoto }} />
                  <Body>
                    <Text>
                      {this.findInStore(this.props.route.params.id)[0].title}
                    </Text>
                    <Text note>
                      {this.findInStore(this.props.route.params.id)[0].location}
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Image
                    source={{
                      uri: this.findInStore(this.props.route.params.id)[0]
                        .image,
                    }}
                    style={{
                      height: 400,
                      width: Dimensions.get("window").width,
                      flex: 1,
                    }}
                  />
                  <Text style={{ margin: 20 }}>
                    {
                      this.findInStore(this.props.route.params.id)[0]
                        .description
                    }
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{ color: "#87838B" }}>
                    <Icon name="heart" />
                    <Text>12 likes</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
            <Item rounded>
              <Input
                placeholder="Write a comment"
                onChangeText={(e) => {
                  this.setState({ commentData: e });
                }}
              />
              <Button
                icon
                style={{ marginRight: 20 }}
                onPress={() => {
                  this.props.addComment(this.props.route.params.id, {
                    user: store.getState().userName,
                    comment: this.state.commentData,
                  });
                  console.log(store.getState());
                }}
              >
                <Icon name="send" />
              </Button>
            </Item>
          </Content>
          {this.findInStore(this.props.route.params.id)[0].comments.map((e) => (
            <Card>
              <CardItem header bordered>
                <Text>{e.user}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>{e.comment}</Text>
                </Body>
              </CardItem>
            </Card>
          ))}
        </ScrollView>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return { addComment: (id, data) => dispatch(addComment(id, data)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);