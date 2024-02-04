import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddAnimal from "../AddAnimals";
import AnimalDetails from "../AnimalDetails";
import AnimalsList from "../AnimalsList";

const Stack = createNativeStackNavigator();

const AnimalsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AnimalsList" component={AnimalsList} />
      <Stack.Screen name="AnimalDetails" component={AnimalDetails} />
      <Stack.Screen name="AddAnimal" component={AddAnimal} />
    </Stack.Navigator>
  );
};

export default AnimalsStack;
