import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const expoConfig = Constants.expoConfig || {};
const { extra } = expoConfig;

const firebaseConfig = {
  apiKey: "AIzaSyCS048UK1tiUPxyrq0BCRcNJSxgmVfHSN8",
  authDomain: "animalzz-35e64.firebaseapp.com",
  projectId: "animalzz-35e64",
  storageBucket: "animalzz-35e64.appspot.com",
  messagingSenderId: "197197222649",
  appId: "1:197197222649:web:e3c103fda9068e34c00828",
  measurementId: "G-DGDQVHHZGW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
