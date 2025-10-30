import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function Index() {
    // set weather type as any to avoid strict type checking
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cityWeatherList, setCityWeatherList] = useState<any[]>([]);
  const additionalCities = [
    { name: "New York", latitude: 40.7128, longitude: -74.0060 },
    { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
    { name: "Miami", latitude: 25.7617, longitude: -80.1918 },
    { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
    { name: "Denver", latitude: 39.7392, longitude: -104.9903 },
    { name: "Dallas", latitude: 32.7767, longitude: -96.7970 },
    { name: "Boston", latitude: 42.3601, longitude: -71.0589 },
    { name: "Atlanta", latitude: 33.7490, longitude: -84.3880 },
    { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
 ];

  useEffect(() => {

const getLocationAndFetchWeather = async () => {
 let { status } = await Location.requestForegroundPermissionsAsync();
 if (status !== 'granted') {
 setErrorMsg('Permission to access location was denied');
 return;
 }
 // Retrieve the current location
 const currentLocation = await
Location.getCurrentPositionAsync({});
 const { latitude, longitude } = currentLocation.coords;
 // Save location to state
 setLocation({ latitude, longitude });
 // Fetch weather data for the current location
 fetchWeather(latitude, longitude, "Your Location");
};


    const fetchWeather = async (latitude: number, longitude: number, cityName: string) => {
      
      const apiKey = '89794ea3f53867107c397087245aaaf4'
      
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
     
      try {
 const response = await fetch(url);
 const data = await response.json();
 if (data.cod === 200) {
 const cityWeather = {
 name: cityName,
 temp: `${data.main.temp}°F`,
 description: data.weather[0].description,
 icon: data.weather[0].icon,
 humidity: `${data.main.humidity}%`,
 windSpeed: `${data.wind.speed}MPH`,
 };
 setCityWeatherList(prevList => [cityWeather,
...prevList]); // Adds to the list
 }
else {
 alert('Failed to fetch weather data.');
 }
 } catch (error) {
 alert('Error fetching weather data.');
 }
 };
 getLocationAndFetchWeather();
 additionalCities.forEach(city => {
 fetchWeather(city.latitude, city.longitude, city.name);
 });
 }, [])  


return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Weather in Your Location and Other Cities:</Text>
    {errorMsg ? (
      <Text>{errorMsg}</Text>
    ) : (
      <FlatList
        data={cityWeatherList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/CityDetail',
                params: { cityData: JSON.stringify(item) },
              })
            }
          >
            <View style={styles.cityItem}>
              <Text style={styles.cityName}>{item.name}</Text>
              <Text style={styles.temp}>Temperature: {item.temp}</Text>
              <Text style={styles.description}>Conditions: {item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
);
}

const styles = StyleSheet.create({
  cityItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#1ac8dbff',
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 18,
    color: '#316fc5ff',
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#0f25ebff',
  },
});