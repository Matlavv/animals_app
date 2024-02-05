import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { auth } from "../firebaseConfig";

const UserProfile = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginForm");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <View style={tw`mt-20`}>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
