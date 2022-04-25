import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable, Linking, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const PantallaConexion3 = (props) => {

    const texto1 = "Obtén tu token autentificador para \n hacer uso de los servicios de Twitch."
    const textoBotonObtenerToken = "Obtén tu token"
    const responseType = "token"
    const clientID = "0tsnjkv1fmhamkhkuwm9vuglxfmlfg"
    const redirectUri = "https://twitchapps.com/tokengen/"
    const scope = "channel%3Amanage%3Apolls+channel%3Aread%3Apolls"
    const [estado, setEstado] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [uriToken, setUriToken] = useState('');
    const textoBoton2 = "Atrás"
    const inputUsuario = "Introduce tu usuario"

    useEffect(() => {
        generaEstado();
        setUriToken(`https://id.twitch.tv/oauth2/authorize` +
            `?response_type=${responseType}` +
            `&client_id=${clientID}` +
            `&redirect_uri=${redirectUri}` +
            `&scope=${scope}` +
            `&state=${estado}`);
    }, [])

    const generaEstado = async () => {
        try {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            setEstado(text);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.contenedor}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "position": ""}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contenedorImagen}>
                        <Image style={styles.imagen} source={require('../assets/logo_twiBOT.png')} />
                    </View>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.titulo}>Paso 1</Text>
                        <Text style={styles.texto1}>{texto1}</Text>
                    </View>
                    <View style={styles.contenedorBoton1}>
                        <Pressable style={styles.botonVerde} onPress={() => { Linking.openURL(uriToken) }}>
                            <Text style={styles.texto}>{textoBotonObtenerToken}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorInput}>
                        <Text style={styles.textoInput}>Copia y pega tu token</Text>
                        <TextInput style={styles.input} placeholder='Introduce tu token' value={token} onChangeText={setToken} />
                        <Text style={styles.textoInput}>{inputUsuario}</Text>
                        <TextInput style={styles.input} placeholder='Introduce tu usuario' value={user} onChangeText={setUser} />
                    </View>
                    <View style={styles.contenedorBoton2}>
                        <Pressable style={styles.botonVerde} onPress={() => props.navigation.navigate('Conexion3')}>
                            <Text style={styles.texto}>Siguiente</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorBoton3}>
                        <Pressable style={styles.botonGris} onPress={() => props.navigation.navigate('Conexion1')}>
                            <Text style={styles.texto}>Atrás</Text>
                        </Pressable>
                    </View>
                    <StatusBar style="auto" />
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
        marginTop: 60,
        //Properties to setup your Shadow 
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
    textoInput: {
        marginTop: 5,
        lineHeight: 15,
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    textoInput2: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
    contenedorInput: {
        marginTop: 20,
        alignSelf: 'center',
    },
    contenedorBoton1: {
        marginTop: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black",
        alignSelf: 'center',
    },
    contenedorBoton2: {
        marginTop: 30,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black",
        alignSelf: 'center',
    },
    contenedorBoton3: {
        marginTop: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black",
        alignSelf: 'center',
    },
    botonVerde: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#85AD3A',
    },
    botonGris: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#A0A0A0',
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 200,
        height: 40,
        marginTop: 8,
        marginBottom: 8,
    },

});
export default PantallaConexion3;



