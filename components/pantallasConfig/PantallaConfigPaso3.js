import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import global from '../Global'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { conectar } from '../../utils/Conectar';

const PantallaConfigPaso3 = (props) => {

    const logo = '../../assets/logo_twiBOT.png';
    const titulo = 'Paso 3';
    const subtitulo = '¡Dale vida a tu bot!';

    const textoUsuario = 'Canal de Twitch:';
    const textoToken = 'Chat Token:';
    const textoBotonConectar = 'Conectar';
    const textoBotonAtras = 'Atrás';

    const user = global.user;
    const token = global.token;
    const canal = global.user;
    const palabrasSecretas = global.palabrasSecretas;
    const palabrasCensuradas = global.palabrasCensuradas;
    const [tokenOK, setTokenOK] = useState('');

    const alertWithoutButtons = () => {
        const title = 'Conectando a Twitch';
        const message = 'Enviando las credenciales de\ntu bot a Twitch...';
        const arrayButtons = []
        const alertOptions = {
            cancelable: true,
        };
        Alert.alert(title, message, arrayButtons,  alertOptions);
    }

    useEffect(() => {
        var longitudToken = token.length;
        if (longitudToken == 36) {
            setTokenOK('comment-check')
        } else {
            setTokenOK('comment-remove')
        }
    }, [])

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
                        <MaterialCommunityIcons style={styles.subtitulo} name={tokenOK} color={'white'} size={20} />
                    </View>
                    <View style={styles.contenedorBoton}>
                        <Pressable style={styles.botonVerde} onPress={() => { alertWithoutButtons(); conectar(user, token, palabrasSecretas, palabrasCensuradas)}}>
                            <Text style={styles.textoBoton}>{textoBotonConectar}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorBoton}>
                        <Pressable style={styles.botonGris} onPress={() => props.navigation.navigate('PantallaConfigPaso2')}>
                            <Text style={styles.textoBoton}>{textoBotonAtras}</Text>
                        </Pressable>
                    </View>
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
        alignItems: 'center',
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
        marginTop: 55,
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



