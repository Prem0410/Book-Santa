import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      userId: firebase.auth().currentUser.email,
      docId: "",
    };
  }
  getUserDetails = () => {
    db.collection("users")
      .where("Username", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.First_Name,
            lastName: data.Last_Name,
            phoneNumber: data.Mobile_No,
            address: data.Address,
            docId: doc.id,
          });
        });
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }
  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      First_Name: this.state.firstName,
      Last_Name: this.state.lastName,
      Mobile_No: this.state.phoneNumber,
      Address: this.state.address,
    });
    Alert.alert("Profile Updated Successfully");
  };
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Settings" navigation={this.props.navigation} />
        <View styel={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"First Name"}
            maxLength={10}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Last Name"}
            maxLength={10}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Phone Number"}
            keyboardType={"numeric"}
            maxLength={10}
            onChangeText={(text) => {
              this.setState({
                phoneNumber: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8BE85",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  button: {
    width: 200,
    height: 40,
    marginTop: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#000",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    fontSize: 20,
  },
});
