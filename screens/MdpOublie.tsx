import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { MdpOublieProps } from "../navigation/app-stacks";
import { useNavigation } from "@react-navigation/native";

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
      <View style={styles.container}>
        <View style={styles.cadre}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCompleteType="email"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="identifiant"
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
              placeholder="Nouveau mot de passe"
              style={styles.textinputcontent}
              onChangeText={(mdp: string) => this.setState({ mdp })}
              value={this.state.mdp}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCompleteType="password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Confirmer nouveau mot de passe"
              style={styles.textinputcontent}
              onChangeText={(confirmMdp: string) =>
                this.setState({ confirmMdp })
              }
              value={this.state.confirmMdp}
            />
          </View>
          <TouchableOpacity
            style={styles.bouton}
            onPress={() => {
              this.props.navigation.navigate("Inscription");
            }}
          >
            <Text>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "orange",
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
  textinputcontent: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },
});
