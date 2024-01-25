import React, {Component, useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SPACING} from './Theme';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import lightTheme from './light-theme.json';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import conf from './conf.json';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors, // Copy it from the color codes scheme and then use it here
};

const styles = StyleSheet.create({
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

  titleText: {
    color: theme.colors.onBackground,
    fontFamily: 'Roboto',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
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
type Temp = {
  temp: string;
};

const ProfileScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Temp[]>([]);

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
      setData(json.main.temp);
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
        <Text style={styles.titleText}>{Math.round(data)} ° C</Text>
      )}
    </View>
  );
};

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
              component={ProfileScreen}
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
