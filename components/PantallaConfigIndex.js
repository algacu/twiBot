import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import PantallaConfigInicio from './PantallaConfigInicio';
import PantallaConfigPaso1 from './PantallaConfigPaso1';
import PantallaConfigPaso2 from './PantallaConfigPaso2';
import PantallaConfigPaso3 from './PantallaConfigPaso3';
import PantallaAyudaPalabrasCensuradas from './PantallaAyudaPalabrasCensuradas';
import PantallaAyudaPalabrasSecretas from './PantallaAyudaPalabrasSecretas';
import PantallaAyudaDados from './PantallaAyudaDados';

const Stack = createStackNavigator();

const PantallaConexionIndex = () => {
    return (
        <Stack.Navigator options="false" >
            <Stack.Screen name="PantallaConfigInicio" component={PantallaConfigInicio} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaConfigPaso1" component={PantallaConfigPaso1} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaConfigPaso2" component={PantallaConfigPaso2} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaConfigPaso3" component={PantallaConfigPaso3} options={{ headerShown: false }}/>
            <Stack.Screen name="PantallaAyudaPalabrasCensuradas" component={PantallaAyudaPalabrasCensuradas} options={{ headerShown: false, presentation:'modal' }}/>
            <Stack.Screen name="PantallaAyudaPalabrasSecretas" component={PantallaAyudaPalabrasSecretas} options={{ headerShown: false, presentation:'modal' }}/>
            <Stack.Screen name="PantallaAyudaDados" component={PantallaAyudaDados} options={{ headerShown: false, presentation:'modal' }}/>
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

export default PantallaConexionIndex