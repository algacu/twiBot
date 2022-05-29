import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text } from 'react-native';
import global from './Global';

const PantallaDatos = (props) => {

  const canal = global.user;
  const titulo = 'Datos de ' + canal;
  const logo = '../assets/logo_twiBOT.png';

  const textoNombre = 'Nombre';
  const textoEmail = 'Email';
  const textoUsuario = 'Usuario de Twitch';
  const textoSalir = 'Salir';
  const [cargando, setCargando] = useState(true);
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [usuarioTwitch, setUsuarioTwitch] = useState('');

  const cambiaDatos = () => {
    setEmail(global.email);
    setNombre(global.nombre);
    setUsuarioTwitch(global.user);
  }

  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
      cambiaDatos();
    }, 2000)
  }, []);

  return (
    <SafeAreaView style={styles.contenedor}>
      <StatusBar barStyle="light-content" />
      <View alignItems='center'>
        <View style={styles.contenedorImagen}>
          <Image style={styles.imagen} source={require(logo)} />
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <View style={styles.contenedorTexto}>
        <Text style={styles.subtitulo}>{textoNombre}</Text>
        <Text style={styles.texto}>{nombre}</Text>
        <Text style={styles.subtitulo}>{textoUsuario}</Text>
        <Text style={styles.texto}>{usuarioTwitch}</Text>
        <Text style={styles.subtitulo}>{textoEmail}</Text>
        <Text style={styles.texto}>{email}</Text>
      </View>
    </SafeAreaView >

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
  contenedorTexto: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  texto: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
},
subtitulo: {
    marginTop: 15,
    lineHeight: 25,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
},
});


export default PantallaDatos