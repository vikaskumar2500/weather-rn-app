import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import SearchInput from "@/components/SearchInput.web";
import { SearchedList } from "@/components/SearchedList.web";

export type SearchedData = {
  id: string;
  name: string;
  state: string;
};
const SearchModal = () => {
  const [searchedData, setSearchedData] = useState<SearchedData[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleSearchedData = (data: SearchedData[]) =>
    setSearchedData(() => data);
  const handleLoadiing = (loading: boolean) => setLoading(loading);
  return (
    <ThemedView style={styels.container}>
      <SearchInput
        handleSearchedData={handleSearchedData}
        onLoading={handleLoadiing}
      />

      <SearchedList isLoading={isLoading} data={searchedData || []} />
    </ThemedView>
  );
};
const styels = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default SearchModal;
