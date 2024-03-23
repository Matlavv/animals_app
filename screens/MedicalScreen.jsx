import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import MedicalComponent from "../components/MedicalComponent";

const MedicalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { animalId } = route.params;

  const navigateToAddMedical = () => {
    navigation.navigate("AddMedical", { animalId });
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView>
        <View style={tw`w-full items-center mt-10`}>
          <Text style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}>
            Animalzz
          </Text>
        </View>
        <View>
          <Text
            style={[tw`text-lg m-2 mt-10`, { fontFamily: "Alata_400Regular" }]}
          >
            Retrouve ici tout les rendez vous de ton animal chez le vétérinaire
            !
          </Text>
        </View>
        <View>
          <MedicalComponent />
        </View>
        {/* Centrer le bouton horizontalement */}
        <View style={tw`flex justify-center items-center mt-3`}>
          <TouchableOpacity
            style={tw`justify-center items-center p-3 bg-[#D03312] rounded-lg w-5/6`}
            onPress={navigateToAddMedical}
          >
            <Text
              style={[
                tw`text-base text-white`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Ajouter un rendez-vous
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalScreen;
