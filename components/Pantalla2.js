import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Stack1 from './Stack1';
import Stack2 from './Stack2';

const Stack = createStackNavigator();

const Pantalla2 = () => {
    return (
        <Stack.Navigator options="false" >
            <Stack.Screen name="Stack1" component={Stack1} options={{ headerShown: false }}/>
            <Stack.Screen name="Stack2" component={Stack2} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    title: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Pantalla2