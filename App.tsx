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

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
  },

  listItem: {
    padding: 30,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#4f99ad',
    width: 300,
    padding: 15,
    marginBottom: 10,
  },

  baseText: {
    color: '#e6e6e6',
    fontFamily: 'Roboto',
    fontSize: 16,
  },

  titleText: {
    color: '#333333',
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
            <ListItem
              style={{backgroundColor: item.color}}
              name={item.name}
              onNavigate={() => this.navigate(item.name)}
            />
          )}
          contentContainerStyle={styles.centerContainer}
        />
        <Counter />
      </View>
    );
  }
}

type ProfileScreenProps = {
  navigation: Navigation;
};

type Temp = {
  temp: string;
};

const ProfileScreen = (props: ProfileScreenProps) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Temp[]>([]);

  useEffect(() => {
    getTemp();
  }, []);

  const getTemp = async () => {
    try {
      const appId = ''; // TODO Put in some config file and exclude from project...
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
        <Text style={styles.titleText}>
          {props.route.params.name}'s profile | {Math.round(data)} ° C
        </Text>
      )}
    </View>
  );
};

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: 'Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
