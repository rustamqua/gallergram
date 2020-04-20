import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export const NavigatorFooter = () => {
  const navigation = useNavigation()
    return (
        <Footer>
          <FooterTab>
            <Button onPress = {() => {
                navigation.navigate('Gallery')
            }}>
              <Icon name="beer" />
            </Button>
            <Button onPress = {() => {
              navigation.navigate('Standalone')
            }}>
              <Icon name="camera" />
            </Button>
            <Button onPress = {() => {
              navigation.navigate('Settings')
            }}>
              <Icon name="cog" />
            </Button>
          </FooterTab>
        </Footer>
    );
}