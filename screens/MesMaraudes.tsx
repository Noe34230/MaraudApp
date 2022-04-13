import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaraudeListComponents } from "../components/MaraudesList";
import { MesMaraudesProps } from "../navigation/app-stacks";
import { Maraude } from "../services/maraude.services";

import { getDocs, deleteDoc, doc } from "firebase/firestore";

import { db, colRef } from "../firebase/firebase-config";
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
    this.afficherData();
  }

  supprimerMaraude = (maraude: Maraude) => {
    const MaraudeRef = doc(db, "Maraudes", maraude.id);
    deleteDoc(MaraudeRef);
    this.afficherData();
    console.log("on regarde la liste après")
    console.log(this.state.maraudes)
  };

  afficherData = () => {
    let temp: any = [];
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const notes = doc.get("notes");
          const adresse = doc.get("adresse");
          const id = doc.id;
          const date = doc.get("date");

          if (
            this.state.maraudes.find(function (maraude: Maraude) {
              return maraude.id == id;
            })
          ) {
          } else {
            temp.push({ id, notes, adresse, date });
          }
        });
        this.setState({ maraudes: temp });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={styles.maraudList}>
          <MaraudeListComponents
            navigation={this.props.navigation}
            maraudes={this.state.maraudes}
            delete={this.supprimerMaraude}
          />
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
  boutonTest: {
    flex: 1,
  },
});