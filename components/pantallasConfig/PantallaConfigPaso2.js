import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, Text, Icon, View, Image, Pressable, SafeAreaView, KeyboardAvoidingView, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import global from '../Global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { actualizarBD } from '../../utils/FuncionesFirestore';


const PantallaConfigPaso2 = (props) => {

    const logo = '../../assets/logo_twiBOT.png';
    const titulo = 'Paso 2';
    const subtitulo = 'Personaliza las funciones de tu bot';
    const textoBotonSiguiente = 'Siguiente';
    const textoBotonAtras = 'Atrás';
    const inputPalabrasSecretas = 'Palabras secretas:';
    const inputPalabrasCensuradas = 'Censura palabras:';
    const toggleSwitch1Texto = 'Juego de los dados';
    const [dados, setDados] = useState(global.dados);
    const activaDados = () => setDados(previousState => !previousState);
    const [palabrasSecretas, setPalabrasSecretas] = useState(global.palabrasSecretas);
    const [palabrasCensuradas, setPalabrasCensuradas] = useState(global.palabrasCensuradas);
    const [email] = useState(global.email);

    const guardaVariablesGlobales = async () => {
        try {
            global.palabrasSecretas = palabrasSecretas;
            global.palabrasCensuradas = palabrasCensuradas;
            global.dados = dados;
            global.email = email;
            actualizarBD('palabrasCensuradas', palabrasCensuradas, email)
            actualizarBD('palabrasSecretas', palabrasSecretas, email)
            actualizarBD('dados', dados, email)
        } catch (error) {
            console.log(error)
        }
    }

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
                    <View style={styles.contenedorInput}>
                        <Text style={styles.textoInput}>{inputPalabrasSecretas}</Text>
                        <View flexDirection='row'>
                            <TextInput style={styles.input} value={palabrasSecretas} onChangeText={setPalabrasSecretas} autoCapitalize='none' />
                            <Pressable style={styles.botonAyuda} onPress={() => props.navigation.navigate('PantallaAyudaPalabrasSecretas')}>
                                <MaterialCommunityIcons name="help" color={'white'} size={20} />
                            </Pressable>
                        </View>
                        <Text style={styles.textoInput}>{inputPalabrasCensuradas}</Text>
                        <View flexDirection='row'>
                            <TextInput style={styles.input} value={palabrasCensuradas} onChangeText={setPalabrasCensuradas} autoCapitalize='none' />
                            <Pressable style={styles.botonAyuda} onPress={() => props.navigation.navigate('PantallaAyudaPalabrasCensuradas')}>
                                <MaterialCommunityIcons name="help" color={'white'} size={20} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.contenedorTexto2}>
                        <Text style={styles.textoInput}>{toggleSwitch1Texto}</Text>
                    </View>
                    <View style={styles.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: '#a8323e', true: '#4e730d' }}
                            thumbColor={dados ? '#85AD3A' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={activaDados}
                            value={dados}
                        />
                        <Pressable style={styles.botonAyuda2} onPress={() => props.navigation.navigate('PantallaAyudaDados')}>
                            <MaterialCommunityIcons name="help" color={'white'} size={16} />
                        </Pressable>
                    </View>
                    <View style={styles.contenedorBotonSiguiente}>
                        <Pressable style={styles.botonVerde} onPress={() => { guardaVariablesGlobales(); props.navigation.navigate('PantallaConfigPaso3'); }}>
                            <Text style={styles.texto}>{textoBotonSiguiente}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenedorBotonAtras}>
                        <Pressable style={styles.botonGris} onPress={() => props.navigation.navigate('PantallaConfigPaso1')}>
                            <Text style={styles.texto}>{textoBotonAtras}</Text>
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
    contenedorTexto2: {
        marginTop: 10,
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
    texto: {
        fontSize: 16.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textoInput: {
        marginTop: 5,
        lineHeight: 15,
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    contenedorInput: {
        marginTop: 20,
        alignSelf: 'center',
    },
    contenedorSwitch: {
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    contenedorBoton2: {
        marginTop: 30,
        marginBottom: 30,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        alignSelf: 'center',
    },
    contenedorBoton3: {
        marginTop: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        alignSelf: 'center',
    },
    botonAyuda: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 25,
        height: 30,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 5,
        paddingVertical: 5,
        paddingHorizontal: 2,
    },
    botonAyuda2: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 25,
        height: 25,
        borderRadius: 5,
        marginLeft: 5,
        paddingVertical: 3,
        paddingHorizontal: 2,
        marginTop: 3,
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
    contenedorBotonSiguiente: {
        marginTop: 93,
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
    }
});

export default PantallaConfigPaso2;



