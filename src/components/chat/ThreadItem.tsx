import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  Animated,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useAppContext } from "../../context/AppContext";
import { Thread } from "../../types";

interface ThreadItemProps {
  thread: Thread;
  isActive: boolean;
  onPress: () => void;
}

const ThreadItem = ({ thread, isActive, onPress }: ThreadItemProps) => {
  const { dispatch } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(thread.title);
  const translateX = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      if (nativeEvent.translationX < -100) {
        handleDelete();
      }
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Thread",
      `Are you sure you want to delete "${thread.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            dispatch({ type: "DELETE_THREAD", payload: thread.id }),
        },
      ]
    );
  };

  const handleLongPress = () => setIsEditing(true);

  const handleTitleSubmit = () => {
    if (title.trim()) {
      dispatch({
        type: "EDIT_THREAD_TITLE",
        payload: { threadId: thread.id, newTitle: title },
      });
    } else {
      setTitle(thread.title); // Reset if empty
    }
    setIsEditing(false);
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View style={[styles.wrapper, { transform: [{ translateX }] }]}>
        <View style={styles.deleteAction}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
        <Pressable
          onPress={onPress}
          onLongPress={handleLongPress}
          style={[styles.container, isActive && styles.activeContainer]}
        >
          {isEditing ? (
            <TextInput
              value={title}
              onChangeText={setTitle}
              onBlur={handleTitleSubmit}
              autoFocus
              style={styles.input}
            />
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {thread.title}
            </Text>
          )}
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  deleteAction: {
    position: "absolute",
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
  },
  activeContainer: {
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    fontSize: 16,
    color: "#333",
    padding: 0,
    margin: 0,
  },
});

export default ThreadItem;
