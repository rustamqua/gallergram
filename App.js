import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainGallery from "./components/MainGallery";
import Settings from "./components/Settings";
import store from "./store/index";
import { Provider } from "react-redux";
import Standalone from './components/Standalone';
import Post from './components/Post';
import SignIn from './components/SignIn';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const Stack = createStackNavigator();
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
            <Stack.Screen name="Gallery" component={MainGallery}></Stack.Screen>
            <Stack.Screen name="Standalone" component={Standalone} />
            <Stack.Screen name="Post" component={Post}></Stack.Screen>
            <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}


