import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar/>
      <NavigationContainer style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen name="SearchScreen" component={SearchScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Details" component={DetailsScreen}
              options={{
                title: 'Weather details',
                headerTitleAlign: 'center',
              }}
                
            />
            </Stack.Navigator>
          </NavigationContainer>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
