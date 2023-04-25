import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePressMap = () => {
    navigation.navigate('Mapa stanic');
  };

  const handlePressWeather = () => {
      navigation.navigate('Počasí');
    };

  return (
  <ImageBackground source={require('./assets/background_leaf.jpg')} style={styles.container}>
        <View>
          <Text style={styles.title}>Vítej v aplikaci počasí !</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handlePressMap} style={styles.button}>
            <Text style={styles.buttonText}>Mapa stanic</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressWeather} style={styles.button}>
              <Text style={styles.buttonText}>Jaké je počaší?</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomeScreen;