import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 30,
        gap: 30
    },

    listItem: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        width: '40%'
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
    },
    
    titleText: {
        color: '#333333',
        fontFamily: 'Roboto',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})

type GreetingProps = {
    name: string
    style: Style
}

// Functional component
const ListItem = (props: GreetingProps) => {
    return (
        <TouchableOpacity style={[styles.listItem, props.style]} onPress={props.onNavigate}>
            <Text style={[styles.baseText, {textAlign: 'center'}]}>{props.name}</Text>
        </TouchableOpacity>
    )
}

// Class component
class Counter extends Component {

    // Hook
    state = { count: 0, };

    onPress = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }

    render() {
        return(
            <View>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text style={[styles.baseText, {fontWeight: 'bold'}]}>Click me</Text>
                </TouchableOpacity>
                <View>
                    <Text style={[styles.baseText, {color: '#333333'}]}>Click: {this.state.count}</Text>
                </View>
            </View>
        )
    }
}

class HomeScreen extends Component {
    navigate(name) {
        this.props.navigation.navigate('Profile', {name: name})
    }

    render() {
        return(
            <View style={[styles.centerContainer]}>
                <ListItem
                    style={{backgroundColor: 'red'}} 
                    name="Cloud" 
                    onNavigate = {() => this.navigate('Cloud')} />

                <ListItem
                    style={{backgroundColor: 'green'}} 
                    name="Tifa" 
                    onNavigate = {() => this.navigate('Tifa')} />

                <ListItem
                    style={{backgroundColor: 'blue'}} 
                    name="Aerith" 
                    onNavigate = {() => this.navigate('Aerith')} />

                <Counter/>

            </View>
        )
    }
}

class ProfileScreen extends Component {
    render() {
        return(
            <View style={[styles.centerContainer]}>
                <Text style={styles.titleText}>
                    {this.props.route.params.name}'s profile
                </Text>
            </View>
        )
    }
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
        )
    }
}

export default App
