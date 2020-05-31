import * as React from 'react';
import {
  Container,
  Header,
  Left,
  Title,
  Right,
  Body,
  Button,
  Icon,
} from 'native-base';
import {
  statusbarColor,
  commonBackground,
  commonBlue,
} from './../styles/commonColors';
import {connect} from 'react-redux';

class Profile extends React.Component {
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps)(Profile);
