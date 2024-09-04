import { useEffect, useRef, useState } from "react";
import { StatusBar, ScrollView, View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { getWeatherData } from "../services/weather-services";
import Weather from "@/components/weather";
import DailyForecast from "@/components/DailyForecast";
import Header from "@/components/Header";
import ToggleTemp from "@/components/ToggleTemp";
import { tempConvToF } from "@/services/tempConvToF";
import ErrorPage from "@/components/ErrorPage";

export interface WeatherData {
  name: string;
  temp: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}
export interface ForecastData {
  temp: number;
  time: string;
  description: string;
  icon: string;
}

export default function HomeScreen() {
  const [isToggled, setToggled] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const params = useLocalSearchParams<{ name: string; state: string }>();

  const handlToggled = () => setToggled((prev) => !prev);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [weatherRes, forecastRes] = await Promise.allSettled([
          await getWeatherData("weather", { q: params.name || "jaipur" }),
          await getWeatherData("forecast", {
            q: params.name || "jaipur",
            cnt: 8,
          }),
        ]);
        if (
          weatherRes.status === "rejected" ||
          forecastRes.status === "rejected"
        )
          throw new Error("Something went wrong!");
        const wData = weatherRes.value.data;
        setWeatherData(() => ({
          name: wData.name,
          temp: wData.main.temp,
          description: wData.weather[0].description,
          icon: wData.weather[0].icon,
          sunrise: wData.sys.sunrise,
          sunset: wData.sys.sunset,
        }));
        const fData = forecastRes.value.data;
        const filteredData = fData.list.map((d: any) => ({
          time: d.dt_txt,
          temp: d.main.temp,
          description: d.weather[0].description,
          icon: d.weather[0].icon,
        }));
        setForecastData(() => filteredData);
        setError(null);
      } catch (e: any) {
        console.log("Error while fetching weather data", e.message);
        setError(e.message);
        setWeatherData(null);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={"#D4D4D4"} />
      <Header name={weatherData?.name || "_"} isLoading={isLoading} />
      {!error ? (
        <ParallaxScrollView
          style={{ position: "relative" }}
          headerBackgroundColor={{ color: "#71717A" }}
        >
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <ToggleTemp isToggled={isToggled} handleToggled={handlToggled} />
            <Weather
              isLoading={isLoading}
              data={{
                description: weatherData?.description,
                icon: weatherData?.icon,
                temp: Math.round(
                  isToggled
                    ? tempConvToF(weatherData?.temp || 0)
                    : weatherData?.temp || 0
                ),
              }}
            />
            {!isLoading && (
              <DailyForecast data={forecastData} isToggled={isToggled} />
            )}
          </ScrollView>
        </ParallaxScrollView>
      ) : (
        <ErrorPage error={error || ""} />
      )}
    </>
  );
}
