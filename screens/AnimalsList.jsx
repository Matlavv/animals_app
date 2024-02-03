import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import { giraffe } from "../assets";

const AnimalsList = () => {
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
              Gerbizzz
            </Text>
          </View>
        </View>
        <Text
          style={[tw`text-2xl m-5 mt-10`, { fontFamily: "Alata_400Regular" }]}
        >
          Catégories
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimalsList;
