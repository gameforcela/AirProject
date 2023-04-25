/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
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
  Alert,
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

showDetailOfSensor = (item) =>
    Alert.alert(
      'Info o senzoru: ',
      'ID senzoru: '+ item.sensor.id + '\n' + 'Počet pinů: ' + item.sensor.pin + '\n' + 'Id u výrobce: ' + item.sensor.sensor_type.id + '\n' + 'Název senzoru: ' + item.sensor.sensor_type.name + '\n' + 'Výrobce senzoru: ' + item.sensor.sensor_type.manufacturer ,


      [
        {
          text: 'Ok'
        }
      ]
    )


const MapScreen = () => {
  const [current_weathers, setWeather] = useState<Data[] | undefined>();
    useEffect(() => {
      const fetchData = async function () {
          const data = await fetch('https://data.sensor.community/static/v2/data.1h.json');
          const json = await data.json();
          let cz = json.filter(data => data.location.country==="CZ")

          let filter_cz = cz.map(data => {
            return {
                id: data.id,
                country: data.location.country,
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                sensor: data.sensor,
                sensor_values: data.sensordatavalues,

            }
          })
          setWeather(filter_cz)
      };
      fetchData();
    }, []);

  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [markerPosition, setMarkerPosition] = useState<Position | null>(null);

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
          setInitialPosition({ latitude, longitude, latitudeDelta: 5, longitudeDelta: 5 });
          setMarkerPosition({ latitude, longitude });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    useEffect(() => {
      requestLocationPermission();
    }, []);

  return (
        <View style={styles.container}>
            {initialPosition && (
             <MapView
                   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                   showUserLocation={true}
                   style={styles.map}
                   initialRegion={initialPosition}
                   >
                 {
                 (current_weathers || []).map(item => {
                 return(
                    <Marker
                        key = {item.id}
                        coordinate = {{latitude: Number(item.latitude), longitude: Number(item.longitude)}}>
                        <Callout onPress = {() => {this.showDetailOfSensor(item)}} >
                            <Text>{item.sensor.sensor_type.manufacturer}</Text>
                            {(item.sensor_values || []).map(values => {
                              return(
                             <Text> {values.value_type}  je rovno {values.value} </Text>
                        )})}
                        </Callout>
                    </Marker>
                 )})}
           </MapView>
           )}
        </View>
  );
}

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

export default MapScreen;
