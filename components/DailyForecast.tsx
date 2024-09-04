import { View, Text, FlatList, Image } from "react-native";
import React, { useCallback, useMemo } from "react";
import { ForecastData } from "@/app";
import { ForecastList } from "./ForecastList";


interface DailyForecastProps {
  isToggled: boolean;
  data: ForecastData[];
}
const DailyForecast = ({ data, isToggled }: DailyForecastProps) => {
  const todayData = useMemo(() => {
    return data.filter((d) => {
      const date = new Date(d.time);
      const todayDate = new Date();
      if (date.getDate() === todayDate.getDate()) return true;
    });
  }, [data]);

  const tomorrowData = useMemo(() => {
    return data.filter((d) => {
      const date = new Date(d.time);
      const todayDate = new Date();
      if (date.getDate() === todayDate.getDate() + 1) return true;
    });
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: "whitesmoke",
          fontSize: 24,
          fontWeight: "600",
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        24-Hour Forecast
      </Text>
      {todayData.length > 0 && (
        <ForecastList title="Today" data={todayData} isToggled={isToggled} />
      )}
      {tomorrowData.length > 0 && (
        <ForecastList
          title="Tomorrow"
          data={tomorrowData}
          isToggled={isToggled}
        />
      )}
    </View>
  );
};

export default DailyForecast;
