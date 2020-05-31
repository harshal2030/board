import * as React from 'react';
import {View, Text} from 'react-native';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Container,
  Button,
  Icon,
} from 'native-base';
import {
  commonBackground,
  commonBlue,
  statusbarColor,
} from './../styles/commonColors';

class Home extends React.Component {
  render() {
    return (
      <Container style={{backgroundColor: commonBackground}}>
        <Header
          style={{backgroundColor: '#fff'}}
          androidStatusBarColor={statusbarColor}>
          <Left>
            <Button transparent>
              <Icon name="menu" style={{color: commonBlue}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#000'}}>Home</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="add" style={{color: commonBlue}} />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}

export default Home;
