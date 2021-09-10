import React, { Component, TouchableOpacity } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { color } from "react-native-reanimated";

export default class Logout extends Component {

  logout = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity 
            style={styles.buttonS}  
            onPress={() => this.logout}
          >
              <Text style={styles.buttonT}>Logout</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#15193c"
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