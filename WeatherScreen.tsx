import React, {useEffect, useState} from 'react';
import conf from './conf.json';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SPACING} from './Theme';
import {theme} from './App';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: SPACING.large,
  },
});

type Response = {
  name: string;
  main: Main;
};

type Main = {
  temp: string;
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
        <View>
          <Text variant="titleLarge">{response.name}</Text>

          <Text
            variant="displayMedium"
            theme={{colors: {onSurface: theme.colors.primary}}}>
            {Math.round(response.main.temp)} ° C
          </Text>
        </View>
      )}
    </View>
  );
};

export default WeatherScreen;
