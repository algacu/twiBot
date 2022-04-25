import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Conexion1 from './Conexion1';
import Conexion2 from './Conexion2';
import Conexion3 from './Conexion3';
import Pantalla3 from './Pantalla3';

const Stack = createStackNavigator();

const PantallaConexion = () => {
    return (
        <Stack.Navigator options="false" >
            <Stack.Screen name="Conexion1" component={Conexion1} options={{ headerShown: false }}/>
            <Stack.Screen name="Conexion2" component={Conexion2} options={{ headerShown: false }}/>
            <Stack.Screen name="Conexion3" component={Conexion3} options={{ headerShown: false }}/>
            <Stack.Screen name="Pantalla3" component={Pantalla3} options={{ headerShown: false }}/>
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