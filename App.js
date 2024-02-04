import { Alata_400Regular } from "@expo-google-fonts/alata";
import { AutourOne_400Regular, useFonts } from "@expo-google-fonts/autour-one";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import Articles from "./screens/Articles";
import HomeScreen from "./screens/HomeScreen";
import AnimalsStack from "./screens/Stack/AnimalStack";
import UserProfile from "./screens/UserProfile";

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F9F9F9",
  },
};

const App = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    RobotoMono: require("./assets/fonts/RobotoMono.ttf"),
    AutourOne_400Regular,
    Alata_400Regular,
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route?.name === "Accueil") {
              iconName = focused ? "home" : "home-outline";
            } else if (route?.name === "Mes animaux") {
              iconName = focused ? "paw" : "paw-outline";
            } else if (route?.name === "Articles") {
              iconName = focused ? "newspaper" : "newspaper-outline";
            } else if (route?.name === "Profil") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: "#D03312",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            ...(!keyboardVisible && {
              backgroundColor: "#F9F9F9",
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            }),
            display: keyboardVisible ? "none" : "flex", // Cacher la tabBar quand le clavier est visible
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Mes animaux" component={AnimalsStack} />

        <Tab.Screen name="Articles" component={Articles} />
        <Tab.Screen name="Profil" component={UserProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
