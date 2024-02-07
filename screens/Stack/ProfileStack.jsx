import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import SettingsScreen from "../SettingsScreen";
import UserProfile from "../UserProfile";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
