import * as React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {Header, Body, Container, Title, Content} from 'native-base';
import {
  commonBackground,
  commonBlue,
  statusbarColor,
} from './../styles/commonColors';
import {TextInput, Button} from 'react-native-paper';
import validator from 'validator';

class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    mailError: false,
    password: '',
    loading: false,
  };

  updateButton = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button
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
      return <Text>{msg}</Text>;
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

export default Signup;
