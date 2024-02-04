import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

const Stack = createNativeStackNavigator();

const ProfileUnloggedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
    </Stack.Navigator>
  );
};

export default ProfileUnloggedStack;
