import * as React from 'react';
import Signup from './screen/Signup';
import Login from './screen/Login';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    );
  }
}

export default App;
