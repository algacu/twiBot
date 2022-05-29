import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable, Linking, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import global from '../Global'
import { actualizarBD } from '../../utils/FuncionesFirestore';

const PantallaConfigPaso1 = (props) => {

    const logo = '../../assets/logo_twiBOT.png';
    const titulo = 'Paso 1';
    const subtitulo = 'Obtén tu token autentificador para \n hacer uso de los servicios de Twitch';
    const textoBotonObtenerToken = 'Obtén tu token'
    const inputUsuario = 'Introduce tu usuario:';
    const inputToken = 'Copia y pega tu token:';
    const textoBotonSiguiente = 'Siguiente';

    const [user, setUser] = useState(global.user);
    const [token, setToken] = useState(global.token);
    const [email] = useState(global.email);

    const guardaVariablesGlobales = async () => {
        try {
            global.user = user;
            global.token = token;
            global.email = email;
            actualizarBD('usuario', user, email)
            actualizarBD('token', token, email)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.contenedor}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "position" : ""}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contenedorLogo}>
                        <Image style={styles.logo} source={require(logo)} />
                    </View>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.titulo}>{titulo}</Text>
                        <Text style={styles.subtitulo}>{subtitulo}</Text>
                    </View>
                    <View style={styles.contenedorBotonToken}>
                        <Pressable style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.5 : 1.0, alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 12,
                                paddingHorizontal: 32,
                                borderRadius: 4,
                                elevation: 3,
                                backgroundColor: '#85AD3A',
                            }
                        ]}
                            onPress={() => { Linking.openURL('https://twitchapps.com/tmi/') }}>
                            <Text style={styles.textoBoton}>{textoBotonObtenerToken}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorInput}>
                        <Text style={styles.textoInput}>{inputToken}</Text>
                        <TextInput style={styles.input} secureTextEntry={true} value={token} onChangeText={setToken} autoCapitalize='none' />
                        <Text style={styles.textoInput}>{inputUsuario}</Text>
                        <TextInput style={styles.input} value={user} onChangeText={setUser} autoCapitalize='none' />
                    </View>
                    <View style={styles.contenedorBotonSiguiente}>
                        <Pressable style={styles.botonVerde} onPress={() => { guardaVariablesGlobales(); props.navigation.navigate('PantallaConfigPaso2'); }}>
                            <Text style={styles.texto}>{textoBotonSiguiente}</Text>
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
        justifyContent: 'flex-start',
    },
    contenedorLogo: {
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
    logo: {
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
    textoBoton: {
        fontSize: 16.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    subtitulo: {
        marginTop: 5,
        lineHeight: 25,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    textoInput: {
        marginTop: 10,
        lineHeight: 15,
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    contenedorInput: {
        marginTop: 20,
        alignSelf: 'center',
    },
    contenedorBotonToken: {
        marginTop: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        alignSelf: 'center',
    },
    contenedorBotonSiguiente: {
        marginTop: 65,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        alignSelf: 'center',
    },
    contenedorBotonAtras: {
        marginTop: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.77)',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 200,
        height: 35,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        padding: 5,
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
    botonGris: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#A0A0A0',
    },
    texto: {
        fontSize: 16.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default PantallaConfigPaso1;



