import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { auth, db } from "../../firebaseConfig";

const AddMedical = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animalId } = route.params;
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!userId || !animalId) return;
    try {
      await addDoc(
        collection(db, `users/${userId}/animals/${animalId}/medicals`),
        { date, title }
      );
      alert("Rendez-vous ajouté avec succès.");
      navigation.goBack();
    } catch (e) {
      console.error("Erreur lors de l'ajout du document : ", e);
      alert("Erreur lors de l'ajout du rendez-vous.");
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      <Text style={tw`text-lg mb-2`}>Date:</Text>
      <TextInput
        style={[tw`border border-gray-300 p-2 rounded-lg w-full`, styles.input]}
        onChangeText={setDate}
        value={date}
        placeholder="JJ/MM/AAAA"
      />
      <Text style={tw`text-lg mb-2 mt-4`}>Titre:</Text>
      <TextInput
        style={[tw`border border-gray-300 p-2 rounded-lg w-full`, styles.input]}
        onChangeText={setTitle}
        value={title}
        placeholder="Entrez un titre"
      />
      <TouchableOpacity
        style={tw`mt-4 bg-blue-500 p-3 rounded-lg w-full items-center`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-lg`}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default AddMedical;
