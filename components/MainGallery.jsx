import React, { Component } from "react";
import { Container, Button,Text } from "native-base";
import { ScrollView } from "react-native";
import SingleGallery from "./SingleGallery";
import { NavigatorFooter } from "./NavigatorFooter";
import { connect } from "react-redux";
import { addPost } from "../actions/index";

class MainGallery extends Component {
  render() {
    return (
      <Container>
        <ScrollView>
          {this.props.posts.map((post) => (
            <SingleGallery
              navigation={this.props.navigation}
              title={post.title}
              image={post.image}
              description={post.description}
              location={post.location}
              id={post.id}
            ></SingleGallery>
          ))}
        </ScrollView>
        <NavigatorFooter></NavigatorFooter>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainGallery);