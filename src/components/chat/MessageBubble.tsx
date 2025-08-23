import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Message } from "../../types";
import { USER } from "../../api/mockData";
import useSimulatedTyping from "../../hooks/useSimulatedTyping"; // Bonus feature

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.user.id === USER.id;
  const isAI = message.user.id !== USER.id;

  // Bonus: Use custom hook for typing effect for AI messages
  const displayedText = isAI ? useSimulatedTyping(message.text) : message.text;

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <Text style={isUser ? styles.userText : styles.aiText}>
        {displayedText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
  },
  userContainer: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  aiContainer: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  userText: {
    color: "white",
  },
  aiText: {
    color: "black",
  },
});

export default MessageBubble;
