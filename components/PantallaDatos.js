import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text, Pressable, Platform } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import global from './Global';


const PantallaDatos = (props) => {

  const canal = global.user;
  const titulo = 'Datos de ' + canal;
  const logo = '../assets/logo_twiBOT.png';
  const textoBotonFecha = 'Selecciona fecha';
  const subtitulo = 'Elige la fecha del streaming\npara consultar los datos de ese día.';
  const textoCanal = 'Canal';
  const textoUsuariosChat = 'Usuarios que participaron:';
  const textoUsuariosExpulsados = 'Usuarios que fueron expulsados:';
  const textoFecha = 'Fecha del streaming';
  const [email, setEmail] = useState('');
  const [usuarioTwitch, setUsuarioTwitch] = useState('');
  const [fecha, setFecha] = useState('');
  const [usuarios, setUsuarios] = useState('');
  const [expulsados, setExpulsados] = useState('');

  useEffect(() => {
    setTimeout(() => {
      cambiaDatos();
    }, 500)
  }, []);

  const cambiaDatos = () => {
    setEmail(global.email);
    setUsuarioTwitch(global.user);
  }

  const confirmaFecha = (nuevaFecha, fechaMostrar) => {
    const emailFecha = email + nuevaFecha;
    setFecha(fechaMostrar);
    descargarDatosStreaming(emailFecha);
  }

  const descargarDatosStreaming = async (id) => {
    const docRef = doc(db, 'streamings', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const usuarios = data.usuarios;
      const expulsados = data.expulsados;
      setUsuarios(usuarios)
      setExpulsados(expulsados)
    } else {
      setUsuarios('No hay datos guardados de ese día.')
      setExpulsados('No hay datos guardados de ese día.')
      console.log("¡No se ha encontrado el dato en la BD!");
    }
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    var fechaHora = date.toLocaleString();
    var fechaDiaMesAnyo, fechaTroceada, mes, dia, anyo, nuevaFecha, fechaMostrar, fechas;

    if (Platform.OS === 'ios') {
      fechaDiaMesAnyo = fechaHora.split(',');
      fechaTroceada = fechaDiaMesAnyo[0].split('/');
      dia = fechaTroceada[0];
      mes = fechaTroceada[1];
      anyo = fechaTroceada[2];
      nuevaFecha = '-' + dia + '.' + mes + '.' + anyo;
      fechaMostrar = mes + ' - ' + dia + ' - ' + anyo;
      console.log(nuevaFecha)
      confirmaFecha(nuevaFecha, fechaMostrar);
      hideDatePicker();
    } else {
      fechas = fechaHora.split(' ');
      switch (fechas[1]) {
        case 'Jan':
          mes = '01';
          break;
        case 'Feb':
          mes = '02';
          break;
        case 'Mar':
          mes = '03';
          break;
        case 'Apr':
          mes = '04';
          break;
        case 'May':
          mes = '05';
          break;
        case 'Jun':
          mes = '06';
          break;
        case 'Jul':
          mes = '07';
          break;
        case 'Aug':
          mes = '08';
          break;
        case 'Sep':
          mes = '09';
          break;
        case 'Oct':
          mes = '10';
          break;
        case 'Nov':
          mes = '11';
          break;
        case 'Dec':
          mes = '12';
          break;

      }
      dia = fechas[2];
      anyo = fechas[4];
      anyoCortado = anyo.substring(2,4);
      nuevaFecha = '-' + mes + '.' + dia + '.' + anyoCortado;
      fechaMostrar = dia + ' - ' + mes + ' - ' + anyo;
      console.log(nuevaFecha)
      confirmaFecha(nuevaFecha, fechaMostrar);
      hideDatePicker();
    }

  };

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
        <Text style={styles.subtitulo}>{subtitulo}</Text>
        <View style={styles.contenedorBotonSiguiente}>
          <Pressable style={styles.botonVerde} onPress={showDatePicker}>
            <Text style={styles.texto}>{textoBotonFecha}</Text>
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <ScrollView style={styles.contenedorTexto}>
        <Text style={styles.subtitulo}>{textoCanal}</Text>
        <Text style={styles.texto}>{usuarioTwitch}</Text>
        <Text style={styles.subtitulo}>{textoFecha}</Text>
        <Text style={styles.texto}>{fecha}</Text>
        <Text style={styles.subtitulo}>{textoUsuariosChat}</Text>
        <Text style={styles.texto}>{usuarios}</Text>
        <Text style={styles.subtitulo}>{textoUsuariosExpulsados}</Text>
        <Text style={styles.texto}>{expulsados}</Text>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contenedorTexto: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  texto: {
    fontSize: 16,
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
  contenedorBotonSiguiente: {
    marginTop: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 10,
    alignSelf: 'center',
  },
  botonVerde: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#85AD3A',
  },
});


export default PantallaDatos