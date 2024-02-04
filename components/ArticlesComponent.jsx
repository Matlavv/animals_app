import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { animalFeeding } from "../assets";

const articles = [
  {
    id: 1,
    label: "Conseils utiles",
    title: "Comment bien nourrir sa gerbille ?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui in urna tincidunt aliquam",
    category: "Rongeurs",
  },
  {
    id: 2,
    label: "Conseils utiles",
    title: "Comment bien nourrir son chat ?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui in urna tincidunt aliquam",
    category: "Chats",
  },
  {
    id: 3,
    label: "Conseils utiles",
    title: "Comment bien nourrir son chien ?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui in urna tincidunt aliquam",
    category: "Chiens",
  },
  {
    id: 4,
    label: "Conseils utiles",
    title: "Comment bien laver son chien ?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui in urna tincidunt aliquam",
    category: "Chiens",
  },
  {
    id: 5,
    label: "Conseils utiles",
    title: "Comment bien nettoyer son aquarium ?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui in urna tincidunt aliquam",
    category: "Aquariums",
  },
];

const ArticlesComponent = ({ selectedCategory }) => {
  const filteredArticles =
    selectedCategory === "Tout"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <View>
      {filteredArticles.map((article) => (
        <View
          key={article.id}
          style={tw`mt-5 bg-gray-100 rounded-3xl shadow-md`}
        >
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 rounded-3xl p-3`}
          >
            <View style={tw`flex-1`}>
              <Text style={tw`rounded-xl bg-[#FFE5E4] w-30 p-2 mb-2`}>
                {article.label}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[
                  tw`text-lg font-bold`,
                  { fontFamily: "Alata_400Regular" },
                ]}
              >
                {article.title}
              </Text>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={[
                  tw`text-sm text-gray-500`,
                  { fontFamily: "RobotoMono" },
                ]}
              >
                {article.content}
              </Text>
            </View>
            <Image
              source={animalFeeding}
              style={tw`w-1/3 h-full rounded-xl`}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ArticlesComponent;
