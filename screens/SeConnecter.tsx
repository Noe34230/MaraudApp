import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface ConnexionState {
  login: string;
  mdp: string;
}
export class SeConnecter extends React.Component<
  { navigation: any },
  ConnexionState
> {
  state: ConnexionState = {
    login: "",
    mdp: "",
  };
  connexionUser = () => {
    signInWithEmailAndPassword(getAuth(), this.state.login, this.state.mdp)
      .then((userCredential) => {
        const user = userCredential.user;
        this.props.navigation.navigate("EcranCarte");
      })
      .catch((error) => {
        console.log("error");
        console.log(error.message);
        Alert.alert("Erreur", error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cadre}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCompleteType="email"
              autoCapitalize="none"
              placeholder="Email"
              style={styles.textinputcontent}
              onChangeText={(login: string) => this.setState({ login })}
              value={this.state.login}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCompleteType="password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Mot de passe"
              style={styles.textinputcontent}
              onChangeText={(mdp: string) => this.setState({ mdp })}
              value={this.state.mdp}
            />
          </View>
          <TouchableOpacity
            style={styles.bouton}
            onPress={() => {
              this.connexionUser();
            }}
          >
            <Text>Se Connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MdpOublie");
            }}
            style={styles.btnMdpOublie}
          >
            <Text style={styles.testStyle}>Mot de passe Oublie</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            this.props.navigation.navigate("Inscription");
          }}
        >
          <Text>Créer un Compte</Text>
        </TouchableOpacity>
      </View>
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
  bouton: {
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
  cadre: {
    height: 300,
    width: 300,
    padding: 15,
    backgroundColor: "orange",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "black",
  },
  testStyle: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  btnCreerCompte: {
    marginTop: 20,
  },
  textinputcontent: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },

  btnMdpOublie: {
    paddingBottom: 10,
  },
});
