import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { gerbil } from "../assets";

const GerbilTalking = () => {
  const [isTextVisible, setTextVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const message = "Bonjour ! Comment vas-tu ? Méline le caca boudin !";
  const intervalIdRef = useRef(null);

  // Utiliser Animated.Value pour la position initiale (0 signifie pas de déplacement)
  const moveAnim = useRef(new Animated.Value(0)).current; // Modification ici

  const handlePress = () => {
    setTextVisible(!isTextVisible);
    if (!isTextVisible) {
      animateText(message);
      // Animez la position de l'image en utilisant transform avec translateX
      Animated.spring(moveAnim, {
        toValue: -100, // Déplacer l'image de 100 unités vers la droite
        useNativeDriver: true, // Maintenant compatible avec useNativeDriver
      }).start();
    } else {
      setAnimatedText("");
      clearInterval(intervalIdRef.current);
      // Retour à la position initiale
      Animated.spring(moveAnim, {
        toValue: 0, // Revenir à la position de départ
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
    }, 50); // Ajustez la vitesse d'animation ici
  };

  useEffect(() => {
    return () => clearInterval(intervalIdRef.current);
  }, []);

  return (
    <View style={tw`flex-row items-center justify-center`}>
      <Animated.View
        style={{
          transform: [{ translateX: moveAnim }], // Utilisez translateX pour le déplacement
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
