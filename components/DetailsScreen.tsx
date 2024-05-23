import * as React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getWeatherList } from '../constants/urls';
import { useFetch } from '../hooks/useFetch';

interface Weather {
    current: any | undefined;
    hourly: any | undefined;
  }

const DetailsScreen = ({ navigation, route }) => {
  const { getData } = useFetch();
  const moment = require("moment");
  const [weatherData, setWeatherData] = useState<Array<Weather>>();
  const [errorMessage, setErrorMessage] = useState(false);
  const today = new Date();

  const getDateName = (day: number): string => {
    var newDate = moment(today, "DD-MM-YYYY").add("days", day);
    return newDate.format("dddd-DD-MM-YYYY");
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async (): Promise<void> => {
    setErrorMessage(false);
    try {
      const place = route.params;
      const response = await getData(getWeatherList(place.lat, place.long));

      if (response.data) {
        console.log(response.data);
        setWeatherData(response.data);
      }
    } catch (error: any) {
        setErrorMessage(true)
      console.log("fail");
      throw new Error(error);
    }
  };

  return (
    <SafeAreaView style={styleDetails.mainContainer}>
      <ScrollView style={styleDetails.container}>
        <Image
          style={styleDetails.banner}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/10127/10127236.png",
          }}
        />
        <View style={styleDetails.detailsView}>
          <Text style={styleDetails.titlePlace}>
            {`${route.params.name}, ${route.params.country}`}
          </Text>

          {weatherData?.daily?.map((day, index) => (
            <View style={styleDetails.daysView}>
              <Text style={styleDetails.titleDay}>{getDateName(index)}</Text>
              <Text style={styleDetails.title}>
                {`Description: `}
                <Text style={styleDetails.text}>
                  {`${day.weather[0].description}`}
                </Text>
              </Text>

              <Text style={styleDetails.title}>
                {`Min: `}
                <Text style={styleDetails.text}>{`${day.temp.min}`}</Text>
                {`, Max: `}
                <Text style={styleDetails.text}>{`${day.temp.min}`}</Text>
              </Text>
            </View>
          ))}
        </View>
        {errorMessage && (
          <Text style={styleDetails.errorText}>
            No results found!
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styleDetails = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    margin: 10,
    backgroundColor: "white",
  },
  container: {
    padding: "20px",
    flex: 1,
  },
  detailsView:{
    alignItems: "center",
    gap:12
  },
  daysView: {
    marginTop: "20px",
    alignItems: "center",
  },
  banner: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  titlePlace: {
    fontWeight: "bold",
    fontSize: 20,
    color: 'blue'
  },
  titleDay: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'red',
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    fontWeight: "normal",
  },
  errorText: {
    fontWeight: "bold",
    fontSize: 18,
    color: 'red',
    textAlignVertical: "center",
    paddingTop: 40,
    textAlign: "center",
  },
});
