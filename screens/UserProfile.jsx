import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { giraffe } from "../assets";
import ExperienceCircle from "../components/ExperienceCircle";
import { auth } from "../firebaseConfig";

const UserProfile = () => {
  const navigation = useNavigation();

  const navigateToSettingsScreen = () => {
    navigation.navigate("Settings");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginForm");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#FFE5E4]`}>
      <ScrollView>
        <View style={tw`flex items-end p-5`}>
          <TouchableOpacity
            style={tw`m-3 mt-7 rounded-md bg-white p-2`}
            onPress={navigateToSettingsScreen}
          >
            <Ionicons name={"settings-outline"} size={25} color="black" />
          </TouchableOpacity>
        </View>
        {/* Profile pic */}
        <View style={tw`flex items-center justify-center`}>
          <View>
            <Image
              source={giraffe}
              style={tw`w-35 h-35 bg-[#E58B78] rounded-xl`}
            />
            <TouchableOpacity>
              <Ionicons
                name={"camera"}
                size={25}
                color="black"
                style={tw`rounded-full bg-white p-1 absolute right-0 bottom-0`}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`mt-5 w-98 bg-white rounded-3xl h-170 mb-3`}>
            <View style={tw`flex items-center mt-5`}>
              <Text style={tw`font-bold text-xl`}>Username</Text>
            </View>
            <View style={tw`flex items-center mt-5`}>
              <View style={tw`flex-row mt-5`}>
                <View
                  style={tw`flex items-center justify-center bg-[#FFE5E4] h-25 w-25 rounded-2xl`}
                >
                  <Text style={tw`text-xl text-black font-bold`}>10</Text>
                  <Text style={tw`text-base text-gray-500`}>Animaux</Text>
                </View>
                <View
                  style={tw`flex items-center justify-center bg-[#F0FFF0] h-25 w-25 rounded-2xl ml-5`}
                >
                  <Text style={tw`text-xl text-black font-bold`}>9</Text>
                  <Text style={tw`text-base text-gray-500`}>Ans</Text>
                </View>
                <View
                  style={tw`flex items-center justify-center bg-[#D2EBFE] h-25 w-25 rounded-2xl ml-5`}
                >
                  <Text style={tw`text-xl text-black font-bold`}>10</Text>
                  <Text style={tw`text-base text-gray-500`}>Poids</Text>
                </View>
              </View>
              <View
                style={tw`flex w-90 bg-[#FFE5E4] rounded-2xl mt-5 items-center`}
              >
                <View style={tw`flex bg-white rounded-2xl px-1 w-80 mt-2`}>
                  <Text
                    style={[
                      tw`text-sm m-3`,
                      { fontFamily: "AutourOne_400Regular" },
                    ]}
                  >
                    Ton animal le plus joueur est :
                    <Text style={tw`font-bold items-center`}> Rex !</Text>
                  </Text>
                </View>
                <View style={tw`flex bg-white rounded-2xl px-1 w-80 mt-2`}>
                  <Text
                    style={[
                      tw`text-sm m-3`,
                      { fontFamily: "AutourOne_400Regular" },
                    ]}
                  >
                    Ton animal le plus rigolo est :
                    <Text style={tw`font-bold items-center`}> Rex !</Text>
                  </Text>
                </View>
                <View style={tw`flex bg-white rounded-2xl px-1 w-80 mt-2 mb-2`}>
                  <Text
                    style={[
                      tw`text-sm m-3`,
                      { fontFamily: "AutourOne_400Regular" },
                    ]}
                  >
                    Ton animal le plus embêtant est :
                    <Text style={tw`font-bold items-center`}> Rex !</Text>
                  </Text>
                </View>
              </View>
              <View style={tw`flex mt-7`}>
                <Text style={tw`font-bold text-xl mb-5`}>
                  Féliciations tu as atteint le niveau 20 !
                </Text>
                <ExperienceCircle experience={20} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
