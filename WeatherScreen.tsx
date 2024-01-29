import React, {useEffect, useState} from 'react';
import conf from './conf.json';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from './App';
import {styles} from './App';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';

type Response = {
  name: string;
  main: Main;
  wind: Wind;
};

type Main = {
  temp: string;
};

type Wind = {
  speed: Float;
  deg: Float;
};

const WeatherScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState<Response[]>([]);

  useEffect(() => {
    getTemp();
  }, []);

  const getTemp = async () => {
    try {
      const appId = conf.apiKey;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&lon=18.0273&lat=59.303&units=metric&lang=sv`,
      );
      const json = await response.json();
      setResponse(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.centerContainer, {justifyContent: 'center'}]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            justifyContent: 'space-between',
            width: 170,
            height: 150,
          }}>
          <Text style={{textAlign: 'center'}} variant="titleLarge">
            {response.name}
          </Text>
          <Text
            style={{textAlign: 'center'}}
            variant="displayMedium"
            theme={{colors: {onSurface: theme.colors.primary}}}>
            {Math.round(response.main.temp)} ° C
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text variant="titleLarge">{response.wind.speed} m/s</Text>
            <Text variant="titleLarge">{response.wind.deg} °</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default WeatherScreen;
