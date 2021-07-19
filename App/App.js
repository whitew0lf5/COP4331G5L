import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen';
import CardScreen from './screens/SetsScreen';

export default class App extends React.Component 
{  
  render()
  {    
    return <AppContainer />;  
  }
}

const AppNavigator = createStackNavigator(
  {  Login: {    screen: LoginScreen  },  
  Card: {    screen: CardScreen  }
  },
  {  initialRouteName: "Login"});

  const AppContainer = createAppContainer(AppNavigator);
  
  const styles = StyleSheet.create(
    {  container: {    flex: 1,    backgroundColor: '#fff',    alignItems: 'center',    justifyContent: 'center',  },});
