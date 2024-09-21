import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { girlCat } from "../../assets";
import { auth } from "../../firebaseConfig";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const validateInputs = () => {
    if (email.length === 0 || !email.includes("@")) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("LoginForm");
      Alert.alert("Succès", "Inscription réussie !");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Erreur",
          "L'adresse email est déjà utilisée par un autre compte."
        );
      } else {
        Alert.alert("Erreur", error.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={tw`p-4 flex-1 justify-center items-center bg-[#FFE5E4]`}
    >
      <ScrollView style={tw`flex`}>
        <View style={tw`flex justify-center items-center`}>
          <Image source={girlCat} style={tw`w-60 h-60`} />
        </View>
        <View style={tw`flex justify-center items-center mt-3`}>
          <Text style={tw`flex text-white font-bold text-xl`}>Bienvenue !</Text>
          <Text style={tw`flex text-white font-bold text-3xl mt-3`}>
            Merci de vous inscrire
          </Text>
        </View>
        <View style={tw`p-4 flex justify-center items-center mt-5`}>
          <TextInput
            style={tw`w-80 p-4 mb-4 bg-white rounded-full shadow-2xl`}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={tw`w-80 p-4 mb-4 bg-white rounded-full shadow-2xl mt-2`}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={handleSignUp}
            style={tw`w-80 bg-[#FF9391] px-5 py-4 rounded-full flex mt-7 shadow-2xl items-center`}
          >
            <Text style={tw`text-white text-base font-semibold`}>
              Inscription
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex justify-center items-center mt-8`}>
          <Text style={tw`text-black font-semibold text-sm`}>OU</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginForm")}
            style={tw`w-80 bg-[rgba(255,147,145,0.4)] px-5 py-4 rounded-full flex mt-7 shadow-2xl items-center`}
          >
            <Text style={tw`text-white text-base font-semibold`}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterForm;
