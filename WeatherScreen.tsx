import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions  } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

const API_KEY = 'b35d17ec0a4aa6685e26a3af87cb3d67';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const fetchWeatherData = async () => {
    try {
      const url = `${BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      setWeatherData({ temperature, description, icon });
    } catch (error) {
      console.error(error);
    }
  };

    const requestLocationPermission = async () => {
        try {
          const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (result === RESULTS.GRANTED) {
            getCurrentPosition();
          } else {
            const permissionResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (permissionResult === RESULTS.GRANTED) {
              getCurrentPosition();
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          error => console.log(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };

      useEffect(() => {
        requestLocationPermission();
      }, []);



  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      fetchWeatherData();
    }
  }, [location]);

  if (!weatherData) {
    return (
    <ImageBackground source={require('./assets/background_leaf.jpg')} style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.text}>Načítání...</Text>
      </View>
    </ImageBackground>
    );
  }

  return (
  <ImageBackground source={require('./assets/background_leaf.jpg')} style={styles.container}>
    <View style={styles.imageContainer}>
      <Text style={styles.text}>{weatherData.temperature}°C</Text>
      <Image
        source={{ uri:`http://openweathermap.org/img/w/${weatherData.icon}.png` }}
        style={styles.image}
      />
    </View>
  </ImageBackground>
  );
};


 const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontSize: 40,
        },
        imageContainer: {
          backgroundColor: 'rgba(76, 175, 80, 0.75)',
          borderRadius: 10,
          overflow: 'hidden',
          padding: 5,
          alignItems: 'center',
        },
        image: {
          width: windowWidth * 0.3,
          height: windowHeight * 0.2,
          marginVertical: 10,
        },
    });


export default WeatherScreen;
