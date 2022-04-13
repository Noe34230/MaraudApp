import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import * as React from "react";
import { EcranCarteProps } from "../navigation/app-stacks";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Localisation } from "../services/maraude.services";
import { Header } from "../components/Header";

interface CarteState {
  adresse: Localisation;
}

export class EcranCarte extends React.Component<EcranCarteProps, CarteState> {
  state: CarteState = {
    adresse: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  avoirAutorisation = () => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {})
      .catch((er) => {
        console.log(er);
        if (status !== "granted") {
          Alert.alert("accès a la carte refusé", "batard");
        }
      });
  };

  componentDidMount() {
    Location.getCurrentPositionAsync()
      .then((localisation) => {
        console.log("Localisation récupérée carte");
        let latitude = localisation.coords.latitude;
        let longitude = localisation.coords.longitude;
        let latitudeDelta = 0.0922;
        let longitudeDelta = 0.0421;
        this.setState({
          adresse: { latitude, longitude, latitudeDelta, longitudeDelta },
        });
      })
      .catch((er) => {
        console.log("azudiuaz");
        console.log(er);
      });
    console.log("Status");
    this.avoirAutorisation();
  }

  onRegionChange(adresse: Localisation) {
    this.setState({ adresse });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <MapView
          style={styles.map}
          region={this.state.adresse}
          onRegionChange={() => this.onRegionChange}
        />
          <TouchableOpacity
          style={styles.bouton}
            onPress={() => {
              this.props.navigation.navigate("CreerUneMaraude");
            }}
          >
            <Text>+ Maraude</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});