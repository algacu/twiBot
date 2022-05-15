import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PantallaConfigIndex from './components/PantallaConfigIndex';
import Pantalla4 from './components/PantallaChat';
import global from './components/Global';

import { StatusBar } from 'react-native';

/* LogBox.ignoreLogs([
  //Parece ser que react navitagion instala un módulo que acaban de actualizar en fase experimental. Utilizo esta función para ignorar el mensaje informativo.
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]); */


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="Configuracion"
        screenOptions={{
          "tabBarActiveTintColor": "#503484",
          "tabBarInactiveTintColor": "gray",
          "tabBarActiveBackgroundColor": "white",
          "tabBarInactiveBackgroundColor": "white",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        }}
      >
        <Tab.Screen name='Configuracion' component={PantallaConfigIndex} options={{
          tabBarLabel: 'Configuración',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='Chat' component={Pantalla4} options={{
          tabBarLabel: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="twitch" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='Datos' component={Pantalla4} options={{
          tabBarLabel: 'Datos',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="database" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>

  )
}

export default App;
