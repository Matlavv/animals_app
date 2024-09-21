import { Ionicons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { auth, db } from "../firebaseConfig";

const ChatBot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [canAsk, setCanAsk] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser.uid;
    const messagesRef = collection(db, "generate");
    const q = query(messagesRef, where("userId", "==", currentUser));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      let questionCount = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.prompt) {
          newMessages.push({
            message: data.prompt,
            type: "question",
            timestamp: data.createTime,
          });
          questionCount++;
        }
        if (data.response) {
          newMessages.push({
            message: data.response,
            type: "response",
            timestamp: data.createTime,
          });
        }
      });

      setMessages(newMessages.sort((a, b) => a.timestamp - b.timestamp));
      setCanAsk(questionCount < 50);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (!canAsk) {
      Alert.alert(
        "Limite atteinte",
        "Vous ne pouvez pas poser plus de 50 questions."
      );
      return;
    }

    await addDoc(collection(db, "generate"), {
      userId: auth.currentUser.uid,
      prompt: inputText,
      createTime: Date.now(),
    });
    setInputText("");
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`flex items-center mt-15`}>
          <Text style={[tw`text-3xl`, { fontFamily: "AutourOne_400Regular" }]}>
            Animalzz
          </Text>
        </View>
        <ScrollView style={tw`flex-1`}>
          <View style={tw`mt-10`}>
            {/* Affichage des messages */}
            {messages.map((msg, index) => (
              <View
                key={index}
                style={tw`m-2 w-98 p-3 rounded-xl ${
                  msg.type === "response" ? "bg-[#d2ebfe]" : "bg-[#FFE5E4]"
                }`}
              >
                <Text>{msg.message}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={tw`border-t border-gray-200 flex-row items-center p-2`}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Votre question"
            style={tw`flex-1 bg-gray-100 rounded-full p-2`}
          />
          <TouchableOpacity onPress={handleSendMessage} style={tw`ml-2`}>
            <Ionicons name="send" size={24} color="#D03312" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatBot;
