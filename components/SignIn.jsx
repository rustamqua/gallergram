import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Segment,
} from "native-base";
import Firebase from  '../config/Firebase'
import {connect} from 'react-redux';
import {changeInfo} from '../actions/index'
class SignIn extends Component {
  state = {
    signUp: true,
    signIn: false,
    userName: "",
    email: "",
    password: "",
  };
  handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() =>
        this.props.changeInfo({
          userPhoto:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1200px-Anonymous.svg.png",
          userName: this.state.email,
          userInfo: "",
        })
      )
      .then(() => this.props.navigation.navigate("Gallery"))
      .catch((error) => console.log(error));
  };
  handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() =>
        this.props.changeInfo({
          userPhoto:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1200px-Anonymous.svg.png",
          userName: this.state.email,
          userInfo: "",
        })
      )
      .then(() => this.props.navigation.navigate("Gallery"))
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Content>
          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 200,
            }}
          >
            <Item>
              <Label>Email</Label>
              <Input
                onChangeText={(e) => {
                  this.setState({ email: e });
                }}
              />
            </Item>
            <Item>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(e) => {
                  this.setState({ password: e });
                }}
              />
            </Item>
            <Button
              style={{
                width: 100,
                display: "flex",
                justifyContent: "center",
                margin: 10,
              }}
              rounded
              onPress={() => {
               if(this.state.signUp){
                   this.handleSignUp()
                   return;
               }
               this.handleLogin()
              }}
            >
              <Text>{this.state.signUp ? "Sign Up" : "Sign In"}</Text>
            </Button>
            <Segment>
              <Button
                first
                onPress={() => this.setState({ signUp: true, signIn: false })}
              >
                <Text>Sign Up</Text>
              </Button>
              <Button
                onPress={() => this.setState({ signUp: false, signIn: true })}
              >
                <Text>Sign In</Text>
              </Button>
            </Segment>
          </Form>
        </Content>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return{
        changeInfo: (info) => dispatch(changeInfo(info)) 
    }
}
export default connect(null, mapDispatchToProps)(SignIn)