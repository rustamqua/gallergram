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
  Text
} from "native-base";
import { NavigatorFooter } from "./NavigatorFooter";
import * as ImagePicker from 'expo-image-picker';
import {connect} from 'react-redux'
import {changeInfo} from '../actions/index'

class Settings extends Component {
  state = {
    image:
    this.props.userPhoto,
    name: this.props.userName,
    info: this.props.userInfo
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <Container>
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
              <Label>Username</Label>
              <Input
                value={this.state.name}
                onChangeText={(e) => {
                  this.setState({ name: e });
                }}
              />
            </Item>
            <Item floatingLabel last>
              <Label>About me</Label>
              <Input value={this.state.info} onChangeText={(e) => {
                this.setState({info: e})
              }}/>
            </Item>
            <Button style={{ margin: 20 }} onPress={this._pickImage}>
              <Text>Change Photo</Text>
            </Button>
            <Button
              style={{ margin: 20 }}
              onPress={() => this.props.saveChanges({
                userPhoto: this.state.image,
                userName: this.state.name,
                userInfo: this.state.info,
              })}
            >
              <Text>Save Changes</Text>
            </Button>
          </Form>
        </Content>
        <NavigatorFooter></NavigatorFooter>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userPhoto: state.userPhoto,
    userInfo: state.userInfo,
  };
}; 
const mapDispatchToProps = (dispatch) => {
  return {
    saveChanges: (info) => dispatch(changeInfo(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);