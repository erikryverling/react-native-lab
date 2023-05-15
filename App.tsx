import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 30,
        gap: 30
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#4f99ad',
        padding: 15,
        marginBottom: 15,
    },
    buttonText: {
        color: '#e6e6e6',
    }
});

type GreetingProps = {
    name: string;
}

// Functional component
const Greeting = (props: GreetingProps) => {
    return (
        <View style={styles.center}>
            <Text>Hello, {props.name}!</Text>
        </View>
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
                    <Text style={styles.buttonText}>Click me</Text>
                </TouchableOpacity>
                <View>
                    <Text>You clicked {this.state.count} times</Text>
                </View>
            </View>
        );
    }
}

class App extends Component {
    render() {
        return(
            <View style={[styles.container]}>
                <Greeting name="Cloud"/>
                <Greeting name="Tifa"/>
                <Greeting name="Aerith"/>
                <Counter/>
            </View>
        );
    }
};

export default App;
