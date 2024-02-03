import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { catFace, dogFace, fishFace, hamsterFace, snakeFace } from "../assets";
import MyAnimals from "../components/MyAnimals";

const categories = [
  {
    id: "1",
    name: "Chiens",
    image: dogFace,
  },
  {
    id: "2",
    name: "Chats",
    image: catFace,
  },
  {
    id: "3",
    name: "Poissons",
    image: fishFace,
  },
  {
    id: "4",
    name: "Rongeurs",
    image: hamsterFace,
  },
  {
    id: "5",
    name: "Reptiles",
    image: snakeFace,
  },
];

const AnimalsList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Titre */}
        <View style={tw`w-full items-center mt-10`}>
          <Text style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}>
            Gerbizzz
          </Text>
        </View>
        <Text style={[tw`text-2xl mt-10`, { fontFamily: "Alata_400Regular" }]}>
          Catégories
        </Text>

        {/* ScrollView Horizontal pour les Catégories */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={tw`mt-5`}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`mr-4 p-1 pb-5 rounded-full border border-gray-200 ${
                selectedCategory === item.name ? "bg-[#D03312]" : "bg-white"
              }`} // Changement de couleur basé sur la sélection
              onPress={() => setSelectedCategory(item.name)}
            >
              <Image
                source={item.image}
                style={tw`w-15 h-15 rounded-full bg-white mb-2`}
              />
              <Text
                style={[
                  tw`text-center text-xs ${
                    selectedCategory === item.name ? "text-white" : "text-black"
                  }`, // Changement de couleur du texte
                  { fontFamily: "Alata_400Regular" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <MyAnimals selectedCategory={selectedCategory} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimalsList;
