import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import * as Location from "expo-location";

import { CreerUneMaraudeProps } from "../navigation/app-stacks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc } from "firebase/firestore";
import { colRef } from "../firebase/firebase-config";
import { Localisation } from "../services/maraude.services";
import MapView from "react-native-maps";
import { Header } from "../components/Header";

// import { SeConnecterProps } from "../navigation/app-stacks";
interface MaraudeState {
  adresse: Localisation;
  notes: string;
  date: Date;
  show: boolean;
  mode: string;
}
export class CreerUneMaraude extends React.Component<
  CreerUneMaraudeProps,
  MaraudeState
> {
  state: MaraudeState = {
    adresse: {
      longitude: 0,
      latitude: 0,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
    notes: "",
    show: true,
    date: new Date(2022, 10, 10),
    mode: "date",
  };
  add() {
    setDoc(doc(colRef), {
      adresse: this.state.adresse,
      notes: this.state.notes,
      date: this.state.date,
    })
      .then(() => {
        Alert.alert("Nouvelle Maraude ajouté");
      })
      .catch((er) => {
        let error = er.toString();
        Alert.alert("marche pas", error);
      });
  }

  onChange = (selectedDate: Date) => {
    const currentDate = selectedDate;
    this.setState({ show: false });
    this.setState({ date: currentDate });
  };
  componentDidMount() {
    Location.getCurrentPositionAsync()
      .then((localisation) => {
        console.log("Localisation récupérée maraude");
        let latitude = localisation.coords.latitude;
        let longitude = localisation.coords.longitude;
        let latitudeDelta = 0.0922;
        let longitudeDelta = 0.0421;
        this.setState({
          adresse: { latitude, longitude, latitudeDelta, longitudeDelta },
        });
      })
      .catch((er) => {
        console.log("Error : ");
        console.log(er);
      });
  }
  onRegionChange(adresse: Localisation) {
    this.setState({ adresse });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={styles.pageConatiner}>
          <MapView
            style={styles.map}
            region={this.state.adresse}
            onRegionChange={() => this.onRegionChange}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Notes"
              multiline={true}
              onFocus={() => Keyboard.dismiss}
              onChangeText={(notes) => this.setState({ notes })}
            />
          </View>
          <DateTimePicker
            style={styles.timePicker}
            testID="dateTimePicker"
            value={this.state.date}
            is24Hour={true}
            onChange={() => {
              this.onChange;
            }}
          />

          <TouchableOpacity
            style={styles.bouton}
            onPress={() => {
              this.props.navigation.navigate("CreerUneMaraude");
            }}
          >
            <Text>Ajouter La Maraude</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },

  pageConatiner: { flex: 1, justifyContent: "center", alignItems: "center" },

  inputContainer: {
    borderBottomColor: "#000",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 250,
    height: 250,
    marginBottom: 20,
    flexDirection: "row",
  },
  inputText: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },
  map: {
    width: 200,
    height: 200,
    margin: 20,
    borderRadius: 80,
  },
  timePicker: {
    width: 100,
    height: 50,
    alignSelf: "center",
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
