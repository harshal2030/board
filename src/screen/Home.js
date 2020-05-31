import * as React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Container,
  Button,
  Icon,
  Content,
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
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" style={{color: commonBlue}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#000'}}>Home</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('board')}>
              <Icon name="add" style={{color: commonBlue}} />
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1, alignItems: 'center', marginTop: 15}}>
          <View style={styles.board}>
            <Title style={{marginLeft: 8, marginBottom: 10}}>
              MasseyHacks Post
            </Title>
          </View>
          <View style={styles.board}>
            <Title style={{marginLeft: 8, marginBottom: 10}}>
              MasseyHacks Help
            </Title>
          </View>
          <View style={styles.board}>
            <Title style={{marginLeft: 8, marginBottom: 10}}>
              MasseyHacks General
            </Title>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    height: 150,
    width: Dimensions.get('window').width - 10,
    backgroundColor: commonBlue,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default Home;
