import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import * as React from "react";
import { EcranCarteProps } from "../navigation/app-stacks";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Localisation } from "../services/maraude.services";

interface CarteState {
  adresse: Localisation;
}

export class EcranCarte extends React.Component<EcranCarteProps, CarteState> {
  state: CarteState = {
    adresse: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
  };
  avoirAutorisation = () => {
    //On récupère l'autorisation du mobile pour la position de l'utilisateur
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {})
      .catch((er) => {
        console.log(er);
        if (status !== "granted") {
          Alert.alert("accès à la carte refusé");
        }
      });
  };

  componentDidMount() {
    this.avoirAutorisation();
    Location.getCurrentPositionAsync() //Cette fonction retourne une promesse de la position
      .then((localisation) => {
        console.log("Localisation récupérée carte");
        let latitude = localisation.coords.latitude; //la variable localisation indique la position de l'utilisateur
        let longitude = localisation.coords.longitude;
        let latitudeDelta = 0.01;
        let longitudeDelta = 0.01;
        this.setState({
          adresse: { latitude, longitude, latitudeDelta, longitudeDelta },
        });
      })
      .catch((er) => {
        Alert.alert("Erreur", "La carte ne parvient pas à charger... :(");
      });
  }

  renderElement() { //Si la carte n'a pas encore chargée on affiche une roue de chargement 
    if (this.state.adresse.latitude != 0 || this.state.adresse.longitude != 0)
      return (
        <MapView style={styles.map} region={this.state.adresse}>
          <Marker
            coordinate={{
              latitude: this.state.adresse.latitude,
              longitude: this.state.adresse.longitude,
            }}
            title={"Vous êtes ici"}
          >
            <Image
              source={require("../assets/humain.png")}
              style={{ height: 50, width: 50 }}
            />
          </Marker>
        </MapView>
      );
    else
      return (
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            flex: 1,
            top: "50%",
          }}
        >
          <ActivityIndicator size="large" color="#FEA347" />
          <Text style={{ margin: 20 }}>La carte arrive, elle charge...</Text>
        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderElement()}
        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            this.props.navigation.push("CreerUneMaraude", {
              localisation: this.state.adresse,
            });
          }}
        >
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            + Maraude
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});
