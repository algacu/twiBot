import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox, View, SafeAreaView } from 'react-native';
import { NavegacionUsuario } from './NavegacionUsuario';
import { PantallaUsuarioLogin } from './components/PantallaUsuarioLogin';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from './context';
import { global } from './components/Global';

LogBox.ignoreLogs([
  //Parece ser que react navitagion instala un módulo que acaban de actualizar en fase experimental. Utilizo esta función para ignorar el mensaje informativo.
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"
]);


const App = () => {

  const [cargando, setCargando] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const AuthStack = createStackNavigator();

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
    }, 1000)
  }, []);

  if (cargando) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#503484' }}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator animating={true} size='large' color={Colors.white} />
      </SafeAreaView>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <NavegacionUsuario />
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen name='Login' component={PantallaUsuarioLogin} options={{ headerShown: false }} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;
