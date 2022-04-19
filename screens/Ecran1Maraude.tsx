import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/app-stacks";
import { RouteProp } from "@react-navigation/native";
import { Header } from "../components/Header";
import MapView, { Marker } from "react-native-maps";

export interface Ecran1MaraudeProps {
  navigation: StackNavigationProp<RootStackParamList, "Ecran1Maraude">;
  route: RouteProp<RootStackParamList, "Ecran1Maraude">;
}

export class Ecran1Maraude extends React.Component<Ecran1MaraudeProps, {}> {
  recupereInfos = () => {
    const maraude = this.props.route.params.maraude;
  };

  componentDidMount() {
    this.props.route;
    debugger;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
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
    flexDirection: "row",
  },
  notesText: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },
  dateStyle: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 20,
  },
  map: {
    width: 300,
    height: 250,
    margin: 20,
    borderRadius: 80,
  },
  bouton: {
    width: 200,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    top: "85%",
    margin: 20,
    position: "absolute",
    alignSelf: "center", //for align to right
  },
});
