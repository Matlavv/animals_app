import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
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
      Alert.alert(
        "Succès",
        "Inscription réussie, vous pouvez maintenant vous connecter."
      );
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
    <SafeAreaView style={tw`p-4 flex-1 justify-center items-center mt-20`}>
      <View>
        <Text>Inscription</Text>
        <View style={tw`p-4 flex justify-center items-center`}>
          <TextInput
            style={tw`border-b w-80 p-2 mb-4`}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={tw`border-b w-80 p-2 mb-4`}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={handleSignUp}
            style={tw`bg-[#34469C] px-5 py-3 rounded-full flex mt-7 shadow-2xl`}
          >
            <Text style={tw`text-white text-base`}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center items-center mt-8`}>
          <Text style={tw`text-black font-semibold text-sm`}>
            Vous avez deja un compte ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginForm")}>
            <Text style={tw`text-blue-500 ml-2 font-bold text-sm`}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterForm;
