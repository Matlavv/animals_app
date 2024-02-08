import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const AnimalDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animal } = route.params;

  const navigateToMedical = () => {
    navigation.navigate("Medical");
  };

  const navigateToUpdateAnimalForm = () => {
    navigation.navigate("UpdateAnimalForm", { animal: animal });
  };

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
        <TouchableOpacity
          style={tw`m-3 mt-7 rounded-md bg-white p-2`}
          onPress={navigateToUpdateAnimalForm}
        >
          <Ionicons name={"pencil"} size={25} color="black" />
        </TouchableOpacity>
      </View>
      {/* Animal 3D */}
      <View style={tw`flex items-center justify-center`}>
        <Image source={animal.image} style={tw`h-45 w-45`} />
      </View>
      {/* White space with animal info */}
      <View style={tw`flex bg-[#F9F9F9] h-full rounded-t-20`}>
        <View style={tw`flex items-center justify-between p-5`}>
          <Text
            style={[
              tw`text-3xl mt-2 items-center w-40 overflow-hidden text-center`,
              { fontFamily: "Alata_400Regular" },
            ]}
          >
            {animal.name}
          </Text>
          <Text style={tw`text-base text-gray-500`}>
            Adopté le : {animal.adoptionDate} ❤
          </Text>
          <View style={tw`flex-row mt-5`}>
            <View
              style={tw`flex items-center justify-center bg-[#FFE5E4] h-25 w-25 rounded-2xl ml-5`}
            >
              <Text style={tw`text-xl text-black font-bold`}>
                {animal.selected}
              </Text>
              <Text style={tw`text-base text-gray-500`}>Sexe</Text>
            </View>
            <View
              style={tw`flex items-center justify-center bg-[#F0FFF0] h-25 w-25 rounded-2xl ml-5`}
            >
              <Text style={tw`text-xl text-black font-bold`}>{animal.age}</Text>
              <Text style={tw`text-base text-gray-500`}>Age</Text>
            </View>
            <View
              style={tw`flex items-center justify-center bg-[#D2EBFE] h-25 w-25 rounded-2xl ml-5`}
            >
              <Text style={tw`text-xl text-black font-bold`}>
                {animal.weight}
              </Text>
              <Text style={tw`text-base text-gray-500`}>Poids</Text>
            </View>
          </View>
        </View>
        <Text style={tw`text-base text-gray-700 ml-3 mt-3 font-bold`}>
          Infos
        </Text>
        <Text
          style={[
            tw`text-base text-gray-500 m-2`,
            { fontFamily: "Alata_400Regular" },
          ]}
        >
          {animal.description}
        </Text>
        {/* Additionnals informations */}
        <View style={tw`flex items-center mt-3`}>
          <View style={tw`flex-row bg-white rounded-2xl w-5/6 p-2`}>
            <View style={tw`rounded-2xl w-12 h-12 p-2 bg-[#FFE5E4]`}>
              <MaterialIcons name="food-bank" size={30} color="black" />
            </View>
            <Text
              style={[
                tw`flex text-base text-gray-500 justify-center m-2 ml-4`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Plat préferé : {animal.favoriteFood}
            </Text>
          </View>
          <View style={tw`flex-row bg-white rounded-2xl w-5/6 p-2 mt-2`}>
            <View style={tw`rounded-2xl w-12 h-12 p-2 bg-[#F0FFF0]`}>
              <Ionicons name="location" size={30} color="black" />
            </View>
            <Text
              style={[
                tw`flex text-base text-gray-500 justify-center m-2 ml-4`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Lieu favoris : {animal.favoritePlace}
            </Text>
          </View>
          <View style={tw`flex-row bg-white rounded-2xl w-5/6 p-2 mt-2`}>
            <View style={tw`rounded-2xl w-12 h-12 p-2 bg-[#D2EBFE]`}>
              <Ionicons name="gift" size={30} color="black" />
            </View>
            <Text
              style={[
                tw`flex text-base text-gray-500 justify-center m-2 ml-4`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Jouet préferé : {animal.favoriteToy}
            </Text>
          </View>
        </View>
        <View style={tw`flex items-center`}>
          <TouchableOpacity
            style={tw`m-5 items-center p-3 bg-[#D03312] rounded-lg w-5/6`}
            onPress={navigateToMedical}
          >
            <Text
              style={[
                tw`flex text-base text-white`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Accéder au suivi médical
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnimalDetails;
