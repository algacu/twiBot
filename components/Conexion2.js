import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const texto1 = "Obtén tu token autentificador para \n hacer uso de los servicios de Twitch."
const textoBoton1 = "Obtén tu token"
const textoBoton2 = "Atrás"

const Conexion2 = (props) => {

    const [token, setToken] = useState('');

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={require('../assets/logo_twiBOT.png')} />
            </View>
            <View style={styles.contenedorTexto}>
                <Text style={styles.titulo}>Paso 1</Text>
                <Text style={styles.texto1}>{texto1}</Text>
            </View>
            <View style={styles.contenedorBoton1}>
                <Pressable style={styles.boton} onPress={ ()=>{ Linking.openURL('https://twitchapps.com/tmi/')}}>
                    <Text style={styles.texto}>{textoBoton1}</Text>
                </Pressable>
            </View>
            <View>
                <TextInput style={styles.input} placeholder='Introduce tu token' value={token} onChangeText={setToken} />
            </View>
            <View style={styles.contenedorBoton2}>
                <Pressable style={styles.boton} onPress={() => alert(token)}>
                    <Text style={styles.texto}>Mostrar</Text>
                </Pressable>
            </View>
            <View style={styles.contenedorBoton3}>
                <Pressable style={styles.boton} onPress={() => props.navigation.navigate('Conexion1')}>
                    <Text style={styles.texto}>{textoBoton2}</Text>
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#503484',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contenedorImagen: {
        width: 80,
        height: 80,
        borderRadius: 20,
        overflow: 'visible',
        marginTop: 70,
        //Properties to setup your Shadow 
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black"
    },
    imagen: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    contenedorTexto: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
    },
    titulo: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    texto: {
        fontSize: 16.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    texto1: {
        marginTop: 5,
        lineHeight: 25,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    contenedorBoton1: {
        marginTop: 50,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black"
    },
    contenedorBoton2: {
        marginTop: 50,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black"
    },
    contenedorBoton3: {
        marginTop: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black"
    },
    boton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#85AD3A',
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 200,
        height: 30,
        marginTop: 20,
    },

});
export default Conexion2;



