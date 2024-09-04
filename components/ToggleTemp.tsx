import React from "react";
import { View, Text, Switch } from "react-native";

interface ToggleTempProps {
  isToggled: boolean;
  handleToggled: () => void;
}

const ToggleTemp = ({ isToggled, handleToggled }: ToggleTempProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch
          trackColor={{ false: "#4F46E5", true: "#81b0ff" }}
          thumbColor={isToggled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggled}
          value={isToggled}
        />
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          {isToggled ? "F" : "C"}
        </Text>
      </View>
    </View>
  );
};

export default ToggleTemp;
