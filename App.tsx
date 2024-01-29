import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SPACING} from './Theme';
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import lightTheme from './light-theme.json';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text} from 'react-native-paper';
import WeatherScreen from './WeatherScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const fontConfig = {
  displayMedium: {
    fontFamily: 'Vidaloka',
  },
};

// TODO Put somewhere else?
export const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors,
  fonts: configureFonts({config: fontConfig}),
};
// TODO Put somewhere else?
export const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: SPACING.large,
  },

  listItem: {
    padding: SPACING.large,
  },

  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    width: 300,
    padding: SPACING.default,
    marginBottom: 10,
  },

  baseText: {
    color: theme.colors.onPrimary,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});

type GreetingProps = {
  name: string;
  style: Style;
};

// Functional component
const ListItem = (props: GreetingProps) => {
  return (
    <TouchableOpacity
      style={[styles.listItem, props.style]}
      onPress={props.onNavigate}>
      <Text style={[styles.baseText, {textAlign: 'center'}]}>{props.name}</Text>
    </TouchableOpacity>
  );
};

// Class component
class Counter extends Component {
  // Hook
  state = {count: 0};

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={[styles.baseText, {fontWeight: 'bold'}]}>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.baseText, {color: '#333333'}]}>
            Click: {this.state.count}
          </Text>
        </View>
      </View>
    );
  }
}

class HomeScreen extends Component {
  navigate(name) {
    this.props.navigation.navigate('Profile', {name: name});
  }

  render() {
    return (
      <View style={[styles.centerContainer]}>
        <FlatList
          data={[
            {name: 'Cloud', color: 'red'},
            {name: 'Tifa', color: 'green'},
            {name: 'Aerith', color: 'blue'},
          ]}
          renderItem={({item}) => (
            <ListItem style={{backgroundColor: item.color}} name={item.name} />
          )}
          contentContainerStyle={styles.centerContainer}
        />
        <Counter />
      </View>
    );
  }
}

class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                  // TODO Magic number
                  <MaterialCommunityIcons name="home" color={color} size={26} />
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
                    // TODO Magic number
                    size={26}
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
