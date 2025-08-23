// src/screens/AIChatScreen.tsx

import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable, // FIX: Import Pressable
} from "react-native";
// import { useDrawerStatus } from "@react-navigation/drawer"; // This import is unused
import { useAppContext } from "../context/AppContext";
import MessageBubble from "../components/chat/MessageBubble";
import PromptInput from "../components/chat/PromptInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const AIChatScreen = () => {
  const { state } = useAppContext();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);

  const activeThread = state.threads.find((t) => t.id === state.activeThreadId);

  useEffect(() => {
    if (activeThread?.messages.length) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [activeThread?.messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menuButton}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{activeThread?.title || "Chat"}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={activeThread?.messages || []}
          renderItem={({ item }) => <MessageBubble message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
        <PromptInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// FIX: Add the missing StyleSheet definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuButton: {
    fontSize: 24,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    paddingVertical: 10,
  },
});

export default AIChatScreen;
