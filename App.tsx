import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import lightTheme from './src/themes/light-theme.json';
import WeatherScreen from './src/screens/WeatherScreen';
import CoffeesScreen from './src/screens/CoffeesScreen';

const Tab = createMaterialBottomTabNavigator();

const Theme = {
  ...DefaultTheme,
  colors: lightTheme.colors,
};

// This is a class component, but it's preferable to use a function component
class App extends Component {
  private menuItemSize = 26;

  // TODO Put menu items into a structure and read values from there

  render() {
    return (
      <PaperProvider theme={Theme}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Coffees"
              component={CoffeesScreen}
              options={{
                title: 'Coffees',
                tabBarLabel: 'Coffees',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="coffee-outline"
                    color={color}
                    size={this.menuItemSize}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Weather"
              component={WeatherScreen}
              options={{
                title: 'Weather',
                tabBarLabel: 'Weather',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="weather-partly-cloudy"
                    color={color}
                    size={this.menuItemSize}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

export default App;
