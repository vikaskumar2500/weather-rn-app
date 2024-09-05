import React from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

interface HeaderProps {
  name: string;
  isLoading: boolean;
}

const Header = ({ name, isLoading }: HeaderProps) => {
  const navigator: any = useNavigation();

  return (
    <ThemedView style={styles.header}>
      {!isLoading && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{name}</ThemedText>
          <TabBarIcon name="location-outline" size={14} color={"whitesmoke"} />
        </ThemedView>
      )}
      {isLoading && (
        <ThemedView style={styles.stepContainer}>
          <ActivityIndicator size="small" color="#f2f2f2" />
        </ThemedView>
      )}
      <TouchableOpacity onPress={() => navigator.navigate("search-modal")}>
        <TabBarIcon name="search-outline" color={"whitesmoke"} size={24} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "static",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    paddingHorizontal:20,
    borderBottomWidth: 0.4,
    borderBottomColor: "whitesmoke",
    marginTop:8,
  },
  stepContainer: {
    gap: 2,
  },
});

export default Header;
