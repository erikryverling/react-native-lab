import CoffeeDetailsScreen from './CoffeeDetailsScreen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CoffeeListScreen from './CoffeeListScreen';

const Stack = createNativeStackNavigator();

function CoffeesScreen() {
  return (
    <Stack.Navigator initialRouteName="CoffeeList">
      <Stack.Screen
        name="CoffeeList"
        component={CoffeeListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CoffeeDetails"
        component={CoffeeDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default CoffeesScreen;
