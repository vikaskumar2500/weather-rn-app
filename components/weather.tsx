import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
interface Data {
  temp?: number;
  icon?: string;
  description?: string;
}
interface WeatherProps {
  data: Data;
  isLoading: boolean;
}

const Weather = ({ isLoading, data }: WeatherProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 20,
      }}
    >
      {!isLoading && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 90,
              fontWeight: "500",
              color: "whitesmoke",
            }}
          >
            {data?.temp}
          </Text>
          <Text style={{ fontSize: 45, color: "whitesmoke", marginTop: 20 }}>
            &deg;
          </Text>
        </View>
      )}

      {!isLoading && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -20,
          }}
        >
          <Image
            style={{ objectFit: "cover", height: 60, width: 60 }}
            source={{
              uri: `https://openweathermap.org/img/wn/${data?.icon}.png`,
            }}
            alt="Weather icon"
          />
          <Text
            style={{ color: "whitesmoke", fontSize: 16, fontWeight: "600" }}
          >
            {data?.description}
          </Text>
        </View>
      )}
      {isLoading && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="whitesmoke" />
        </View>
      )}
    </View>
  );
};

export default Weather;
