import * as React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Maraude } from "../services/maraude.services";
import { MaraudeItemComponent } from "./MaraudeItem";

interface MaraudeListProps {
  navigation: any;
  maraudes: Array<Maraude>;
  delete: (maraude: Maraude) => void;
}

export class MaraudeListComponents extends React.Component<
  MaraudeListProps,
  {}
> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList<Maraude>
          keyExtractor={(item) => item.id}
          data={this.props.maraudes}
          renderItem={({ item }: { item: Maraude }) => {
            return (
              <MaraudeItemComponent
                maraude={item}
                navigation={this.props.navigation}
                delete={this.props.delete}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  maraudList: {},
});
