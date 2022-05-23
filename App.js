import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PantallaConfigIndex from './components/PantallaConfigIndex';
import PantallaUsuario from './components/PantallaUsuarioIndex';
import Pantalla4 from './components/Pantalla4';
import global from './components/Global';

import { StatusBar, LogBox } from 'react-native';
import PantallaUsuarioIndex from './components/PantallaUsuarioIndex';

LogBox.ignoreLogs([
  //Parece ser que react navitagion instala un módulo que acaban de actualizar en fase experimental. Utilizo esta función para ignorar el mensaje informativo.
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"
]);


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="Usuario"
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
        <Tab.Screen name='Usuario' component={PantallaUsuarioIndex} options={{
          tabBarLabel: 'Usuario',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='Bot' component={PantallaConfigIndex} options={{
          tabBarLabel: 'Bot',
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
