import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import PantallaPerfilUsuario from './PantallaPerfilUsuario';

const Stack = createStackNavigator();

const PantallaUsuarioIndex = () => {
    return (
        <Stack.Navigator options="false" >
            <Stack.Screen name="PantallaPerfilUsuario" component={PantallaPerfilUsuario} options={{ headerShown: false }}/>
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

export default PantallaUsuarioIndex