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
          this.props.delete(this.props.maraude);
          Alert.alert("Maraude Supprimer");
        }}
      >
        <Text>{this.props.maraude.notes}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    alignItems: "center",
    width: 200,
    height: 100,
    justifyContent: "space-around",
    borderRadius: 15,
    margin: 20,
  },
  inputText: {
    color: "white",
    paddingLeft: 30,
    width: "100%",
  },
});
