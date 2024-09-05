import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import { SearchedData } from "@/app/search-modal";

interface SearchedListProps {
  data: SearchedData[];
  isLoading: boolean;
}

export const SearchedList = ({ data, isLoading }: SearchedListProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="whitesmoke" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {!isLoading && data.length === 0 && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>City not found!</Text>
        </View>
      )}
      {!isLoading && data.length > 0 && (
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.searchedList}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.replace({
                  pathname: "/",
                  params: {
                    name: item.name.trim(),
                    state: item.state,
                  },
                })
              }
              style={({ pressed }) =>
                pressed
                  ? [styles.item, { backgroundColor: "#525252" }]
                  : styles.item
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.state}>{item.state}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#404040",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "whitesmoke",
    fontSize: 12,
    marginTop: 10,
  },
  notFoundContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  notFoundText: {
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "700",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  searchedList: {
    paddingBottom: 20,
  },
  item: {
    width: "100%",
    padding: 10,
    paddingLeft: 30,
  },
  name: {
    color: "white",
    fontSize: 20,
  },
  state: {
    color: "#F5F5F5",
    fontSize: 12,
  },
});
