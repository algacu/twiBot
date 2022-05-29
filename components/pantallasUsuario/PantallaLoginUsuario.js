import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, TextInput, Alert, StatusBar } from 'react-native';
import global from '../Global'

import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context';

export const PantallaLoginUsuario = (props) => {

    const logo = '../../assets/logo_twiBOT.png'
    const titulo = 'Tú mandas'
    const texto1 = 'Convierte tu perfil de Twitch en un bot \n y modera fácilmente tus streams'
    const texto2 = '¡Configura tu propio bot en 3 pasos!'
    const textoBotonLogin = 'Comenzar'
    const textoCrearCuenta = 'Registrarse'
    const textoEmail = 'Correo electrónico'
    const textoContrasenya = 'Contraseña'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = React.useContext(AuthContext);

    const getData = async (user) => {
        const docRef = doc(db, 'usuarios', user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            //const string = JSON.stringify(docSnap.data());
            const data = docSnap.data();
            global.user = data.usuario;
            global.token = data.token;
            global.palabrasCensuradas = data.palabrasCensuradas;
            global.palabrasSecretas = data.palabrasSecretas;
            global.dados = data.dados;
            global.email = data.email;
            global.nombre = data.nombre;
        } else {
            // doc.data() will be undefined in this case
            console.log("¡No se ha encontrado al usuario en la BD!");
        }
    }

    useEffect(() => {
        // const unsuscribe = auth.onAuthStateChanged(user => {
        //     if (user) {
        //         navigation.navigate('PantallaUsuarioLoginOk')
        //     }
        // })
        // return unsuscribe
    }, [])

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const email = userCredential.user.email;
                console.log('Logueado', 'Email: ' + email);
                console.log(userCredential.user)
                getData(email)
                signIn();
            })
            .catch(error => {
                console.log(error);
                var stringError = '';
                if (error.code === "auth/wrong-password") {
                    stringError = "Contraseña incorrecta.";
                } else if (error.code === "auth/internal-error") {
                    stringError = "Por favor, revisa los campos de login.";
                } else if (error.code === "auth/user-not-found") {
                    stringError = "Usuario no encontrado.";
                } else if (error.code === "auth/invalid-email") {
                    stringError = "El email introducido no es válido.";
                }
                else {
                    stringError = error.message;
                }
                Alert.alert('Error', stringError)
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
                <Text style={styles.texto1}>{texto1}</Text>
            </View>
            <View style={styles.contenedorInput}>
                <Text style={styles.textoInput}>{textoEmail}</Text>
                <TextInput style={styles.input} keyboardType='email-address' textContentType='emailAddress' value={email} onChangeText={setEmail} placeholder='email@email.com' placeholderTextColor = "rgba(0, 0, 0, 0.25)" autoCapitalize='none' />
                <Text style={styles.textoInput}>{textoContrasenya}</Text>
                <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='contraseña' placeholderTextColor = "rgba(0, 0, 0, 0.25)" autoCapitalize='none' />
            </View>
            <View style={styles.contenedorBoton}>
                <Pressable style={styles.botonVerde} onPress={handleSignIn}>
                    <Text style={styles.texto}>{textoBotonLogin}</Text>
                </Pressable>
                <Pressable onPress={() => props.navigation.navigate('PantallaCrearUsuario')}>
                    <Text style={styles.texto3}>{textoCrearCuenta}</Text>
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
        textAlign: 'center',
    },
    texto1: {
        marginTop: 5,
        lineHeight: 25,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    texto2: {
        marginTop: 100,
        lineHeight: 25,
        fontSize: 19,
        color: 'white',
        textAlign: 'center',
    },
    texto3: {
        marginTop: 15,
        lineHeight: 15,
        fontSize: 14,
        color: '#e0e0e0',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    contenedorInput: {
        marginTop: 20,
        alignSelf: 'center',
    },
    textoInput: {
        marginTop: 10,
        lineHeight: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.77)',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 225,
        height: 35,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        padding: 5,
    },
    contenedorBoton: {
        marginTop: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
    },
    botonVerde: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#85AD3A',
        marginTop: 15,
    }
});


