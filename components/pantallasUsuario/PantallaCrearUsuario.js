import * as React from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, SafeAreaView, Pressable, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../context';
import global from '../Global';

export const PantallaCrearUsuario = (props) => {

    const logo = '../../assets/logo_twiBOT.png'
    const titulo = 'Regístrate'
    const texto1 = 'Estás a un paso de llevar tus\nstreamings a otro nivel'
    const textoNombre = 'Nombre y appelidos'
    const textoUsuarioTwitch = 'Usuario de Twitch'
    const textoEmail = 'Correo electrónico'
    const textoContrasenya = 'Contraseña de twiBot'
    const textoBotonLogin = 'Comenzar'
    const [nombre, setNombre] = useState('');
    const [usuarioTwitch, setUsuarioTwitch] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = React.useContext(AuthContext);

    //Función que carga datos en Firestore.
    const setData = async (userCredential) => {
        const email = userCredential.user.email;
        await setDoc(doc(db, 'usuarios', email), {
            nombre: nombre,
            usuario: usuarioTwitch,
            token: '',
            email: email,
            palabrasSecretas: '',
            palabrasCensuradas: '',
            dados: false,
        });
    }

    //Función que descarga los datos introducidos por el usuario
    // y los guarda en variables globales para su uso en la app.
    const getData = async (user) => {
        const docRef = doc(db, 'usuarios', user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
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

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const email = userCredential.user.email;
                console.log('Cuenta creada', 'Email: ' + email);
                setData(userCredential);
                setTimeout(() => {
                    null
                }, 3000)
                getData(email)
                signUp();
            })
            .catch(error => {
                console.log(error);
                var stringError = '';
                if (error.code === "auth/email-already-in-use") {
                    stringError = "El email introducido ya está en uso.";
                } else if (error.code === "auth/weak-password") {
                    stringError = "La contraseña debe tener al menos 6 caracteres."
                } else if (error.code === "auth/invalid-email") {
                    stringError = "El email introducido no es válido."
                }
                else {
                    stringError = error.message;
                }
                Alert.alert('Error', stringError)
            })
    }

    return (
        <SafeAreaView style={styles.contenedor}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "position"}>
                <View style={styles.contenedorImagen}>
                    <Image style={styles.imagen} source={require(logo)} />
                </View>
                <View style={styles.contenedorTexto}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.subtitulo}>{texto1}</Text>
                </View>
                <View style={styles.contenedorInput}>
                    <Text style={styles.textoInput}>{textoNombre}</Text>
                    <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder='Nombre y apellidos' placeholderTextColor="rgba(0, 0, 0, 0.25)" />
                    <Text style={styles.textoInput}>{textoUsuarioTwitch}</Text>
                    <TextInput style={styles.input} value={usuarioTwitch} onChangeText={setUsuarioTwitch} placeholder='Usuario de Twitch' placeholderTextColor="rgba(0, 0, 0, 0.25)" autoCapitalize='none' />
                    <Text style={styles.textoInput}>{textoEmail}</Text>
                    <TextInput style={styles.input} keyboardType='email-address' textContentType='emailAddress' value={email} onChangeText={setEmail} placeholder='email@email.com' placeholderTextColor="rgba(0, 0, 0, 0.25)" autoCapitalize='none' />
                    <Text style={styles.textoInput}>{textoContrasenya}</Text>
                    <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='contraseña' placeholderTextColor="rgba(0, 0, 0, 0.25)" autoCapitalize='none' />
                </View>
                <View style={styles.contenedorBoton}>
                    <Pressable style={styles.botonVerde} onPress={handleCreateAccount}>
                        <Text style={styles.texto}>{textoBotonLogin}</Text>
                    </Pressable>
                </View>
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
        width: 120,
        height: 120,
        borderRadius: 20,
        overflow: 'visible',
        marginTop: 30,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black",
        alignItems: 'center',
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
    texto: {
        fontSize: 16.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
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
        alignItems: 'center',
        alignSelf: 'center',
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


