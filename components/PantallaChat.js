import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text } from 'react-native';
import global from './Global';

//Pantalla del apartado/tab/pestaña 'Chat', donde se integra el chat del canal de Twitch 
// indicado a través de WebView. 
const PantallaChat = (props) => {

  const canal = global.user;
  const urlCanal = 'https://www.twitch.tv/' + canal + '/chat';
  const logo = '../assets/logo_twiBOT.png';
  const titulo = 'Canal de ' + canal;

  return (
    <SafeAreaView style={styles.contenedor}>
      <StatusBar barStyle="light-content" />
      <View alignItems='center'>
        <View style={styles.contenedorImagen}>
          <Image style={styles.imagen} source={require(logo)} />
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <View style={styles.contenedorWeb}>
        <WebView
          source={{ uri: urlCanal }}
        />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  contenedorImagen: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'visible',
    marginTop: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 10,
    backgroundColor: "black",
  },
  imagen: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  contenedor: {
    flex: 1,
    backgroundColor: '#503484',
  },
  contenedorWeb: {
    flex: 1,
    marginTop: 20,
  }
});

export default PantallaChat