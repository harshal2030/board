import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import Profile from './Profile';

const Drawer = createDrawerNavigator();

const MainScreen = () => {
  return (
    <Drawer.Navigator drawerType="front">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MainScreen;
