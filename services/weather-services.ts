import axios from "axios";

interface SearchProps {
  zip?: string;
  q?: string;
  lat?: number;
  lon?: number;
  appid?: string;
  units?: string;
  cnt?: number;
}

export const getWeatherData = async (
  infoType: string,
  searchParams: SearchProps
) => {
  const url = new URL(
    process.env.EXPO_PUBLIC_WEATHER_END_POINT + "/" + infoType
  );
  url.search = new URLSearchParams({
    ...searchParams,
    zip: searchParams.zip ? `${searchParams.zip},"in"` : "",
    appid: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    units: "metric",
  } as any).toString();

  return await axios(`${url}`);
};
