import { Alata_400Regular } from "@expo-google-fonts/alata";
import { AutourOne_400Regular, useFonts } from "@expo-google-fonts/autour-one";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import AnimalsList from "./screens/AnimalsList";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F9F9F9",
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoMono: require("./assets/fonts/RobotoMono.ttf"),
    AutourOne_400Regular,
    Alata_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Mes animaux" component={AnimalsList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
