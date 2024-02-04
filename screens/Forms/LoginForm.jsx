import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (email.length === 0 || !email.includes("@")) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide.");
      return false;
    }
    if (password.length === 0) {
      Alert.alert("Erreur", "Veuillez entrer un mot de passe.");
      return false;
    }
    return true;
  };

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!validateInputs()) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("UserProfile");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        Alert.alert(
          "Identifiants incorrects",
          "Email ou mot de passe incorrect."
        );
      } else {
        Alert.alert("Erreur", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={tw`p-4 flex-1 justify-center items-center mt-20`}>
      <View>
        <Text>Connexion</Text>
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
            onPress={handleLogin}
            style={tw`bg-[#34469C] px-5 py-3 rounded-full flex mt-7 shadow-2xl`}
          >
            <Text style={tw`text-white text-base`}>Connexion</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center items-center mt-8`}>
          <Text style={tw`text-black font-semibold text-sm`}>
            Pas de compte ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterForm")}>
            <Text style={tw`text-blue-500 ml-2 font-bold text-sm`}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
