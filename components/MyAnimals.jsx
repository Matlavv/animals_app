import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const MyAnimals = ({ selectedCategory, animals }) => {
  const navigation = useNavigation();

  const filteredAnimals = animals.filter(
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
