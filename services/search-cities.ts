import axios from "axios";

export const searchCities = async (city: string) =>
  await axios(`${process.env.EXPO_PUBLIC_GET_ALL_CITIES}?searchText=${city}`);
