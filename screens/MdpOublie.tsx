import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableNativeFeedback,
} from "react-native";
import * as React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../firebase/firebase-config";

interface MdpOublieState {
  login: string;
  mdp: string;
  confirmMdp: string;
}
export class MdpOublie extends React.Component<
  { navigation: any },
  MdpOublieState
> {
  state: MdpOublieState = {
    login: "",
    mdp: "",
    confirmMdp: "",
  };
  render() {
    return (
      <TouchableNativeFeedback>
        <View style={styles.container}>
          <Text style={styles.titre}> MARAUDAPP</Text>
          <View style={styles.cadre}>
            <View style={styles.inputContainer}>
              <TextInput
                autoCompleteType="email"
                autoCapitalize="none"
                placeholder="identifiant"
                style={styles.textinputcontent}
                onChangeText={(login: string) => this.setState({ login })}
                value={this.state.login}
              />
            </View>

            <TouchableOpacity
              style={styles.bouton}
              onPress={() => {
                Alert.alert(
                  "Modification du mot de passe",
                  "Voulez-vous envoyer un lien de mofification de mot de passe par mail ?",
                  [
                    {
                      text: "Cancel",

                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () =>
                        sendPasswordResetEmail(authentication, this.state.login)
                          .then(() => {
                            Alert.alert(
                              "Réussi",
                              "Allez dans votre boîte mail pour modifier votre mot de passe"
                            );
                          })
                          .catch((error) => {
                            Alert.alert(
                              "Erreur",
                              "Le mail ne correspond à aucun compte"
                            );
                          }),
                    },
                  ]
                );
              }}
            >
              <Text>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    backgroundColor: "#FEA347",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
    height: 250,
    width: 300,
    padding: 15,
    backgroundColor: "#FEA347",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
  },
  textinputcontent: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },
  titre: {
    fontStyle: "italic",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    margin: 50,
  },
});
