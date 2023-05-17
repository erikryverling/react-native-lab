import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

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
const Greeting = (props: GreetingProps) => {
    return (
        <View style={[styles.item, props.style]}>
            <Text style={[styles.baseText, {textAlign: 'center'}]}>Hello, {props.name}!</Text>
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
                    <Text style={[styles.baseText, {fontWeight: 'bold'}]}>Click me</Text>
                </TouchableOpacity>
                <View>
                    <Text style={[styles.baseText, {color: '#333333'}]}>You clicked {this.state.count} times</Text>
                </View>
            </View>
        );
    }
}

class App extends Component {
    render() {
        return(
            <View style={[styles.container]}>
                <Greeting style={{backgroundColor: 'red'}} name="Cloud"/>
                <Greeting style={{backgroundColor: 'green'}} name="Tifa"/>
                <Greeting style={{backgroundColor: 'blue'}} name="Aerith"/>
                <Counter/>
            </View>
        );
    }
};

export default App;
