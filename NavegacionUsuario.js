import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PantallaConfigIndex from './components/PantallaConfigIndex';
import PantallaUsuario from './components/PantallaUsuarioIndex';
import Pantalla4 from './components/Pantalla4';
import global from './components/Global';
import PantallaUsuarioLogin from './components/PantallaUsuarioLogin';

import { StatusBar} from 'react-native';
import PantallaUsuarioIndex from './components/PantallaUsuarioIndex';
import { useEffect } from 'react/cjs/react.production.min';


export const NavegacionUsuario = () => {

  const Tab = createBottomTabNavigator();

  return (
    <>
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
    </>
  )
}