/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WeatherScreen from './WeatherScreen';
import MapScreen from './MapScreen';

import 'react-native-gesture-handler';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


interface  SensorType {
  id: number;
  name: string;
  manufacturer: string;
}

interface  SensorInfo {
  id: number;
  pin: string;
  sensor_type: SensorType;
}

interface  SensorValues {
  id: number;
  value: string;
  value_type: string;
}

type Data = {
              id: number
              country: string
              latitude: number
              longitude: number
              sensor: SensorInfo
              sensor_values: SensorValues[]
              }

type Position = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Domů" component={HomeScreen} />
        <Stack.Screen name="Počasí" component={WeatherScreen} />
        <Stack.Screen name="Mapa stanic" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    color: "blue"
  },
  container: {
       ...StyleSheet.absoluteFillObject,
       height: "100%",
       width: "100%",
       justifyContent: 'flex-end',
       alignItems: 'center',
  },
  map: {
       ...StyleSheet.absoluteFillObject,
  },
});

export default App;
