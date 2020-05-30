import * as React from 'react';
import {ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Container, Content, Header, Title, Body} from 'native-base';
import {
  commonBackground,
  commonBlue,
  statusbarColor,
} from './../styles/commonColors';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
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
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
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

export default Login;
