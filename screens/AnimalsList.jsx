import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
import { auth, db } from "../firebaseConfig";

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
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, "users", auth.currentUser.uid, "animals"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const animalsList = [];
        querySnapshot.forEach((doc) => {
          animalsList.push({ id: doc.id, ...doc.data() });
        });
        setAnimals(animalsList);
      },
      (error) => {
        console.error("Erreur lors de la récupération des animaux:", error);
      }
    );
    return () => unsubscribe();
  }, [selectedCategory]);

  const filteredAnimals = animals.filter(
    (animal) => animal.category === selectedCategory
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Titre */}
        <View style={tw`w-full items-center mt-10`}>
          <Text style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}>
            Animalzz
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
              }`}
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
                  }`,
                  { fontFamily: "Alata_400Regular" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <MyAnimals
          selectedCategory={selectedCategory}
          animals={filteredAnimals}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimalsList;
