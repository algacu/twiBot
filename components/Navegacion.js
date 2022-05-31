import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PantallaUsuarioIndex from './pantallasUsuario/PantallaUsuarioIndex';
import PantallaConfigIndex from './pantallasConfig/PantallaConfigIndex';
import PantallaChat from './PantallaChat';
import PantallaDatos from './PantallaDatos';

//Componente que define la navegación general por twiBot a través de Tabs o pestañas, 
// que a su vez recuperan pantallas de tipo Stack para la navegación en cada uno de los 4 apartados.

export const Navegacion = () => {

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
        <Tab.Screen name='Chat' component={PantallaChat} options={{
          tabBarLabel: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="twitch" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='Datos' component={PantallaDatos} options={{
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