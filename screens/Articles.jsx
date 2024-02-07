import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import ArticlesComponent from "../components/ArticlesComponent";

const categories = [
  {
    id: 1,
    title: "Tout",
  },
  {
    id: 2,
    title: "Chiens",
  },
  {
    id: 3,
    title: "Chats",
  },
  {
    id: 4,
    title: "Aquariums",
  },
  {
    id: 5,
    title: "Rongeurs",
  },
  {
    id: 6,
    title: "Reptiles",
  },
];

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <View style={tw`items-center mt-10`}>
          <Text style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}>
            Animalzz
          </Text>
        </View>
        <Text style={[tw`text-2xl mt-10`, { fontFamily: "Alata_400Regular" }]}>
          Articles tendances
        </Text>
        <View style={tw`flex-row items-center mt-3`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={tw`border border-[#E58B78] rounded-3xl px-3 py-1 m-1 ${
                  selectedCategory === category.title
                    ? "bg-[#D03312]"
                    : "bg-white"
                }`}
                onPress={() => setSelectedCategory(category.title)}
              >
                <Text
                  style={[
                    tw`${
                      selectedCategory === category.title
                        ? "text-white"
                        : "text-black"
                    }`,
                    { fontFamily: "Alata_400Regular", fontSize: 18 },
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ArticlesComponent selectedCategory={selectedCategory} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Articles;
