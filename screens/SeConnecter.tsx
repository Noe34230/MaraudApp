import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SeConnecterProps } from "../navigation/app-stacks";

interface ConnexionState {
  login: string;
  mdp: string;
}
export class SeConnecter extends React.Component<
  SeConnecterProps,
  ConnexionState
> {
  state: ConnexionState = {
    login: "",
    mdp: "",
  };
  connexionUser = () => {
    //Fonction qui vérifie ke couple login et mot de passe dans Firebase
    signInWithEmailAndPassword(getAuth(), this.state.login, this.state.mdp)
      .then(() => {
        this.setState({ login: "", mdp: "" });
        Keyboard.dismiss;
        this.props.navigation.navigate("EcranCarte");
      })
      .catch((error) => {
        //Affiche une alerte différente suivant les erreurs renvoyés par Firebase
        console.log(error);
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          Alert.alert("Erreur", "Votre adresse mail est invalide");
        } else if (error.message == "Firebase: Error (auth/internal-error).") {
          Alert.alert(
            "Erreur",
            "Erreur dû à notre base de donnée, Veuillez reessayer"
          );
        } else if (error.message == "Firebase: Error (auth/user-not-found).") {
          Alert.alert(
            "Erreur",
            "Aucun utilisateur n'a de compte avec cette adresse mail"
          );
        } else if (error.message == "Firebase: Error (auth/wrong-password).") {
          Alert.alert("Erreur", "Le mot de passe est incorrect");
        } else Alert.alert("Erreur", error.message);
      });
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titre}> MARAUDAPP</Text>
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
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEA347",
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
    backgroundColor: "#FEA347",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "black",
    margin: 40,
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
  titre: {
    fontStyle: "italic",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    margin: 50,
  },
});
