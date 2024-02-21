import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import {
  catFace,
  dog,
  dogFace,
  fishFace,
  gerbil,
  hamsterFace,
  hasmter,
  snakeFace,
} from "../assets";
import ChooseDogImageModal from "../components/Modals/ChooseDogImageModal";
import { auth, db } from "../firebaseConfig";

const AddAnimals = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("Mâle");
  const [category, setCategory] = useState("Chiens");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [favoriteToy, setFavoriteToy] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("dog");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const imageMap = {
    dog,
    dogFace,
    catFace,
    fishFace,
    gerbil,
    hamsterFace,
    hasmter,
    snakeFace,
  };

  const handleSelectImage = (imageName) => {
    setSelectedImage(imageName);
  };

  const renderImage = () => {
    const imageSource = imageMap[selectedImage];
    return <Image source={imageSource} style={tw`h-45 w-45`} />;
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (
      adoptionDate &&
      category &&
      name &&
      age &&
      selected &&
      weight &&
      favoriteFood &&
      favoritePlace &&
      favoriteToy &&
      description
    ) {
      try {
        await addDoc(collection(db, "users", user.uid, "animals"), {
          adoptionDate,
          category,
          name,
          age: parseInt(age),
          selected,
          weight: parseFloat(weight),
          favoriteFood,
          favoritePlace,
          favoriteToy,
          description,
          imageName: selectedImage,
        });
        Alert.alert(
          "Animal ajouté avec succès ! ",
          "Il devrais apparaitre dans tes animaux !"
        );
      } catch (error) {
        Alert.alert("Erreur lors de l'ajout de l'animal !");
      }
    } else {
      Alert.alert("Penses à remplir tout les champs !");
    }
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <SafeAreaView style={tw`flex-1`}>
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
        <View style={tw`relative`}>
          <View style={tw`flex items-center justify-center`}>
            {renderImage()}
            <TouchableOpacity
              style={tw`absolute bottom-0 left-65 rounded-full bg-white p-2`}
              onPress={openModal}
            >
              <Ionicons name={"pencil-outline"} size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* White space with animal info */}
        <View style={tw`flex bg-[#F9F9F9] h-full rounded-t-20`}>
          <View style={tw`flex items-center justify-between p-5`}>
            <Text
              style={[
                tw`text-2xl mt-2 items-center overflow-hidden text-center`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Dis nous en plus sur ton nouvel animal !
            </Text>
            <View style={tw`flex mt-5 items-center`}>
              <Text style={tw`text-base text-gray-700`}>C'est un : </Text>
              <View
                style={tw`flex mt-2 items-center border border-gray-300 rounded-xl`}
              >
                <Picker
                  selectedValue={category}
                  style={tw`w-40`}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  <Picker.Item label="Chien" value="Chiens" />
                  <Picker.Item label="Chat" value="Chats" />
                  <Picker.Item label="Poisson" value="Poissons" />
                  <Picker.Item label="Rongeur" value="Rongeurs" />
                  <Picker.Item label="Reptile" value="Reptiles" />
                </Picker>
              </View>
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>
                Tu l'as adopté le :{" "}
              </Text>
              <TextInput
                placeholder="01/01/2023"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={adoptionDate}
                onChangeText={setAdoptionDate}
              />
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>Nom : </Text>
              <TextInput
                placeholder="Nom"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={tw`flex mt-5 items-center`}>
              <Text style={tw`text-base text-gray-700`}>Sexe : </Text>
              <View style={tw`flex-row `}>
                <TouchableOpacity
                  onPress={() => setSelected("Mâle")}
                  style={[
                    tw`rounded-xl shadow-xl p-4 m-2`,
                    {
                      backgroundColor:
                        selected === "Mâle" ? "#D03312" : "#FFFFFF",
                    },
                  ]}
                >
                  <Text style={tw``}>Mâle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelected("Femelle")}
                  style={[
                    tw`rounded-xl shadow-xl p-4 m-2`,
                    {
                      backgroundColor:
                        selected === "Femelle" ? "#D03312" : "#FFFFFF",
                    },
                  ]}
                >
                  <Text style={tw``}>Femelle</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>Age : </Text>
              <TextInput
                placeholder="3"
                keyboardType="numeric"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={age}
                onChangeText={setAge}
              />
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>Poids : </Text>
              <TextInput
                placeholder="5"
                keyboardType="numeric"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>Plat préferé : </Text>
              <TextInput
                placeholder="Croquettes"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={favoriteFood}
                onChangeText={setFavoriteFood}
              />
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>Lieu favoris : </Text>
              <TextInput
                placeholder="Parc"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={favoritePlace}
                onChangeText={setFavoritePlace}
              />
            </View>
            <View style={tw`flex-row mt-5`}>
              <Text style={tw`text-base text-gray-700`}>Jouet preféré : </Text>
              <TextInput
                placeholder="balle"
                style={tw`border border-gray-300 rounded-xl px-2`}
                value={favoriteToy}
                onChangeText={setFavoriteToy}
              />
            </View>
            <View style={tw`flex mt-5 items-center`}>
              <Text style={tw`text-base text-gray-700`}>
                Dis nous tout sur lui !{" "}
              </Text>
              <TextInput
                placeholder="Il est très joueur et aime dormir au soleil..."
                style={tw`border border-gray-300 rounded-xl px-2 mt-2`}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
          <View style={tw`flex items-center`}>
            <TouchableOpacity
              style={tw`m-5 items-center p-3 bg-[#D03312] rounded-lg w-5/6`}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  tw`flex text-base text-white`,
                  { fontFamily: "Alata_400Regular" },
                ]}
              >
                Valider
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ChooseDogImageModal
          visible={isModalVisible}
          onSelectImage={(image) => {
            setSelectedImage(image);
            closeModal();
          }}
          onClose={closeModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAnimals;
