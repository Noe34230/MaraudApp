import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as React from "react";
import { authentication } from "../firebase/firebase-config";
import { CreerCompteProps } from "../navigation/app-stacks";
import { createUserWithEmailAndPassword } from "@firebase/auth";

interface CreerCompteState {
  mdp: string;
  mail: string;
}

export class Inscription extends React.Component<
  CreerCompteProps,
  CreerCompteState
> {
  state: CreerCompteState = {
    mdp: "",
    mail: "",
  };
  RegisterUser = () => {
    createUserWithEmailAndPassword(
      authentication,
      this.state.mail,
      this.state.mdp
    )
      .then(() => {
        this.props.navigation.replace("EcranCarte");
      })
      .catch((error) => {
        console.log("prout");
        console.log(error);
        Alert.alert("Erreur", error.message);
      });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.cadre}>
            <View style={styles.inputContainer}>
              <TextInput
                autoCompleteType="email"
                autoCapitalize="none"
                placeholder="Email"
                style={styles.textinputcontent}
                onChangeText={(mail) => this.setState({ mail })}
                value={this.state.mail}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                autoCompleteType="password"
                autoCapitalize="none"
                placeholder="Mot de passe"
                style={styles.textinputcontent}
                onChangeText={(mdp) => this.setState({ mdp })}
                value={this.state.mdp}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={this.RegisterUser}>
            <Text style={{ fontSize: 20 }}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cadre: {
    height: 375,
    width: 300,
    padding: 15,
    backgroundColor: "orange",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "black",
  },
  btn: {
    width: 200,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    borderWidth: 1,
  },
  inputContainer: {
    borderBottomColor: "#000",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textinputcontent: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },
});
