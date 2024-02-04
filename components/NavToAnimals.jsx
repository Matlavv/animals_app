import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { dog } from "../assets";

const NavToAnimals = () => {
  const navigation = useNavigation();

  const navigateToAnimals = () => {
    navigation.navigate("Mes animaux");
  };

  return (
    <View
      style={tw`flex border border-gray-200 rounded-xl bg-[#FFE5E4] w-5/6 overflow-hidden shadow-lg`}
    >
      <View style={tw`m-3`}>
        <Text
          style={[
            tw`absolute text-base font-semibold w-3/4`,
            { fontFamily: "Alata_400Regular" },
          ]}
        >
          Accédez aux informations sur vos animaux !
        </Text>
      </View>
      <View style={tw`flex-row items-start justify-between mt-9`}>
        <TouchableOpacity
          style={tw`bg-[#D03312] w-35 p-3 m-4 rounded-xl`}
          onPress={navigateToAnimals}
        >
          <Text
            style={[
              tw`text-white font-normal`,
              { fontFamily: "Alata_400Regular" },
            ]}
          >
            Voir mes animaux
          </Text>
        </TouchableOpacity>
        <View
          style={[
            tw`absolute`,
            {
              width: 140, // Ajustez selon la taille souhaitée
              height: 140, // Ajustez selon la taille souhaitée
              right: -20, // Ajustez pour toucher la bordure de la View principale
              bottom: -18, // Ajustez pour toucher la bordure de la View principale
              borderRadius: 80, // La moitié des dimensions pour un cercle parfait
              backgroundColor: "#E58B78",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image source={dog} style={tw`w-30 h-30 rounded-full`} />
        </View>
      </View>
    </View>
  );
};

export default NavToAnimals;
