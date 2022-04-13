import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
export type RootStackParamList = {
  Inscription: undefined;
  MdpOublie: undefined;
  SeConnecter: undefined;
  EcranCarte: undefined;
  CreerUneMaraude: undefined;
  MesMaraudes: undefined;
  Ecran1Maraude: { maraude: Maraude };
  MaraudeItemComponent: undefined;
};

import { Inscription } from "../screens/Inscription";
import { SeConnecter } from "../screens/SeConnecter";
import { MdpOublie } from "../screens/MdpOublie";
import { EcranCarte } from "../screens/EcranCarte";
import { CreerUneMaraude } from "../screens/CreerUneMaraude";
import { MesMaraudes } from "../screens/MesMaraudes";
import { Ecran1Maraude } from "../screens/Ecran1Maraude";
import { Maraude } from "../services/maraude.services";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SeConnecter"
        screenOptions={({ navigation }) => ({
          headerShown: false,
          title: "",
        })}
      >
        <Stack.Screen name="EcranCarte" component={EcranCarte} />
        <Stack.Screen
          name="SeConnecter"
          component={SeConnecter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MdpOublie"
          component={MdpOublie}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CreerUneMaraude" component={CreerUneMaraude} />
        <Stack.Screen name="MesMaraudes" component={MesMaraudes} />
        <Stack.Screen name="Ecran1Maraude" component={Ecran1Maraude} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export interface SeConnecterProps {
  navigation: StackNavigationProp<RootStackParamList, "SeConnecter">;
}
export interface CreerCompteProps {
  navigation: StackNavigationProp<RootStackParamList, "Inscription">;
}
export interface MdpOublieProps {
  navigation: StackNavigationProp<RootStackParamList, "MdpOublie">;
}
export interface CreerUneMaraudeProps {
  navigation: StackNavigationProp<RootStackParamList, "CreerUneMaraude">;
}
export interface EcranCarteProps {
  navigation: StackNavigationProp<RootStackParamList, "EcranCarte">;
}
export interface MesMaraudesProps {
  navigation: StackNavigationProp<RootStackParamList, "MesMaraudes">;
}



const styles = StyleSheet.create({
  headerGauche: {
    flex: 1,
  },
  headerDroit: {
    flex: 1,
  },
});