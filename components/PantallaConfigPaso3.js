import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import global from './Global'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PantallaConfigPaso3 = (props) => {

    const logo = '../assets/logo_twiBOT.png';
    const titulo = 'Paso 3';
    const subtitulo = '¡Dale vida a tu bot!';

    const textoUsuario = 'Usuario actual:';
    const textoCanal = 'Canal:';
    const textoToken = 'Token:';
    const textoPalabrasSecretas = '  Palabras secretas';
    const textoPalabrasCensuradas = '  Palabras censuradas';
    const textoBotonSiguiente = 'Conectar';
    const textoBotonAtras = 'Atrás';

    const user = global.user;
    const token = global.token;
    const canal = global.user;
    const palabrasSecretas = global.palabrasSecretas;
    const palabrasCensuradas = global.palabrasCensuradas;

    return (
        <SafeAreaView style={styles.contenedor}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "position" : ""}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contenedorImagen}>
                        <Image style={styles.imagen} source={require(logo)} />
                    </View>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.titulo}>{titulo}</Text>
                        <Text style={styles.subtitulo}>{subtitulo}</Text>
                    </View>
                    <View style={styles.contenedorInfo}>
                        <Text style={styles.textoInput}>{textoUsuario}</Text>
                        <Text style={styles.subtitulo}>{user}</Text>
                        <Text style={styles.textoInput}>{textoToken}</Text>
                        <Text style={styles.subtitulo}>{token}</Text>
                    </View>
                    <View style={styles.contenedorBoton}>
                        <Pressable style={styles.botonGris} onPress={() => Alert.alert('Palabras Secretas', palabrasSecretas)}>
                            <MaterialCommunityIcons name="eye" color={'white'} size={20} />
                            <Text style={styles.textoBoton}>{textoPalabrasSecretas}</Text>
                        </Pressable>
                        <Pressable style={styles.botonGris} onPress={() => Alert.alert('Palabras Censuradas', palabrasCensuradas)}>
                            <MaterialCommunityIcons name="eye" color={'white'} size={20} />
                            <Text style={styles.textoBoton}>{textoPalabrasCensuradas}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorBoton}>
                        <Pressable style={styles.botonVerde} onPress={() => props.navigation.navigate('PantallaConfigPaso3')}>
                            <Text style={styles.textoBoton}>{textoBotonSiguiente}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorBoton}>
                        <Pressable style={styles.botonGris} onPress={() => props.navigation.navigate('PantallaConfigPaso2')}>
                            <Text style={styles.textoBoton}>{textoBotonAtras}</Text>
                        </Pressable>
                    </View>
                    <StatusBar style="light" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        marginTop: 30,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black",
        alignSelf: 'center',
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
    subtitulo: {
        marginTop: 5,
        lineHeight: 25,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    textoBoton: {
        fontSize: 16.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textoInput: {
        marginTop: 20,
        lineHeight: 15,
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    contenedorInfo: {
        marginTop: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    contenedorBoton: {
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
        marginTop: 50,
    },
    botonGris: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#A0A0A0',
        marginTop: 10,
    }
});

export default PantallaConfigPaso3;



