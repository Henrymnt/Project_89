import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import TabNavigator from "./navigation/TabNavigator";
import firebase from "firebase";
import { firebaseConfig } from "./config";
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}

const Stack=createStackNavigator()

const StackNav=()=>{
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>
      <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
      <Stack.Screen name='Dashboard' component={DrawerNavigator}/>

    </Stack.Navigator>)
    }
    export default function App(){
      return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
