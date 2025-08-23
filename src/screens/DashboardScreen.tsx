// src/screens/DashboardScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  UIManager,
  LayoutAnimation,
  Platform, // FIX: Import Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../context/AppContext";
import ChartWidget from "../components/dashboard/ChartWidget";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DashboardScreen = () => {
  const { state, dispatch } = useAppContext();
  const navigation = useNavigation();
  const activeDashboard = state.dashboards.find(
    (d) => d.id === state.activeDashboardId
  );

  const handleAddDashboard = () => {
    // FIX: Alert.prompt is not supported on web, so we use a fallback.
    if (Platform.OS === "web") {
      const name = prompt("Enter a name for the new dashboard");
      if (name) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        dispatch({ type: "ADD_DASHBOARD", payload: name });
      }
    } else {
      Alert.prompt(
        "New Dashboard",
        "Enter a name for the new dashboard",
        (name) => {
          if (name) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            dispatch({ type: "ADD_DASHBOARD", payload: name });
          }
        }
      );
    }
  };

  const handleDeleteDashboard = () => {
    if (!activeDashboard) return;
    Alert.alert(
      "Delete Dashboard",
      `Are you sure you want to delete "${activeDashboard.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            dispatch({ type: "DELETE_DASHBOARD", payload: activeDashboard.id });
          },
        },
      ]
    );
  };

  const handleAddWidget = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch({ type: "ADD_WIDGET" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menuButton}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <View style={styles.controls}>
        <Picker
          selectedValue={state.activeDashboardId}
          onValueChange={
            (itemValue) =>
              dispatch({ type: "SWITCH_DASHBOARD", payload: String(itemValue) }) // FIX: Ensure payload is a string
          }
          style={styles.picker}
        >
          {state.dashboards.map((d) => (
            <Picker.Item key={d.id} label={d.name} value={d.id} />
          ))}
        </Picker>
        <Pressable
          onPress={handleDeleteDashboard}
          style={styles.deleteDashButton}
        >
          <Text style={{ color: "red" }}>Delete</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activeDashboard ? (
          activeDashboard.widgets.map((widget) => (
            <ChartWidget key={widget.id} widget={widget} />
          ))
        ) : (
          <Text style={styles.placeholder}>
            No dashboard selected. Create one!
          </Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleAddDashboard}>
          <Text style={styles.buttonText}>Add Dashboard</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleAddWidget}
          disabled={!activeDashboard}
        >
          <Text style={styles.buttonText}>Add Widget</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuButton: { fontSize: 24, marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  picker: { flex: 1 },
  deleteDashButton: { padding: 10 },
  scrollContainer: { padding: 15 },
  placeholder: { textAlign: "center", marginTop: 50, color: "#888" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default DashboardScreen;
