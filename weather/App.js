import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const getCitys = async (query) => {
    const username = 'ncapi';
    const url = `http://api.geonames.org/searchJSON?q=${query}&country=US&featureClass=P&maxRows=10&username=${username}`;
    try {
      const response = await axios.get(url);
      if (response.data.geonames) {
        const citySuggestions = response.data.geonames.map(item => ({
          name: item.name,
          state: item.adminName1,
        }));
        setSuggestions(citySuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  };

  const getWeather = async (city) => {
    const key = '759beb0c10cb06b7096e79feafbbecc4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const description = data.weather[0].description;
      setWeatherData(description);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getForecast = async (city) => {
    const key = '759beb0c10cb06b7096e79feafbbecc4';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&cnt=5`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const forecast = data.list.map(item => ({
        time: item.dt_txt,
        description: item.weather[0].description,
      }));
      setForecastData(forecast);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const handleCitySearch = (text) => {
    setCity(text);
    if (text.length > 2) {
      getCitys(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    const cityWithState = `${suggestion.name}, ${suggestion.state}`;
    getWeather(cityWithState);
    setCity(cityWithState);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⛅ Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        value={city}
        onChangeText={handleCitySearch}
      /> 
      <FlatList
        data={suggestions}
        keyExtractor={(item) => `${item.name}, ${item.state}`}
        style={styles.suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
            <Text style={styles.suggestionText}>{item.name}, {item.state}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => getWeather(city)}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.forecastButton]} onPress={() => getForecast(city)}>
          <Text style={styles.buttonText}>Get Forecast</Text>
        </TouchableOpacity>
      </View>
      {weatherData && <Text style={styles.weatherText}>{`Weather: ${weatherData}`}</Text>}
      {forecastData && (
        <FlatList
          data={forecastData}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <Text style={styles.weatherText}>{`${item.time}: ${item.description}`}</Text>
          )}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  suggestions: {
    maxHeight: 150,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  suggestionText: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  forecastButton: {
    backgroundColor: '#1e68d6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  weatherText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});
