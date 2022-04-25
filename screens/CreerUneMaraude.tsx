import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as React from "react";

import { CreerUneMaraudeProps } from "../navigation/app-stacks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc } from "firebase/firestore";
import { colRef } from "../firebase/firebase-config";
import MapView, { Marker } from "react-native-maps";
import { getAuth } from "firebase/auth";

// import { SeConnecterProps } from "../navigation/app-stacks";
interface MaraudeState {
  notes: string;
  date: Date;
  show: boolean;
}
export class CreerUneMaraude extends React.Component<
  CreerUneMaraudeProps,
  MaraudeState
> {
  state: MaraudeState = {
    notes: "",
    show: true,
    date: new Date(),
  };
  add() {
    //Cette fonction sert à ajouter une maraude dans firebase
    setDoc(doc(colRef), {
      adresse: this.props.route.params.localisation,
      notes: this.state.notes,
      date: this.state.date,
      userId: getAuth().currentUser?.uid, //on récupère l'id de l'utilisateur connécté
    })
      .then(() => {
        Alert.alert(
          "Maraude Ajoutée",
          "Vous venez d'ajouter une maraude avec succès ",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate("MesMaraudes"),
            },
          ]
        );
      })
      .catch((er) => {
        Alert.alert("Erreur", "L'ajout n'a pas fonctionné, veuillez reessayer");
      });
  }

  onChange = (selectedDate: Date) => {
    const currentDate = selectedDate;
    this.setState({ show: false });
    this.setState({ date: currentDate });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.pageConatiner}>
            <MapView
              style={styles.map}
              region={this.props.route.params.localisation}
            >
              <Marker
                coordinate={{
                  latitude: this.props.route.params.localisation.latitude,
                  longitude: this.props.route.params.localisation.longitude,
                }}
              />
            </MapView>
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
                this.add();
              }}
            >
              <Text>Ajouter La Maraude</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    marginLeft: 16,
    flex: 1,
    borderRadius: 30,
  },
  map: {
    width: 300,
    height: 250,
    margin: 20,
    borderRadius: 80,
    borderWidth: 1,
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
    backgroundColor: "#FEA347",
    margin: 20,
  },
});
