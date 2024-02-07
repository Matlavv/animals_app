import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import { giraffe } from "../assets";
import GerbilTalking from "../components/GerbilTalking";
import NavToAnimals from "../components/NavToAnimals";
import { auth, db } from "../firebaseConfig";

const HomeScreen = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        } else {
          console.log("Aucun document trouvé pour cet utilisateur.");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={tw`flex`}>
      <ScrollView>
        {/* Conteneur pour l'image et le titre */}
        <View style={tw`w-full flex-row items-center mt-10`}>
          {/* Conteneur pour l'image */}
          <View style={tw`ml-5`}>
            <Image
              source={giraffe}
              style={tw`w-15 h-15 bg-[#FFE5E4] rounded-xl`}
            />
          </View>
          {/* Conteneur pour le titre centré */}
          <View style={tw`flex-1 items-center`}>
            <Text
              style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}
            >
              Animalzz
            </Text>
          </View>
        </View>
        <View style={tw`m-5 mt-7`}>
          <Text style={[tw`text-xl`, { fontFamily: "RobotoMono" }]}>
            Bonjour {username}
          </Text>
          <Text
            style={[
              tw`font-light text-2xl`,
              { fontFamily: "Alata_400Regular" },
            ]}
          >
            Bonne journée !
          </Text>
        </View>
        <View style={tw`flex items-center mt-5`}>
          <NavToAnimals />
        </View>
        <View>
          <GerbilTalking />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
