import type { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { ThemedView } from "@/components/ThemedView";

type Props = PropsWithChildren<{
  headerBackgroundColor: { color?: string };
  style?: StyleProp<ViewStyle>;
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
  style,
}: Props) {
  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: headerBackgroundColor.color },
        style,
      ]}
    >
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
  },
  content: {
    flex: 1,
    paddingBottom:20,
    paddingHorizontal:10,
    overflow: "hidden",
    width:"100%",
  },
});
