import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false,
            speakerColor: "gray",
            speakerIcon: "volume-high-outline",
            light_theme: true,
            likes: this.props.route.params.post.post.likes,
            is_liked: false
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
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

      async initiateTTS(poster, mobile, adress, description) {
        const current_color = this.state.speakerColor;
        this.setState({
          speakerColor: current_color === "gray" ? "#ee8249" : "gray"
        });
        if (current_color === "gray") {
          Speech.speak(`${poster} created on ${created_on}`);
          Speech.speak(description);
          Speech.speak("The adress is");
          Speech.speak(adress);
          Speech.speak("The phone Number is");
          Speech.speak(mobile)
        } else {
          Speech.stop();
        }
      }

      likeAction = () => {
        console.log("here");
        if (this.state.is_liked) {
          firebase
            .database()
            .ref("posts")
            .child(this.props.route.params.post_id)
            .child("likes")
            .set(firebase.database.ServerValue.increment(-1));
          this.setState({ likes: (this.state.likes -= 1), is_liked: false });
        } else {
          firebase
            .database()
            .ref("posts")
            .child(this.props.route.params.post_id)
            .child("likes")
            .set(firebase.database.ServerValue.increment(1));
          this.setState({ likes: (this.state.likes += 1), is_liked: true });
        }
      };

      render(){
          if(!this.props.route.params){
              this.props.navigation.navigate("Home");
          }else if(!this.state.fontsLoaded){
              return <AppLoading />
          }else{
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
                      <Text style={styles.appTitleText}>Street Dogs</Text>
                    </View>
                  </View>
                  <View style={styles.postContainer}>
                    <ScrollView style={styles.postCard}>
                      <Image
                        source={require("../assets/post_image_1.png")}
                        style={styles.image}
                      ></Image>
        
                      <View style={styles.dataContainer}>
                        <View style={styles.titleTextContainer}>
                          <Text style={styles.postTitleText}>
                            {this.props.route.params.post.poster}
                          </Text>
                          <Text style={styles.postAuthorText}>
                            {this.props.route.params.post.created_on}
                          </Text>
                          <Text style={styles.postAuthorText}>
                            {this.props.route.params.post.description}
                          </Text>
                          <Text style={styles.postAuthorText}>
                            {this.props.route.params.post.adress}
                          </Text>
                        </View>
                        <View style={styles.iconContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.initiateTTS(
                                this.props.route.params.post.poster,
                                this.props.route.params.post.created_on,
                                this.props.route.params.post.description,
                                this.props.route.params.post.adress,
                                this.props.route.params.post.mobile
                              )
                            }
                          >
                            <Ionicons
                              name={this.state.speakerIcon}
                              size={RFValue(30)}
                              color={this.state.speakerColor}
                              style={{ margin: RFValue(15) }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.postTextContainer}>
                        <Text style={styles.postText}>
                          {this.props.route.params.post.description}
                        </Text>
                        <Text style={styles.moralText}>
                          Mobile - {this.props.route.params.post.mobile}
                        </Text>
                              </View>
                              <View style={styles.actionContainer}>
                        <TouchableOpacity
                          style={
                            this.state.is_liked
                              ? styles.likeButtonLiked
                              : styles.likeButtonDisliked
                          }
                          onPress={() => this.likeAction()}
                        >
                          <Ionicons
                            name={"heart"}
                            size={RFValue(30)}
                            color={"white"}
                          />

                          <Text
                            style={
                                styles.likeText
                            }
                          >
                            {this.state.likes}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
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
    postContainer: {
      flex: 1
    },
    postCard: {
      margin: RFValue(20),
      backgroundColor: "#2f345d",
      borderRadius: RFValue(20)
    },
    image: {
      width: "100%",
      alignSelf: "center",
      height: RFValue(200),
      borderTopLeftRadius: RFValue(20),
      borderTopRightRadius: RFValue(20),
      resizeMode: "contain"
    },
    dataContainer: {
      flexDirection: "row",
      padding: RFValue(20)
    },
    titleTextContainer: {
      flex: 0.8
    },
    postTitleText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      color: "white"
    },
    postAuthorText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(18),
      color: "white"
    },
    iconContainer: {
      flex: 0.2
    },
    postTextContainer: {
      padding: RFValue(20)
    },
    postText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(15),
      color: "white"
    },
    moralText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(20),
      color: "white"
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: RFValue(10)
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      flexDirection: "row",
      backgroundColor: "#eb3948",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(30)
    },
    likeText: {
      color: "white",
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    },
    likeButtonLiked: {
      flexDirection: "row",
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eb3948",
      borderRadius: RFValue(30)
    },
    likeButtonDisliked: {
      flexDirection: "row",
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#eb3948",
      borderRadius: RFValue(30),
      borderWidth: 2
    },
  });