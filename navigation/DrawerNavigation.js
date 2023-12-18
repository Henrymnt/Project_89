import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import Logout from "../screens/LogOut";
import StackNavigator from "./StackNavigator";
import firebase from "firebase";
import CustomSideBarMenu from "../screens/CustomSideBarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      light_theme: true
    };
  }
  componentDidMount(){
    let theme;
    firebase
    .database()
    .ref('/users/'+firebase.auth().currentUser.uid)
    .on('value', snapshot => {
       theme = snapshot.val().theme;
       this.setState({
         light_theme: theme === "light"? true : false
       });
     });

  }
  render(){
  return (
    <Drawer.Navigator 
    drawerContentOptions={{
      activeTintColor: '#e91e63',
      inactiveTintColor: this.state.light_theme? 'black' : 'white',
      itemStyle: {marginVerticle: 5}
    }}
   DrawerStyle={{
      backgroundColor: this.state.light_theme? 'white' : 'black'
    }}
    drawerContent={(props)=><CustomSideBarMenu {...props}/>}>
      <Drawer.Screen name="Home" component={StackNavigator} options={{ unmountOnBlur: true }}/>
      <Drawer.Screen name="Profile" component={Profile} options={{ unmountOnBlur: true }}/>
      <Drawer.Screen name="Logout" component={Logout} options={{ unmountOnBlur: true }}/>
    </Drawer.Navigator>
  );
}
}
