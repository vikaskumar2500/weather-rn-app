import { ForecastData } from "@/app/index.web";
import { formateDate } from "@/services/formate-date";
import { tempConvToF } from "@/services/tempConvToF";
import { Image, Text, View } from "react-native";

interface ForecastListProps {
  data: ForecastData[];
  isToggled: boolean;
  title: string;
}

export const ForecastList = ({ data, isToggled, title }: ForecastListProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        
      }}
    >
      <Text
        style={{
          color: "whitesmoke",
          fontSize: 18,
          fontWeight: "500",
          paddingLeft: 10,
          width: "100%",
          textAlign: "left",
          marginTop: 10,
        }}
      >
        {title}
      </Text>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 0.5,
            borderColor: "whitesmoke",
            borderRadius: 10,
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 5,
            paddingHorizontal: 40,
            width: "100%",
          }}
        >
          <Text style={{ color: "whitesmoke", fontSize: 12 }}>
            {formateDate(item.time)}
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.icon}.png`,
              }}
              alt="today forecast icon"
              style={{ width: 40, height: 40 }}
            />
            <Text
              style={{
                color: "whitesmoke",
                fontSize: 12,
                fontWeight: "300",
                marginTop: -5,
              }}
            >
              {item.description}
            </Text>
          </View>
          <Text style={{ color: "whitesmoke", fontSize: 24 }}>
            {Math.round(isToggled ? tempConvToF(item.temp) : item.temp)}&deg;
          </Text>
        </View>
      ))}
    </View>
  );
};
