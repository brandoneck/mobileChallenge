import { useState } from 'react';
import {Text, TextInput, SafeAreaView, StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { getPlaces } from "../constants/urls";
import { useFetch } from '../hooks/useFetch';

interface DataPlaces {
  ascii_display: string;
  city_ascii_name: string;
  city_name: string;
  city_slug: string;
  country: string;
  display: string;
  id: string;
  lat: string;
  long: string;
  popularity: string;
  result_type: string;
  slug: string;
  sort_criteria: string;
  state: string;
}

export default function SearchScreen({ navigation }) {
  const { getData } = useFetch();
  const [placesData, setPlacesData] = useState<Array<DataPlaces>>([]);

  const handleSearch = async (value: string | null): Promise<void> => {
    try {
      const response = await getData(getPlaces(value));
      if (response.data) {
        setPlacesData(response.data);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <SafeAreaView style={styleLayout.mainContainer}>
      <View>
        <Image
          style={styleLayout.banner}
          source={{
            uri:
              "https://unicorn-cdn.b-cdn.net/5b42df99-17d2-470a-be9e-0592b04058af/reservamos-logo-azul.png",
          }}
        />
      </View>

      <TextInput
        style={styleLayout.searchInput}
        placeholder="Search"
        clearButtonMode="always"
        onChangeText={(value) => handleSearch(value)}
      />
      {placesData && (
        <ScrollView>
          {placesData?.map((place) => (
            <TouchableOpacity
              style={styleLayout.searchText}
              onPress={() =>
                navigation.navigate("Details", {
                  name: place.display,
                  country: place.country,
                  lat: place.lat,
                  long: place.long,
                })
              }
            >
              <Text>{`${place.display}, ${place.city_name}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styleLayout = StyleSheet.create({
  mainContainer: {
    flex: 1, padding: 20, margin: 10, backgroundColor: 'white'
  },
  searchInput: {
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal:20,
    paddingVertical:10,

  },
  banner: {
    width: 250, height: 40, marginTop:20, marginBottom: 20, alignSelf: 'center'
  },
  searchText: {
    padding: 5,
  },
});