import * as React from 'react';
import {ActivityIndicator, StyleSheet, Alert} from 'react-native';
import {Header, Body, Container, Title, Content} from 'native-base';
import {
  commonBackground,
  commonBlue,
  statusbarColor,
} from './../styles/commonColors';
import {TextInput, Button, Text} from 'react-native-paper';
import validator from 'validator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerToken from './../actions/registerToken';
import * as profileData from '../actions/profileData';
import {signupURL} from './../urls.json';
import AsyncStorage from '@react-native-community/async-storage';

class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    mailError: false,
    password: '',
    loading: false,
    token: '',
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem('token', this.state.token);
    } catch (e) {
      // no action
    }
  };

  uploadData = () => {
    const {name, username, email, password} = this.state;
    this.setState({loading: true}, () => {
      fetch(signupURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      })
        .then((res) => {
          this.setState({loading: false});
          console.log(res.status);
          if (res.status !== 200) {
            throw new Error();
          }

          return res.json();
        })
        .then((resJson) => {
          this.props.actions.registerToken(resJson.token);
          this.props.actions.profileData(resJson.user);
          this.setState({token: resJson.token}, () => this.storeData());
        })
        .catch(() =>
          Alert.alert(
            'Error',
            'Unable to create account for now. Try again later',
          ),
        );
    });
  };

  updateButton = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button
        onPress={this.uploadData}
        mode="contained"
        style={{backgroundColor: commonBlue, marginTop: 20, borderColor: 8}}>
        Create Account
      </Button>
    );
  };

  checkMail = (email) => {
    this.setState({email});
    if (email.length > 6) {
      if (!validator.isEmail(email)) {
        this.setState({mailError: true});
      } else {
        this.setState({mailError: false});
      }
    }
  };

  showError = (errorRef, msg) => {
    if (errorRef) {
      return <Text style={styles.errorText}>{msg}</Text>;
    } else {
      return null;
    }
  };

  render() {
    return (
      <Container style={{backgroundColor: commonBackground}}>
        <Header
          androidStatusBarColor={statusbarColor}
          style={{backgroundColor: commonBlue}}>
          <Body>
            <Title style={{color: '#fff'}}>Signup</Title>
          </Body>
        </Header>
        <Content padder>
          <TextInput
            label="Name"
            maxLength={100}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            mode="outlined"
            theme={{
              roundness: 8,
              colors: {
                primary: commonBlue,
              },
            }}
          />
          <TextInput
            label="Username"
            maxLength={100}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            mode="outlined"
            theme={{
              roundness: 8,
              colors: {
                primary: commonBlue,
              },
            }}
          />
          <TextInput
            label="Email"
            maxLength={100}
            error={this.state.mailError}
            value={this.state.email}
            onChangeText={this.checkMail}
            mode="outlined"
            theme={{
              roundness: 8,
              colors: {
                primary: commonBlue,
              },
            }}
          />
          {this.showError(this.state.mailError, 'Invalid Email address')}
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

          <Button
            compact={true}
            onPress={() => this.props.navigation.navigate('login')}>
            Already have an account? Log In
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    color: '#B00020',
  },
});

const ActionCreators = Object.assign({}, registerToken, profileData);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
