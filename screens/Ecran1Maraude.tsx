import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/app-stacks";
import { RouteProp } from "@react-navigation/native";

export interface Ecran1MaraudeProps {
  navigation: StackNavigationProp<RootStackParamList, "Ecran1Maraude">;
  routes: RouteProp<RootStackParamList, "Ecran1Maraude">;
}

export class Ecran1Maraude extends React.Component<Ecran1MaraudeProps, {}> {
  recupereInfos = () => {
    const maraude = this.props.routes.params.maraude;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bouton}>
          <Text>{this.props.routes.params.maraude.notes}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  bouton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 20,
  },
});
