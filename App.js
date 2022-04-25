import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PantallaConexionIndex from './components/PantallaConexionIndex';
import PantallaChat from './components/PantallaChat';
import Pantalla4 from './components/Pantalla4';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  //Parece ser que react navitagion instala un módulo que acaban de actualizar en fase experimental. Utilizo esta función para ignorar el mensaje informativo.
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Conexión' component={PantallaConexionIndex} options={{
          tabBarLabel: 'Conexión',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arrow-right" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='Chat del canal' component={PantallaChat} options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="archive" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='API Países' component={Pantalla4} options={{
          tabBarLabel: 'Pantalla 4',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="archive" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
