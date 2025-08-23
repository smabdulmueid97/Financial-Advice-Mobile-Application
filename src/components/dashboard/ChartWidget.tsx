// src/components/dashboard/ChartWidget.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  UIManager,
  LayoutAnimation,
  Platform, // FIX: Import Platform
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Widget } from "../../types";
import { useAppContext } from "../../context/AppContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ChartWidgetProps {
  widget: Widget;
}

const ChartWidget = ({ widget }: ChartWidgetProps) => {
  const { dispatch } = useAppContext();

  const handleDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({ type: "DELETE_WIDGET", payload: widget.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{widget.title}</Text>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>✕</Text>
        </Pressable>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={widget.chartData}
          height={150}
          color="#007AFF"
          thickness={3}
          startFillColor="rgba(0,122,255,0.1)"
          endFillColor="rgba(0,122,255,0.1)"
          yAxisTextStyle={{ color: "#555" }}
          xAxisLabelTextStyle={{ color: "#555" }}
          rulesColor="#eee"
          rulesType="solid"
          initialSpacing={10}
          noOfSections={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 18,
    color: "#999",
  },
  chartContainer: {
    paddingRight: 20,
  },
});

export default ChartWidget;
