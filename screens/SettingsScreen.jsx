import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { childs } from "../assets";
import { auth, db } from "../firebaseConfig";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [favoriteAnimal, setFavoriteAnimal] = useState("");
  const [funAnimal, setFunAnimal] = useState("");
  const [playerAnimal, setPlayerAnimal] = useState("");
  const [annoyingAnimal, setAnnoyingAnimal] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUsername(userData.username || "");
        setAge(userData.age || "");
        setGender(userData.gender || "");
        setFavoriteAnimal(userData.favoriteAnimal || "");
        setFunAnimal(userData.funAnimal || "");
        setPlayerAnimal(userData.playerAnimal || "");
        setAnnoyingAnimal(userData.annoyingAnimal || "");
      } else {
        console.log("Aucune donnée trouvée pour cet utilisateur!");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const informations = {
      username,
      age,
      gender,
      favoriteAnimal,
      funAnimal,
      playerAnimal,
      annoyingAnimal,
    };

    try {
      await setDoc(userDocRef, informations, { merge: true });
      Alert.alert("Succès", "Tes informations ont été enregistrées.");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des informations", error);
      Alert.alert(
        "Erreur",
        "Un problème est survenu lors de l'enregistrement de votre réservation."
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur de déconnexion", error);
      Alert.alert(
        "Erreur de déconnexion",
        "Une erreur est survenue lors de la tentative de déconnexion."
      );
    }
  };

  return (
    <ScrollView style={tw`flex bg-[#FFE5E4] h-full`}>
      {/* header */}
      <View style={tw`flex-row items-center justify-between p-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`m-3 mt-7 rounded-md bg-white p-2`}
        >
          <Ionicons name={"chevron-back"} size={25} color="black" />
        </TouchableOpacity>
      </View>
      {/* Animal 3D */}
      <View style={tw`flex items-center justify-center`}>
        <Image source={childs} style={tw`h-45 w-60`} />
      </View>
      {/* White space with animal info */}
      <View style={tw`flex bg-[#F9F9F9] h-full rounded-t-20`}>
        <Text
          style={[
            tw`text-2xl mt-4 items-center overflow-hidden text-center`,
            { fontFamily: "Alata_400Regular" },
          ]}
        >
          Dis nous en plus sur toi !
        </Text>
        <View style={tw`flex p-5 mt-3`}>
          <View style={tw``}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-50`}
              placeholder="Quel est ton prénom ?"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={tw`items-end`}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-50`}
              placeholder="Quel est ton âge ?"
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>
          <View style={tw``}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-60`}
              placeholder="Est-tu une fille ou garcon ?"
              value={gender}
              onChangeText={(text) => setGender(text)}
            />
          </View>
          <View style={tw`items-end`}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-60`}
              placeholder="Quel est ton animal preféré ?"
              value={favoriteAnimal}
              onChangeText={(text) => setFavoriteAnimal(text)}
            />
          </View>
          <View style={tw``}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-70`}
              placeholder="Quel est ton animal le plus joueur ?"
              value={playerAnimal}
              onChangeText={(text) => setPlayerAnimal(text)}
            />
          </View>
          <View style={tw`items-end`}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-70`}
              placeholder="Quel est ton animal le plus rigolo ?"
              value={funAnimal}
              onChangeText={(text) => setFunAnimal(text)}
            />
          </View>
          <View style={tw``}>
            <TextInput
              style={tw`border border-gray-200 font-bold text-base rounded-xl bg-white p-2 mb-4 shadow-md w-80`}
              placeholder="Quel est ton animal le plus embêtant ?"
              value={annoyingAnimal}
              onChangeText={(text) => setAnnoyingAnimal(text)}
            />
          </View>
        </View>
        <View style={tw`flex items-center`}>
          <TouchableOpacity
            style={tw`m-5 items-center p-3 bg-[#D03312] rounded-lg w-5/6`}
            onPress={handleSubmit}
          >
            <Text
              style={[
                tw`flex text-base text-white`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Valider
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex items-center mt-5`}>
          <TouchableOpacity
            style={tw`items-center`}
            onPress={() => handleSignOut()}
          >
            <Text
              style={[
                tw`text-base text-black`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Se Déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
