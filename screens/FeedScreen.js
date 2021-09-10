import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize"
import PostCard from "./PostCard.js"

import AppLoading from "expo-app-loading";
import * as Font from "expo-font"
import { FlatList  } from 'react-native-gesture-handler';
import firebase from 'firebase';

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

let posts = require("./temp_posts.json");

export default class FeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            posts : []
        };
    }

    async _loadFontsAsync(){
      await Font.loadAsync(customFonts)
      this.setState({ fontsLoaded: true });
  }

  componentDidMount(){
      this._loadFontsAsync();
      this.fetchUser();
      this.fetchPosts();
  }

    fetchPosts = () => {
      firebase
        .database()
        .ref("/posts/")
        .on(
          "value",
          snapshot => {
            let posts = [];
            if (snapshot.val()) {
              Object.keys(snapshot.val()).forEach(function (key) {
                posts.push({
                  key: key,
                  value: snapshot.val()[key]
                });
              });
            }
            this.setState({ posts: posts });
            this.props.setUpdateToFalse();
          },
          function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
    };

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

    renderItem = ({item: post}) => {
        return <PostCard post={post} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString();

    render() {
        if(!this.state.fontsLoaded){
            return <AppLoading />
        } else {
          return (
            <View style={styles.container}>
              <SafeAreaView style={styles.droidSafeArea} />
              <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={styles.iconImage}
                  ></Image>
                </View>
                <View style={styles.appTitleTextContainer}>
                  <Text style={styles.appTitleText}>Street dogs</Text>
                </View>
                {!this.state.posts[0] ? (
            <View style={styles.nopost}>
              <Text
                style={
                    styles.nopostText
                }
              >
                No Posts Available
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.posts}
                renderItem={this.renderItem}
              />
            </View>
          )}
              </View>
              <View style={{ flex: 0.08 }} />
            </View>
          );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
      flex: 0.93
    },
    nopost: {
      flex: 0.85,
      justifyContent: "center",
      alignItems: "center"
    },
    nopostText: {
      fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans"
    },
  });