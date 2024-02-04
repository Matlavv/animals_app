import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const AnimalDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animal } = route.params;

  return (
    <ScrollView style={tw`flex bg-[#FFE5E4] h-full`}>
      {/* header */}
      <View style={tw`flex-row items-center justify-between p-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`m-3 mt-7 rounded-md bg-white p-2`}
        >
          <Ionicons name={"chevron-back"} size={25} color="black" />
        </TouchableOpacity>
      </View>
      {/* Animal 3D */}
      <View style={tw`flex items-center justify-center`}>
        <Image source={animal.image} style={tw`h-45 w-45`} />
      </View>
      {/* White space with animal info */}
      <View style={tw`flex bg-[#F9F9F9] h-full rounded-t-20`}>
        <View style={tw`flex items-center justify-between p-5`}>
          <Text>Dis nous en plus sur ton animal !</Text>
          <TextInput placeholder="Nom" />
          <TextInput placeholder="Sexe" />
          <TextInput placeholder="Age" />
          <TextInput placeholder="Poids" />
          <TextInput placeholder="Date de naissance" />
          <TextInput placeholder="Date d'adoption" />
          <TextInput placeholder="Plat préferé" />
          <TextInput placeholder="Lieu favoris" />
          <TextInput placeholder="Jouet préferé" />
        </View>
        <View style={tw`flex items-center`}>
          <TouchableOpacity
            style={tw`m-5 items-center p-3 bg-[#D03312] rounded-lg w-5/6`}
          >
            <Text
              style={[
                tw`flex text-base text-white`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Valider les modifications
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnimalDetails;
