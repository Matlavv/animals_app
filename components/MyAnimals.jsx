import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { catFace, dog } from "../assets";

const allAnimals = [
  {
    id: "1",
    name: "Luna",
    category: "Chats",
    image: catFace,
    sex: "Femelle",
    age: "2 ans",
    weight: "10 kg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl ac nisi tincidunt tincidunt",
    favoriteFood: "Croquettes",
    favoritePlace: "Parc d'Auvers-sur-Oise",
    favoriteToy: "Balle",
    adoptionDate: "12/12/2021",
  },
  {
    id: "2",
    name: "Rex",
    category: "Chiens",
    image: dog,
    sex: "Male",
    age: "1 ans",
    weight: "10 kg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl ac nisi tincidunt tincidunt",
    favoriteFood: "Croquettes",
    favoritePlace: "Parc d'Auvers-sur-Oise",
    favoriteToy: "Balle",
    adoptionDate: "12/12/2021",
  },
  {
    id: "3",
    name: "pipou",
    category: "Chiens",
    image: dog,
    sex: "Femelle",
    age: "2 ans",
    weight: "10 kg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl ac nisi tincidunt tincidunt",
    favoriteFood: "Croquettes",
    favoritePlace: "Parc d'Auvers-sur-Oise",
    favoriteToy: "Balle",
    adoptionDate: "12/12/2021",
  },
  {
    id: "4",
    name: "poopopp",
    category: "Chiens",
    image: dog,
    sex: "Male",
    age: "1 ans",
    weight: "10 kg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl ac nisi tincidunt tincidunt",
    favoriteFood: "Croquettes",
    favoritePlace: "Parc d'Auvers-sur-Oise",
    favoriteToy: "Balle",
    adoptionDate: "12/12/2021",
  },
  {
    id: "5",
    name: "poopopp",
    category: "Chiens",
    image: dog,
    sex: "Femelle",
    age: "2 ans",
    weight: "10 kg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl ac nisi tincidunt tincidunt",
    favoriteFood: "Croquettes",
    favoritePlace: "Parc d'Auvers-sur-Oise",
    favoriteToy: "Balle",
    adoptionDate: "12/12/2021",
  },
  {
    id: "6",
    name: "poopopp",
    category: "Chats",
    image: catFace,
    sex: "Male",
    age: "1 ans",
    weight: "10 kg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl ac nisi tincidunt tincidunt",
    favoriteFood: "Croquettes",
    favoritePlace: "Parc d'Auvers-sur-Oise",
    favoriteToy: "Balle",
    adoptionDate: "12/12/2021",
  },
];

const MyAnimals = ({ selectedCategory }) => {
  const navigation = useNavigation();
  const filteredAnimals = allAnimals.filter(
    (animal) => animal.category === selectedCategory
  );

  let isEven = true;

  const navigateToAddAnimal = () => {
    navigation.navigate("AddAnimal");
  };

  const navigateToAnimalDetails = (animal) => {
    navigation.navigate("AnimalDetails", { animal: animal });
  };

  const backgroundColor = isEven ? "#FFE5E4" : "#D2EBFE";

  return (
    <View style={tw`mt-10`}>
      <View style={tw`flex-row flex-wrap`}>
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal) => {
            const backgroundColor = isEven ? "#FFE5E4" : "#D2EBFE";
            isEven = !isEven;

            return (
              <View key={animal.id} style={tw`m-3`}>
                <TouchableOpacity
                  onPress={() => navigateToAnimalDetails(animal)}
                  style={[
                    tw`w-40 h-40 rounded-xl items-center justify-center`,
                    { backgroundColor: backgroundColor },
                  ]}
                >
                  <Image
                    source={animal.image}
                    style={tw`w-36 h-36 rounded-xl`}
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    tw`text-lg mt-2 items-center w-40 overflow-hidden text-center`,
                    { fontFamily: "Alata_400Regular" },
                  ]}
                >
                  {animal.name}
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={tw`text-lg`}>
            Aucun animal trouvé dans cette catégorie.
          </Text>
        )}
        <View style={tw`w-full items-center mt-5`}>
          <TouchableOpacity
            onPress={navigateToAddAnimal}
            style={tw`w-20 h-20 rounded-xl items-center justify-center bg-white border border-gray-300`}
          >
            <Text style={tw`text-3xl font-bold`}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyAnimals;
