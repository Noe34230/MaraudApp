import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as React from "react";

export class Header extends React.Component<{ navigation: any }, {}> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            this.props.navigation.navigate("EcranCarte");
          }}
        >
          <Text style={styles.text}>Carte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            this.props.navigation.navigate("MesMaraudes");
          }}
        >
          <Text style={styles.text}>Mes Maraudes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: 100,
    backgroundColor: "#FEA347",
    flexDirection: "row",
  },
  bouton: {
    flex: 1,
    width: Dimensions.get("screen").width / 2,
    alignItems: "center",
    justifyContent: "flex-end",
    borderWidth: 1,
    paddingBottom: 20,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});
