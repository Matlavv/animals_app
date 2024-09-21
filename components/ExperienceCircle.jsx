import React from "react";
import { Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import tw from "twrnc";

const ExperienceCircle = ({ experience }) => {
  const strokeWidth = 10; // Largeur de la ligne du cercle
  const radius = 40; // Rayon du cercle
  const circumference = 2 * Math.PI * radius; // Circonférence du cercle
  const svgDimension = radius * 2 + strokeWidth * 2;

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * experience) / 100;

  return (
    <View style={tw`items-center justify-center`}>
      <Svg width={svgDimension} height={svgDimension}>
        <Circle // Cercle de fond (partie non remplie)
          cx={halfCircle}
          cy={halfCircle}
          r={radius}
          stroke="#D2EBFE"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle // Cercle d'expérience (partie remplie)
          cx={halfCircle}
          cy={halfCircle}
          r={radius}
          stroke="#3498db" // Couleur de remplissage pour l'expérience acquise
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round" // Arrondir les extrémités de l'arc
          strokeDasharray={circumference} // Crée un tableau pour l'animation
          strokeDashoffset={strokeDashoffset} // Décalage de l'arc pour montrer l'expérience
          transform={`rotate(-90, ${halfCircle}, ${halfCircle})`} // Rotation pour démarrer de haut
        />
      </Svg>
      <View style={tw`absolute`}>
        <Text style={tw`text-blue-800 text-lg font-bold`}>20</Text>
      </View>
    </View>
  );
};

export default ExperienceCircle;
