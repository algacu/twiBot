import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import global from './Global'

import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const PantallaUsuarioLogin = (props) => {

    const logo = '../assets/logo_twiBOT.png'
    const titulo = 'Tú mandas'
    const texto1 = 'Convierte tu perfil de Twitch en un bot \n y modera fácilmente tus streams'
    const texto2 = '¡Configura tu propio bot en 3 pasos!'
    const textoBotonLogin = 'Login'
    const textoCrearCuenta = 'Crear Cuenta'
    const textoEmail = 'Correo electrónico'
    const textoContrasenya = 'Contraseña'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();


    // async function getCities(db) {
    //     const citiesCol = collection(db, 'cities');
    //     const citySnapshot = await getDocs(citiesCol);
    //     const cityList = citySnapshot.docs.map(doc => doc.data());
    //     return cityList;
    // }

    // const getData = async (user) => {
    //     const dbUsuarios = collection(db, 'usuarios');
    //     const dbUsuario = await getDocs(user);

    // }

    const setData = async (user) => {
        await setDoc(doc(db, 'usuarios', user), {
            usuario: '',
            token: '',
            palabrasSecretas: '',
            palabrasCensuradas: '',
            dados: false
        });
    }

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
        } else {
            // doc.data() will be undefined in this case
            console.log("¡No se ha encontrado al usuario en la BD!");
        }
    }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('PantallaUsuarioLoginOk')
            }
        })
        return unsuscribe
    }, [])

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const email = userCredential.user.email;
                console.log('Cuenta creada', 'Email: ' + email);
                Alert.alert('Cuenta creada', 'Email: ' + email);
                console.log(email);
                setData(email);
                navigation.replace('PantallaUsuarioLoginOk');
            })
            .catch(error => {
                console.log(error);
                var stringError = '';
                if (error.code === "auth/email-already-in-use") {
                    stringError = "El email introducido ya está en uso.";
                } else if (error.code === "auth/weak-password") {
                    stringError = "La contraseña debe tener al menos 6 caracteres."
                }
                else {
                    stringError = error.message;
                }
                Alert.alert('Error', stringError)
            })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const email = userCredential.user.email;
                console.log('Logueado', 'Email: ' + email);
                Alert.alert('Logueado', 'Email: ' + email);
                console.log(email);
                getData(email)
                navigation.replace('PantallaUsuarioLoginOk');
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
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={require(logo)} />
            </View>
            <View style={styles.contenedorTexto}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.texto1}>{texto1}</Text>
            </View>
            <View style={styles.contenedorInput}>
                <Text style={styles.textoInput}>{textoEmail}</Text>
                <TextInput style={styles.input} keyboardType='email-address' textContentType='emailAddress' value={email} onChangeText={setEmail} placeholder='email@email.com' autoCapitalize='none' />
                <Text style={styles.textoInput}>{textoContrasenya}</Text>
                <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='password' autoCapitalize='none' />
            </View>
            <View style={styles.contenedorBoton}>
                <Pressable style={styles.botonVerde} onPress={handleSignIn}>
                    <Text style={styles.texto}>{textoBotonLogin}</Text>
                </Pressable>
                <Pressable style={styles.botonVerdeOscuro} onPress={handleCreateAccount}>
                    <Text style={styles.texto}>{textoCrearCuenta}</Text>
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
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#85AD3A',
        marginTop: 15,
    },
    botonVerdeOscuro: {
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
export default PantallaUsuarioLogin;

