import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import SearchInput from "@/components/SearchInput";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SearchedList } from "@/components/SearchedList";

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
      <ThemedView
        style={{
          backgroundColor: "#404040",
          minHeight:"100%",
          paddingBottom:30,
        }}
      >
        <SearchedList isLoading={isLoading} data={searchedData || []} />
      </ThemedView>
    </ThemedView>
  );
};
const styels = StyleSheet.create({
  container: {
    flex:1,
    width: "100%",
    minHeight:'100%'
  },
});

export default SearchModal;
