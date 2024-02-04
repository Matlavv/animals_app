import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { gerbil } from "../assets";

const GerbilTalking = () => {
  const [isTextVisible, setTextVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const message = "Bonjour ! Comment vas-tu ?";
  const intervalIdRef = useRef(null);

  // Utiliser Animated.Value pour la position initiale (0 signifie pas de déplacement)
  const moveAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setTextVisible(!isTextVisible);
    if (!isTextVisible) {
      animateText(message);
      // Animez la position de l'image en utilisant transform avec translateX
      Animated.spring(moveAnim, {
        toValue: -100,
        useNativeDriver: true,
      }).start();
    } else {
      setAnimatedText("");
      clearInterval(intervalIdRef.current);
      // Retour à la position initiale
      Animated.spring(moveAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const animateText = (text) => {
    setAnimatedText("");
    let index = 0;
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      setAnimatedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(intervalIdRef.current);
      }
    }, 50);
  };

  useEffect(() => {
    return () => clearInterval(intervalIdRef.current);
  }, []);

  return (
    <View style={tw`flex-row items-center justify-center`}>
      <Animated.View
        style={{
          transform: [{ translateX: moveAnim }],
        }}
      >
        <TouchableOpacity onPress={handlePress}>
          <Image source={gerbil} style={{ width: 180, height: 250 }} />
        </TouchableOpacity>
      </Animated.View>
      {isTextVisible && (
        <View style={{ maxWidth: 50, marginLeft: -80 }}>
          <Text style={tw`mr-20 w-30 font-semibold `}>{animatedText}</Text>
        </View>
      )}
    </View>
  );
};

export default GerbilTalking;
