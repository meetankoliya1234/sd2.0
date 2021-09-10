import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Touchable,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "@react-navigation/native";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class RuleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
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
              <Text style={styles.appTitleText}>Street Dogs</Text>
            </View>
          </View>
          <View style={styles.container}>
              <TouchableOpacity 
              style={styles.buttonS}
                onPress={
                    source(uri="https://iditarod.com/ten-tips-for-taking-care-of-your-dog/")
                }                
            ><Text style={styles.buttonT}>How to take Care of your dog</Text></TouchableOpacity>
          </View>
          <View style={styles.container}>
              <TouchableOpacity 
              style={styles.buttonS}
                onPress={
                    source(uri="https://www.pedigreefoundation.org/10-tips-make-dogs-life-happy-healthy/")
                }                
            ><Text style={styles.buttonT}>How to make your dogs happy and fit</Text></TouchableOpacity>
          </View>
          <View style={styles.container}>
              <TouchableOpacity 
              style={styles.buttonS}
                onPress={
                    source(uri="https://www.pedigreefoundation.org/10-tips-make-dogs-life-happy-healthy/")
                }                
            ><Text style={styles.buttonT}>How to know how your dog is feeling</Text></TouchableOpacity>
          </View>
          <View style={styles.container}>
              <TouchableOpacity 
              style={styles.buttonS}
                onPress={
                    source(uri="https://www.pedigree.com/getting-a-new-dog/getting-an-adult-dog/10-best-training-tips#:~:text=Reward%20your%20puppy%20or%20dog's,it'll%20only%20confuse%20them.")
                }                
            ><Text style={styles.buttonT}>How to train your dog</Text></TouchableOpacity>
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
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontExtra: {
    marginTop: RFValue(10)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(2),
    color: "white",
    fontWeight: "bold" ,
    fontSize: 24
  },
  buttonS: {
      color:"red",
      borderWidth: 2,
      borderColor:"black",
      borderRadius: 5,
      margin: "20",
      padding: "20",
      alignItems: "center"
  },
  buttonT: {
      color: "white",
      alignSelf: "center",
      fontWeight: "bold"
  }
});