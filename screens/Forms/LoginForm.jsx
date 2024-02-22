import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { boyDog } from "../../assets";
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
    <SafeAreaView
      style={tw`p-4 flex-1 justify-center items-center bg-[#FFE5E4]`}
    >
      <View style={tw`flex`}>
        <View style={tw`flex justify-center items-center`}>
          <Image source={boyDog} style={tw`w-60 h-60`} />
        </View>
        <View style={tw`flex justify-center items-center mt-3`}>
          <Text style={tw`flex text-white font-bold text-xl`}>
            Heureux de vous revoir !
          </Text>
          <Text style={tw`flex text-white font-bold text-3xl mt-3`}>
            Merci de vous connecter
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
            onPress={handleLogin}
            style={tw`w-80 bg-[#FF9391] px-5 py-4 rounded-full flex mt-7 shadow-2xl items-center`}
          >
            <Text style={tw`text-white text-base font-semibold`}>
              Connexion
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex justify-center items-center mt-8`}>
          <Text style={tw`text-black font-semibold text-sm`}>OU</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterForm")}
            style={tw`w-80 bg-[rgba(255,147,145,0.4)] px-5 py-4 rounded-full flex mt-7 shadow-2xl items-center`}
          >
            <Text style={tw`text-white text-base font-semibold`}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
