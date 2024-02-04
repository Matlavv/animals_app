import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { auth } from "../firebaseConfig";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (!user) {
        navigation.navigate("RegisterForm");
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginForm");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  if (!currentUser) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={tw`mt-20`}>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
