import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

const allAnimals = [
  { id: "1", name: "Luna", category: "Chats" },
  { id: "2", name: "Rex", category: "Chiens" },
];

const MyAnimals = ({ selectedCategory }) => {
  const filteredAnimals = allAnimals.filter(
    (animal) => animal.category === selectedCategory
  );

  return (
    <View style={tw`mt-5`}>
      {filteredAnimals.length > 0 ? (
        filteredAnimals.map((animal) => (
          <Text key={animal.id} style={tw`text-lg`}>
            {animal.name}
          </Text>
        ))
      ) : (
        <Text style={tw`text-lg`}>
          Aucun animal trouvé dans cette catégorie.
        </Text>
      )}
    </View>
  );
};

export default MyAnimals;
