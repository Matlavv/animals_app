import React from "react";
import { Image, Modal, ScrollView, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { dog, dogFace } from "../../assets";

const images = [
  {
    id: 1,
    image: dog,
  },
  {
    id: 2,
    image: dogFace,
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
                  onSelectImage(item.image);
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
