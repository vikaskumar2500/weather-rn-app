import { Text, View } from "react-native";

interface ErrorPageProps {
  error: string;
}
export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        marginTop: 70,
      }}
    >
      <Text style={{ color: "#FB7185", fontSize: 16 }}>{error}</Text>
    </View>
  );
}
