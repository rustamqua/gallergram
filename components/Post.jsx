import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import store from '../store/index'

class Post extends Component {
    findInStore = (id) => {
        store.getState().posts.filter(e => e.id===id)
    }
    render() {
        return (
            <Container>
            <Header />
            <Content>
              <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: 'Image URL'}} />
                    <Body>
                      <Text>NativeBase</Text>
                      <Text note>April 15, 2016</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                    <Text>
                      //Your text here
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>1,926 stars</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
            </Content>
          </Container>
        )
    }
}
const findInStore = (id) => {
}
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {};
export default Post;