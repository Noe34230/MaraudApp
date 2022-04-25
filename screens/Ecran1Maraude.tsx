import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Ecran1MaraudeProps,
  RootStackParamList,
} from "../navigation/app-stacks";
import { RouteProp } from "@react-navigation/native";
import { Header } from "../components/Header";
import MapView, { Marker } from "react-native-maps";

export class Ecran1Maraude extends React.Component<Ecran1MaraudeProps, {}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pageConatiner}>
          <MapView
            style={styles.map}
            region={this.props.route.params.maraude.adresse}
          >
            <Marker
              coordinate={{
                latitude: this.props.route.params.maraude.adresse.latitude,
                longitude: this.props.route.params.maraude.adresse.longitude,
              }}
            />
          </MapView>
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>
              {this.props.route.params.maraude.notes}
            </Text>
          </View>
          <View style={styles.dateStyle}>
            <Text>
              {this.props.route.params.maraude.date.toDate().toDateString()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },

  pageConatiner: { flex: 1, justifyContent: "center", alignItems: "center" },

  notesContainer: {
    borderBottomColor: "#000",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 250,
    height: 250,
    marginBottom: 20,
    padding: 7,
    flexShrink: 1,
  },
  notesText: {
    height: 45,
    borderRadius: 30,
    width: 250,
    flexGrow: 1,
  },
  dateStyle: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 20,
    height: 40,
  },
  map: {
    width: 300,
    height: 250,
    margin: 20,
    borderRadius: 80,
    borderWidth: 1,
  },
  bouton: {
    width: 200,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEA347",
    top: "85%",
    margin: 20,
    position: "absolute",
    alignSelf: "center", //for align to right
  },
});
