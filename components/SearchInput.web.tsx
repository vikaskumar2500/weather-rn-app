import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
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
  const [focus, setFocus] = useState(false);
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
      <ThemedView style={styles.inputContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <TabBarIcon
            name="arrow-back-outline"
            color={"whitesmoke"}
            size={24}
          />
        </TouchableOpacity>
        <TextInput
          onFocus={() => setFocus(true)}
          textContentType="addressCityAndState"
          {...register("city", {onBlur:()=>setFocus(false)})}
          onChangeText={(val) => setValue("city", val)}
          keyboardType="name-phone-pad"
          placeholder="Search by your city..."
          placeholderTextColor={"whitesmoke"}
          style={[styles.input, focus && styles.focus]}
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
    paddingTop: 10,
    backgroundColor: "#737373",
  },
  inputContainer: {
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "whitesmoke",
    backfaceVisibility: "visible",
  },
  input: {
    paddingLeft: 30,
    paddingVertical: 5,
    color: "whitesmoke",
    fontSize: 18,
    fontWeight: "700",
    borderWidth: 0,
    padding: 10,
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
  focus: {
    borderColor: "transparent",
    borderWidth: 0,
    outlineStyle: "none",
  },
});

export default SearchInput;
