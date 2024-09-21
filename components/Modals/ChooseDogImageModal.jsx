import React from "react";
import { Image, Modal, ScrollView, TouchableOpacity, View } from "react-native";
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
} from "../../assets";

const images = [
  {
    id: 1,
    image: dog,
    name: "dog",
  },
  {
    id: 2,
    image: dogFace,
    name: "dogFace",
  },
  {
    id: 3,
    image: catFace,
    name: "catFace",
  },
  {
    id: 4,
    image: fishFace,
    name: "fishFace",
  },
  {
    id: 5,
    image: gerbil,
    name: "gerbil",
  },
  {
    id: 6,
    image: hamsterFace,
    name: "hamsterFace",
  },
  {
    id: 7,
    image: hasmter,
    name: "hasmter",
  },
  {
    id: 8,
    image: snakeFace,
    name: "snakeFace",
  },
];

const ChooseDogImageModal = ({ onSelectImage, visible, onClose }) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white rounded-xl p-5 h-40 w-5/6`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`flex-row items-center justify-between p-5`}
          >
            {images.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  onSelectImage(item.name);
                  onClose();
                }}
                style={tw`mr-4`}
              >
                <Image source={item.image} style={tw`h-35 w-35`} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseDogImageModal;
