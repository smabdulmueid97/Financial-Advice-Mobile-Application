import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAppContext } from "../context/AppContext";
import ThreadItem from "../components/chat/ThreadItem";

const CustomDrawerContent = (props: any) => {
  const { state, dispatch } = useAppContext();

  const handleSelectThread = (threadId: string) => {
    dispatch({ type: "SWITCH_THREAD", payload: threadId });
    props.navigation.closeDrawer();
    props.navigation.navigate("Chat");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Conversations</Text>
        {state.threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            isActive={state.activeThreadId === thread.id}
            onPress={() => handleSelectThread(thread.id)}
          />
        ))}
        <View style={styles.divider} />
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
});

export default CustomDrawerContent;
