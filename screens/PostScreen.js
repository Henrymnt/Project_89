import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostScreen extends Component {
constructor(props){
    super(props)
    this.setState={
      light_theme: false
    }
  } 
  
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
  
  componentDidMount() {
    this.fetchUser();
  }
  render(){
      return(
          <View style={{flex: 1}}>
                  <View style={this.state.light_theme?styles.cardContainerLight:styles.cardContainer}>
                      <View style={this.state.light_theme?styles.authorContainerLight: styles.authorContainer}>
                          <View style={styles.authorImageContainer}>
                              <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
                          </View>
                          <View style={styles.authorNameContainer}>
                              <Text style={this.state.light_theme?styles.authorNameTextLight:styles.authorNameText}>{this.props.post.author}</Text>
                          </View>
                      </View>
                      <Image source={require("../assets/post.jpeg")} style={styles.postImage}></Image>
                      <View style={styles.captionContainer}>
                          <Text styles={this.state.light_theme?styles.captionTextLight: styles.captionText}>{this.props.post.caption}</Text>
                      </View>
                      <View style={styles.actionContainer}>
                          <View style={styles.likeButton}>
                              <Ionicons name="heart" size={RFValue(30)} color="white"/>
                              <Text style={this.state.light_theme?styles.likeTextLight:styles.likeText}>7k</Text>
                          </View>
                      </View>
                  </View>
          </View>
      )
  }
  }
  
  const styles = StyleSheet.create({
      cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
      },
      cardContainerLight: {
        margin: RFValue(13),
        backgroundColor: "lightgray",
        borderRadius: RFValue(20)
      },
      authorContainer: {
          margin: RFValue(7),
          backgroundColor: "darkgray",
          borderRadius: RFValue(12)
      },
      authorContainerLight: {
          margin: RFValue(7),
          backgroundColor: "lightgray",
          borderRadius: RFValue(12)
      },
      authorImageContainer: {
          margin: RFValue(10),
          borderRadius: RFValue(12)
        },
      authorNameContainer: {
          margin: RFValue(5),
          borderRadius: RFValue(12)
        },
      captionNameContainer: {
          margin: RFValue(5),
          borderRadius: RFValue(12)
      },
      profileImage: {
          resizeMode: "contain",
          width: "90%",
          alignSelf: "center",
          height: RFValue(50)
      },
      postImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(300)
      },
      authorNameText: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "white"
      },
      authorNameTextLight: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "black"
      },
      captionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
      },
      captionTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "black",
        paddingTop: RFValue(10)
      },
      actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
      },
      likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      },
      likeTextLight: {
        color: "black",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      }
    });
    