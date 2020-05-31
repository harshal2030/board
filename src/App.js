import * as React from 'react';
import {ActivityIndicator} from 'react-native';
import Signup from './screen/Signup';
import Login from './screen/Login';
import Home from './screen/Home';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerToken from './actions/registerToken';
import {View} from 'native-base';
import {rootURL} from './urls.json';
import * as profileData from './actions/profileData';

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.check();
  }

  check = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      this.setState({loading: false});
      if (token !== null) {
        fetch(`${rootURL}/user/token`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
          .then((res) => {
            this.setState({loading: false});
            if (res.status !== 200) {
              throw new Error();
            }

            return res.json();
          })
          .then((resJson) => {
            this.props.actions.registerToken(token);
            this.props.actions.profileData(resJson);
          })
          .catch(() => {
            this.props.actions.registerToken(null);
            AsyncStorage.removeItem('token');
          });
      }
    } catch (e) {
      // no action
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <Stack.Navigator headerMode="none">
        {this.props.token === null ? (
          <>
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="home" component={Home} />
          </>
        )}
      </Stack.Navigator>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
