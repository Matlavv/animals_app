import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

const MedicalComponent = () => {
  return (
    <View style={tw`flex-row justify-between border rounded-xl p-6 m-3`}>
      <Ionicons name="medical" size={48} color="black" />
      <View style={tw`border border-dashed text-gray-400`}></View>
      <View style={tw`flex`}>
        <Text style={tw`font-semibold text-2xl`}>Bilan de santé</Text>
        <Text style={tw`font-light text-gray-500`}>Le 12/12/2021</Text>
      </View>
    </View>
  );
};

export default MedicalComponent;
