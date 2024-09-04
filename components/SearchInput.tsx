import React, { useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import { ThemedView } from "./ThemedView";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { searchCities } from "@/services/search-cities";
import { SearchedData } from "@/app/search-modal";

const Schema = z.object({
  city: z.string(),
});

type FieldValues = z.infer<typeof Schema>;

interface SearchInputProps {
  handleSearchedData: (data: SearchedData[]) => void;
  onLoading: (loading: boolean) => void;
}

const SearchInput = ({ handleSearchedData, onLoading }: SearchInputProps) => {
  const { goBack } = useNavigation();
  const { register, handleSubmit, setValue, watch, resetField } =
    useForm<FieldValues>({
      resolver: zodResolver(Schema),
      mode: "onSubmit",
      defaultValues: {
        city: "",
      },
    });

  useEffect(() => {
    (async () => {
      const lastSearched = await AsyncStorage.getItem("last_searched");
      if (lastSearched) {
        const lastSearchedData = JSON.parse(lastSearched) as SearchedData[];
        handleSearchedData(lastSearchedData);
      } else {
        handleSearchedData([]);
      }
    })();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const { city } = data;
    try {
      onLoading(true);
      const res = await searchCities(city);
      const data = res.data.data;
      handleSearchedData(data);
      await AsyncStorage.setItem("last_searched", JSON.stringify(data));
    } catch (e: any) {
      console.log("Error while search by city name", e.message);
      handleSearchedData([]);
    } finally {
      onLoading(false);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <StatusBar backgroundColor={"#94A3B8"} />
      <ThemedView style={styles.inputContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <TabBarIcon
            name="arrow-back-outline"
            color={"whitesmoke"}
            size={24}
          />
        </TouchableOpacity>
        <TextInput
          textContentType="addressCityAndState"
          {...register("city")}
          onChangeText={(val) => setValue("city", val)}
          keyboardType="name-phone-pad"
          placeholder="Search by your city..."
          placeholderTextColor={"whitesmoke"}
          style={styles.input}
          value={watch("city") || ""}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType="search"
        />
        {watch("city")?.length > 0 && (
          <TouchableOpacity
            style={styles.eraseInput}
            onPress={() => resetField("city")}
          >
            <TabBarIcon name="close-outline" color={"whitesmoke"} size={28} />
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#64748B",
  },
  inputContainer: {
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "whitesmoke",
    backgroundColor: "#737373",
    backfaceVisibility: "visible",
  },
  input: {
    paddingLeft: 30,
    paddingVertical: 5,
    color: "whitesmoke",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    top: 17,
    left: 12,
    zIndex: 10,
  },
  eraseInput: {
    position: "absolute",
    top: 17,
    right: 12,
    zIndex: 10,
  },
});

export default SearchInput;
