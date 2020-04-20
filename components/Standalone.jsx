import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Thumbnail,
  Button,
  Icon,
  Text
} from "native-base";
import { NavigatorFooter } from "./NavigatorFooter";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux"
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { addPost } from '../actions/index';
import store from '../store/index';

class Standalone extends Component {
  state = {
    image: "https://www.unixtutorial.org/images/homebrew-for-macos.png",
    title: "",
    description: "",
    showMap: false,
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    showChoosenLocation: false,
    shownLocation: {},
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  componentDidMount() {
    this._pickImage();
  }
  render() {
    let showMap = undefined;
    let showChoosenLocation = undefined;
    if (this.state.showChoosenLocation) {
      showChoosenLocation = (
        <View>
          <Text>{this.state.shownLocation[0].street}</Text>
          <Text>{this.state.shownLocation[0].city}</Text>
        </View>
      );
    }
    if (this.state.showMap) {
      showMap = (
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapStyle}
        >
          <Marker
            draggable
            coordinate={this.state.coordinate}
            onDragEnd={(e) =>
              this.setState({ coordinate: e.nativeEvent.coordinate })
            }
          />
          <Button
            full
            onPress={() => {
              Location.reverseGeocodeAsync(this.state.coordinate).then(
                (res) => {
                  this.setState({
                    shownLocation: res,
                    showMap: false,
                    showChoosenLocation: true,
                  });
                }
              );
            }}
          >
            <Text style={{ textAlign: "center" }}>Select location</Text>
          </Button>
        </MapView>
      );
    }
    return (
      <Container>
        {showMap}
        <Header />
        <Content>
          <Form style={{ alignItems: "center" }}>
            <Thumbnail
              style={{ margin: 20, width: 200, height: 200 }}
              large
              source={{
                uri: this.state.image,
              }}
            />
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={(e) => {
                  this.setState({ title: e });
                }}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Description</Label>
              <Input
                onChangeText={(e) => {
                  this.setState({ description: e });
                }}
              />
            </Item>
            <Button
              iconLeft
              light
              style={{ margin: 20 }}
              onPress={() => {
                this.setState({ showMap: true });
              }}
            >
              <Icon name="navigate" />
              <Text>Add Location</Text>
            </Button>

            <Button
              onPress={() => {
                this.props.addPost({
                  title: this.state.title,
                  description: this.state.description,
                  image: this.state.image,
                  comments: [],
                  id: store.getState().posts.length+1,
                  location: this.state.shownLocation[0]
                    ? this.state.shownLocation[0].street +
                      " " +
                      this.state.shownLocation[0].city
                    : "Almaty Kazakhstan",
                });
                console.log(store.getState())
              }}
            >
              <Text>Add to Gallery</Text>
            </Button>
            {showChoosenLocation}
          </Form>
        </Content>
        <NavigatorFooter></NavigatorFooter>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {posts: state.posts}
  }
const mapDispatchToProps = dispatch => {
  return {
    addPost: (post) => dispatch(addPost(post))
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
export default connect(mapStateToProps, mapDispatchToProps)(Standalone)