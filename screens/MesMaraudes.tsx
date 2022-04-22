import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaraudeListComponents } from "../components/MaraudesList";
import { MesMaraudesProps } from "../navigation/app-stacks";
import maraudesServices, { Maraude } from "../services/maraude.services";

import { db, colRef, authentication } from "../firebase/firebase-config";
import { Header } from "../components/Header";

interface MesMaraudesState {
  maraudes: Array<Maraude>;
}

export class MesMaraudes extends React.Component<
  MesMaraudesProps,
  MesMaraudesState
> {
  state: MesMaraudesState = {
    maraudes: [],
  };
  componentDidMount() {
    this.loadMaraudes();
  }
  supprimerMaraude = (maraude: Maraude) => {
    maraudesServices.remove(maraude);
    this.loadMaraudes();
  };
  loadMaraudes = () => {
    maraudesServices.getAll().then((theMaraudes) => {
      this.setState({ maraudes: theMaraudes });
    });
  };

  deconnexion = () => {
    authentication.signOut();
    this.props.navigation.navigate("SeConnecter");
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.decoStyle} onPress={this.deconnexion}>
          <Text style={styles.text}>Deconnexion</Text>
        </TouchableOpacity>

        <View style={styles.maraudList}>
          <MaraudeListComponents
            navigation={this.props.navigation}
            maraudes={this.state.maraudes}
            delete={this.supprimerMaraude}
          />
          <Text style={styles.info}>
            Pour supprimer une maraude : rester appuyer sur la maraude à
            supprimer
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maraudList: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
  },
  decoStyle: {
    margin: 10,
    marginRight: 20,
    alignSelf: "flex-end",
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 30,
  },
  text: {
    fontSize: 15,
  },
  info: {
    fontStyle: "italic",
    paddingBottom: 20,
    padding: 10,
  },
});
