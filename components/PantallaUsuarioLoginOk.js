import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, StatusBar, TextInput } from 'react-native';
import global from './Global'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';

const PantallaUsuarioLoginOk = (props) => {

    const logo = '../assets/logo_twiBOT.png'
    const titulo = 'Perfil de usuario'
    const subtitulo = 'Email'
    const textoSalir = 'Salir'
    const navigation = useNavigation();
    const { signOut } = React.useContext(AuthContext);

    const [email, setEmail] = useState('');

    useEffect(() => {
        setEmail(global.email)
    });

    // const guardaVariablesGlobales = async () => {
    //     try {
    //         global.email = user;
    //         global.token = token;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                global.user = '';
                global.token = '';
                global.palabrasCensuradas = '';
                global.palabrasSecretas = '';
                global.dados = false;
                global.email = '';
                signOut();
                //navigation.replace("PantallaUsuarioLogin")
            })
    }

    return (
        <SafeAreaView style={styles.contenedor}>
            <StatusBar barStyle="light-content" />
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={require(logo)} />
            </View>
            <View style={styles.contenedorTexto}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.subtitulo}>{subtitulo}</Text>
                <Text style={styles.texto}>{email}</Text>
            </View>
            <View style={styles.contenedorBoton}>
                <Pressable style={styles.botonGris} onPress={handleSignOut}>
                    <Text style={styles.texto}>{textoSalir}</Text>
                </Pressable>
            </View>
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
        width: 120,
        height: 120,
        borderRadius: 20,
        overflow: 'visible',
        marginTop: 30,
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
        fontSize: 35,
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
        textAlign: 'center',
    },
    subtitulo: {
        marginTop: 15,
        lineHeight: 25,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    contenedorBoton: {
        marginTop: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
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
        marginTop: 15,
    },
});
export default PantallaUsuarioLoginOk;

