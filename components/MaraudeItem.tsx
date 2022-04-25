import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RootStackParamList } from "../navigation/app-stacks";
import { Maraude } from "../services/maraude.services";
export interface MaraudeItemComponentProps {
  navigation: StackNavigationProp<RootStackParamList, "MaraudeItemComponent">;
  maraude: Maraude;
  delete: (maraude: Maraude) => void;
}
export class MaraudeItemComponent extends React.Component<
  MaraudeItemComponentProps,
  {}
> {
  afficherChaine = () => {
    const str = this.props.maraude;
    return this.props.maraude.notes.substring(0, 30);
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("Ecran1Maraude", {
            maraude: this.props.maraude,
          });
        }}
        onLongPress={() => {
          Alert.alert("Supprimer", "Voulez-vous Supprimez cette maraude ?", [
            {
              text: "Cancel",

              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => this.props.delete(this.props.maraude),
            },
          ]);
        }}
      >
        <Text>{this.afficherChaine()}...</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEA347",
    alignItems: "center",
    width: 200,
    height: 100,
    justifyContent: "center",
    borderRadius: 15,
    margin: 20,
    padding: 5,
  },
  inputText: {
    color: "white",
    paddingLeft: 30,
    width: "100%",
  },
  supprBtn: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderRadius: 80,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    marginLeft: 20,
  },
});
