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
    <>
      {isLoading && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60%",
            gap: 3,
          }}
        >
          <ActivityIndicator size="large" color="whitesmoke" />
          <Text style={{ color: "whitesmoke", fontSize: 12 }}>Loading...</Text>
        </View>
      )}
      {!isLoading && data.length === 0 && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60%",
          }}
        >
          <Text
            style={{ color: "whitesmoke", fontSize: 20, fontWeight: "700" }}
          >
            city not found!
          </Text>
        </View>
      )}
      {!isLoading && data.length > 0 && (
        <FlatList
          scrollEnabled={true}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.searchedList}
          data={data}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.replace({
                  pathname: "/",
                  params: {
                    name: item.name.trim().split(/[ ,?]/)[0],
                    state: item.state,
                  },
                })
              }
              style={({ pressed }) =>
                pressed
                  ? [styles.item, { backgroundColor: "#525252", width: "100%" }]
                  : styles.item
              }
              key={item.id}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.state}>{item.state}</Text>
            </Pressable>
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  searchedList: {
    display: "flex",
    flexDirection: "column",
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
