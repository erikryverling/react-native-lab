import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 30,
        gap: 30
    },

    item: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        width: '60%'
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#4f99ad',
        width: 300,
        padding: 15,
        marginBottom: 10
    },

    baseText: {
        color: '#e6e6e6',
        fontFamily: 'Roboto',
        fontSize: 16,
    }
});

type GreetingProps = {
    name: string;
    style: Style;
}

// Functional component
const Character = (props: GreetingProps) => {
    return (
        <TouchableOpacity 
            style={[styles.item, props.style]} 
            onPress={props.onNavigate}
        >
            <Text style={[styles.baseText, {textAlign: 'center'}]}>Hello, {props.name}!</Text>
        </TouchableOpacity>
    );
};

// Class component
class Counter extends Component {

    // Hook
    state = { count: 0, };

    onPress = () => {
        this.setState({
            count: this.state.count + 1,
        });
    };

    render() {
        return(
            <View>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text style={[styles.baseText, {fontWeight: 'bold'}]}>Click me</Text>
                </TouchableOpacity>
                <View>
                    <Text style={[styles.baseText, {color: '#333333'}]}>You clicked {this.state.count} times</Text>
                </View>
            </View>
        );
    }
}

const HomeScreen = ({navigation}) => {
    return(
        <View style={[styles.container]}>
            <Character style={{backgroundColor: 'red'}} name="Cloud" onNavigate = { () => navigation.navigate('Profile', {name: "Cloud"}) } />
            <Character style={{backgroundColor: 'green'}} name="Tifa" onNavigate = { () => navigation.navigate('Profile', {name: "Tifa"}) } />
            <Character style={{backgroundColor: 'blue'}} name="Aerith" onNavigate = { () => navigation.navigate('Profile', {name: "Aerith"}) } />
            <Counter/>
        </View>
    )
}

const ProfileScreen = ({navigation, route}) => {
    return(
        <View style={[styles.container]}>
            <Text style={[styles.baseText, {color: '#333333'}, {textAlign: 'center'}]}>{route.params.name}'s profile</Text>
        </View>
    )
}

class App extends Component {
    render() {
        return(
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
};

export default App;
