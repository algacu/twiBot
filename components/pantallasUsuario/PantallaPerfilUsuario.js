import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, StatusBar, TextInput } from 'react-native';
import global from '../Global'
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context';
import { ActivityIndicator, Colors } from 'react-native-paper';

const PantallaPerfilUsuario = (props) => {

    const logo = '../../assets/logo_twiBOT.png';
    const titulo = 'Perfil de usuario';
    const textoNombre = 'Nombre';
    const textoEmail = 'Email';
    const textoUsuario = 'Usuario de Twitch';
    const textoSalir = 'Salir';
    const navigation = useNavigation();
    const { signOut } = React.useContext(AuthContext);
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

    if (cargando) {
        return (
            <SafeAreaView style={styles.contenedorCarga}>
                <StatusBar barStyle="light-content" />
                <ActivityIndicator animating={true} size='large' color={Colors.white} />
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.contenedor}>
            <StatusBar barStyle="light-content" />
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={require(logo)} />
            </View>
            <View style={styles.contenedorTexto}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.subtitulo}>{textoNombre}</Text>
                <Text style={styles.texto}>{nombre}</Text>
                <Text style={styles.subtitulo}>{textoUsuario}</Text>
                <Text style={styles.texto}>{usuarioTwitch}</Text>
                <Text style={styles.subtitulo}>{textoEmail}</Text>
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
    contenedorCarga: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503484'
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
    contenedorBoton: {
        marginTop: 200,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
    },
    botonGris: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#A0A0A0',
    },
});

export default PantallaPerfilUsuario