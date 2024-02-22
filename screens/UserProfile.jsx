import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { giraffe, redPaw } from "../assets";
import ExperienceCircle from "../components/ExperienceCircle";
import { auth, db } from "../firebaseConfig";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [funAnimal, setFunAnimal] = useState("");
  const [playerAnimal, setPlayerAnimal] = useState("");
  const [annoyingAnimal, setAnnoyingAnimal] = useState("");

  const navigation = useNavigation();

  const navigateToSettingsScreen = () => {
    navigation.navigate("Settings");
  };

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUsername(userSnap.data().username);
        setAge(userSnap.data().age);
        setFunAnimal(userSnap.data().funAnimal);
        setPlayerAnimal(userSnap.data().playerAnimal);
        setAnnoyingAnimal(userSnap.data().annoyingAnimal);
      } else {
        console.log("Aucun document trouvé pour cet utilisateur.");
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#FFE5E4]`}>
      <ScrollView>
        <View style={tw`flex-row items-center justify-between p-5 mt-5`}>
          <View style={tw`w-10`} />
          {/* Conteneur pour le titre centré */}
          <View>
            <Text
              style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}
            >
              Animalzz
            </Text>
          </View>
          {/* Conteneur pour l'icône des paramètres, placée à droite */}
          <TouchableOpacity
            style={tw`rounded-md bg-white p-2`}
            onPress={navigateToSettingsScreen}
          >
            <Ionicons name={"settings-outline"} size={25} color="black" />
          </TouchableOpacity>
        </View>
        {/* Profile pic */}
        <View style={tw`flex items-center justify-center mt-3`}>
          <Image
            source={redPaw}
            style={[
              tw`absolute`,
              { left: -30, top: -20, width: 137, height: 130, opacity: 0.4 },
              { transform: [{ rotate: "40deg" }] },
            ]}
          />
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
              <Text style={tw`font-bold text-3xl`}>{username}</Text>
            </View>
            <View style={tw`flex items-center mt-3`}>
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
                  <Text style={tw`text-xl text-black font-bold`}>{age}</Text>
                  <Text style={tw`text-base text-gray-500`}>Ans</Text>
                </View>
                <View
                  style={tw`flex items-center justify-center overflow-hidden bg-[#D2EBFE] h-25 w-25 rounded-2xl ml-5`}
                >
                  <Image
                    source={redPaw}
                    style={[
                      tw`absolute`,
                      {
                        right: -5,
                        bottom: -10,
                        width: 65,
                        height: 60,
                        opacity: 0.2,
                      },
                      { transform: [{ rotate: "-40deg" }] },
                    ]}
                  />
                  <Text style={tw`text-xl text-black font-bold`}>10</Text>
                  <Text style={tw`text-base text-gray-500`}>Badges</Text>
                </View>
              </View>
              <View
                style={tw`flex w-90 bg-[#FFE5E4] rounded-2xl mt-5 items-center overflow-hidden`}
              >
                <Image
                  source={redPaw}
                  style={[
                    tw`absolute`,
                    {
                      left: -40,
                      bottom: -40,
                      width: 235,
                      height: 230,
                      opacity: 0.4,
                    },
                    { transform: [{ rotate: "40deg" }] },
                  ]}
                />
                <View style={tw`flex bg-white rounded-2xl px-1 w-80 mt-2`}>
                  <Text
                    style={[
                      tw`text-sm m-3`,
                      { fontFamily: "AutourOne_400Regular" },
                    ]}
                  >
                    Ton animal le plus joueur est :
                    <Text style={tw`font-bold items-center`}>
                      {" "}
                      {playerAnimal} !
                    </Text>
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
                    <Text style={tw`font-bold items-center`}>
                      {" "}
                      {funAnimal} !
                    </Text>
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
                    <Text style={tw`font-bold items-center`}>
                      {" "}
                      {annoyingAnimal} !
                    </Text>
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
