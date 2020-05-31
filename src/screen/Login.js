import * as React from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Container, Content, Header, Title, Body} from 'native-base';
import {
  commonBackground,
  commonBlue,
  statusbarColor,
} from './../styles/commonColors';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as profileData from '../actions/profileData';
import * as registerToken from '../actions/registerToken';
import {loginURL} from './../urls.json';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {
  state = {
    user: '',
    password: '',
    token: '',
  };

  storeToken = async () => {
    try {
      await AsyncStorage.setItem('token', this.state.token);
    } catch (e) {
      // no acrion
    }
  };

  uploadData = () => {
    const {user, password} = this.state;
    this.setState({loading: true}, () => {
      fetch(loginURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          password,
        }),
      })
        .then((res) => {
          this.setState({loading: false});
          if (res.status !== 200) {
            throw new Error();
          }

          return res.json();
        })
        .then((resJson) => {
          this.props.actions.registerToken(resJson.token);
          this.props.actions.profileData(resJson.user);
          this.setState({token: resJson.token}, () => this.storeToken);
        })
        .catch(() =>
          Alert.alert('Error', 'Unable to Log in for now. Try again later'),
        );
    });
  };

  updateButton = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button
        mode="contained"
        style={{backgroundColor: commonBlue, marginTop: 20, borderColor: 8}}>
        Log In
      </Button>
    );
  };

  render() {
    return (
      <Container style={{backgroundColor: commonBackground}}>
        <Header
          style={{backgroundColor: commonBlue}}
          androidStatusBarColor={statusbarColor}>
          <Body>
            <Title style={{color: '#fff'}}>Log In</Title>
          </Body>
        </Header>
        <Content padder>
          <TextInput
            label="Email"
            maxLength={100}
            value={this.state.user}
            onChangeText={(user) => this.setState({user})}
            mode="outlined"
            theme={{
              roundness: 8,
              colors: {
                primary: commonBlue,
              },
            }}
          />
          <TextInput
            label="Password"
            maxLength={100}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            mode="outlined"
            secureTextEntry={true}
            theme={{
              roundness: 8,
              colors: {
                primary: commonBlue,
              },
            }}
          />
          {this.updateButton()}
          <Button compact={true} onPress={() => this.props.navigation.goBack()}>
            New User? Create Account
          </Button>
        </Content>
      </Container>
    );
  }
}

const ActionCreators = Object.assign({}, registerToken, profileData);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
