import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Image,
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
  redPaw,
  snakeFace,
} from "../../assets";
import ChooseDogImageModal from "../../components/Modals/ChooseDogImageModal";
import { auth, db } from "../../firebaseConfig";

const UpdateAnimalForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animal } = route.params;

  const [name, setName] = useState(animal.name);
  const [age, setAge] = useState(animal.age.toString());
  const [weight, setWeight] = useState(animal.weight.toString());
  const [favoriteFood, setFavoriteFood] = useState(animal.favoriteFood);
  const [favoritePlace, setFavoritePlace] = useState(animal.favoritePlace);
  const [favoriteToy, setFavoriteToy] = useState(animal.favoriteToy);
  const [selectedImage, setSelectedImage] = useState(animal.imageName);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState(animal.description);

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

  const handleSubmit = async () => {
    const animalRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "animals",
      animal.id
    );

    try {
      await updateDoc(animalRef, {
        name,
        age,
        weight,
        favoriteFood,
        favoritePlace,
        imageName: selectedImage,
        favoriteToy,
        description,
      });
      Alert.alert(
        "Succès",
        "Les informations de l'animal ont été mises à jour."
      );
      navigation.navigate("AnimalsList");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'animal", error);
      Alert.alert("Erreur", "Un problème est survenu lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    const animalRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "animals",
      animal.id
    );

    try {
      await deleteDoc(animalRef);
      Alert.alert("Succès", "L'animal a été supprimé.");
      navigation.navigate("AnimalsList");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'animal", error);
      Alert.alert("Erreur", "Un problème est survenu lors de la suppression.");
    }
  };

  const renderImage = () => {
    const imageSource = imageMap[selectedImage];
    return <Image source={imageSource} style={tw`h-45 w-45`} />;
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

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
      <View style={tw`relative`}>
        <View style={tw`flex items-center justify-center`}>
          <Image
            source={redPaw}
            style={[
              tw`absolute`,
              { left: -30, top: -20, width: 157, height: 150, opacity: 0.4 },
              { transform: [{ rotate: "40deg" }] },
            ]}
          />
          {renderImage()}
          <TouchableOpacity
            style={tw`absolute bottom-0 left-60 rounded-full bg-white p-2`}
            onPress={openModal}
          >
            <Ionicons name={"pencil-outline"} size={30} color="black" />
          </TouchableOpacity>
          <Image
            source={redPaw}
            style={[
              tw`absolute`,
              {
                right: -30,
                bottom: -40,
                width: 157,
                height: 150,
                opacity: 0.4,
              },
              { transform: [{ rotate: "-40deg" }] },
            ]}
          />
        </View>
      </View>
      {/* White space with animal info */}
      <View style={tw`flex bg-[#F9F9F9] h-full rounded-t-20`}>
        <View style={tw`flex items-center justify-between p-5`}>
          <Text
            style={[
              tw`text-2xl mt-4 items-center overflow-hidden text-center`,
              { fontFamily: "Alata_400Regular" },
            ]}
          >
            Dis nous en plus sur ton animal !
          </Text>
          <View style={tw`mt-3`}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>Son nom</Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son nom"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={tw``}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>Son age</Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son age"
              value={age}
              onChangeText={setAge}
            />
          </View>
          <View style={tw``}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>
              Son poids
            </Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son poids"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={tw``}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>
              Son aliment préféré
            </Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son aliment préféré"
              value={favoriteFood}
              onChangeText={setFavoriteFood}
            />
          </View>
          <View style={tw``}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>
              Son lieu favoris
            </Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son lieu favoris"
              value={favoritePlace}
              onChangeText={setFavoritePlace}
            />
          </View>
          <View style={tw``}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>
              Son jouet préféré
            </Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son jouet préféré"
              value={favoriteToy}
              onChangeText={setFavoriteToy}
            />
          </View>
          <View style={tw``}>
            <Text style={tw`ml-1 mb-1 text-[#DEB7B6] font-bold`}>
              Ses informations
            </Text>
            <TextInput
              style={tw`border-2 border-[#FFE5E4] font-bold text-base rounded-3xl bg-white p-2 px-3 mb-4 shadow-md w-50`}
              placeholder="Son jouet préféré"
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
              Valider les modifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`mb-4 items-center p-3 rounded-lg w-5/6`}
            onPress={handleDelete}
          >
            <Text
              style={[
                tw`flex text-base text-black`,
                { fontFamily: "Alata_400Regular" },
              ]}
            >
              Supprimer l'animal
            </Text>
          </TouchableOpacity>
        </View>
        <ChooseDogImageModal
          visible={isModalVisible}
          onSelectImage={(image) => {
            setSelectedImage(image);
            closeModal();
          }}
          onClose={closeModal}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateAnimalForm;
