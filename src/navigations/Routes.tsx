// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../screens/Home';
import OnBoard from '../screens/OnBoard';


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoard" component={OnBoard} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}