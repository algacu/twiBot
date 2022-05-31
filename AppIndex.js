import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { AuthContext } from './context';
import { Navegacion } from './components/Navegacion';
import { PantallaCrearUsuario } from './components/pantallasUsuario/PantallaCrearUsuario';
import { PantallaLoginUsuario } from './components/pantallasUsuario/PantallaLoginUsuario';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info."
]);

//AppIndex: función hook que determina si el usuario está logueado o no en twiBot.
//  En función de ello, devuelve las pantallas de login/registro o de navegación por la app.

const AuthStack = createStackNavigator();

export const AppIndex = () => {

  const [cargando, setCargando] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: () => {
      setCargando(false);
      setUserToken('tokenSignIn');
    },
    signUp: () => {
      setCargando(false);
      setUserToken('tokenSignUp');
    },
    signOut: () => {
      setCargando(false);
      setUserToken(null);
    }
  }));

  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 500)
  }, []);

  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator animating={true} size='large' color={Colors.white} />
      </SafeAreaView>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <Navegacion />
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen name='PantallaLoginUsuario' component={PantallaLoginUsuario} options={{ headerShown: false }} />
            <AuthStack.Screen name='PantallaCrearUsuario' component={PantallaCrearUsuario} options={{ headerShown: false }} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#503484'
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});