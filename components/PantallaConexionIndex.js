import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import PantallaConexion1 from './PantallaConexion1';
import PantallaConexion2 from './PantallaConexion2';
import PantallaConexion3 from './PantallaConexion3';
import PantallaChat from './PantallaChat';

const Stack = createStackNavigator();

const PantallaConexion = () => {
    return (
        <Stack.Navigator options="false" >
            <Stack.Screen name="PantallaConexion1" component={PantallaConexion1} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaConexion2" component={PantallaConexion2} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaConexion3" component={PantallaConexion3} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaChat" component={PantallaChat} options={{ headerShown: false }}/>
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

export default PantallaConexion