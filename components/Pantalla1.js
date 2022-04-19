import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import PantallaModal from './PantallaModal';

const Stack = createStackNavigator();

const Pantalla1 = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name='Pantalla 1' component={Home} options={{ headerShown: false }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='PantallaModal' component={PantallaModal} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default Pantalla1;