import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { USER } from "../../api/mockData";

const PromptInput = () => {
  const [text, setText] = useState("");
  const { dispatch } = useAppContext();

  const handleSend = () => {
    if (text.trim()) {
      dispatch({ type: "ADD_MESSAGE", payload: { text, user: USER } });
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type your message..."
        placeholderTextColor="#999"
      />
      <Pressable style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#007AFF",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PromptInput;
