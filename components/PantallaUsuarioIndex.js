import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
//import PantallaUsuarioLogin from './PantallaUsuarioLogin';
import PantallaUsuarioLoginOk from './PantallaUsuarioLoginOk';


const Stack = createStackNavigator();

const PantallaUsuarioIndex = () => {
    return (
        <Stack.Navigator options="false" >
            {/* <Stack.Screen name="PantallaUsuarioLogin" component={PantallaUsuarioLogin} options={{ headerShown: false }}/> */}
            <Stack.Screen name="PantallaUsuarioLoginOk" component={PantallaUsuarioLoginOk} options={{ headerShown: false }}/>
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