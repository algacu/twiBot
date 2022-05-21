import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

function PantallaAyudaPalabrasCensuradas({ navigation }) {

    const titulo = 'Palabras Censuradas';
    const texto = 'Introduce una lista de palabras separadas por espacios y el bot las censurará cuando algún usuario las escriba.\n\nEsta función resulta útil para evitar palabras malsonantes o contenido no deseado.';
    const textoBotonAtras = 'Atrás'
    const imagen = '../assets/palabras_censuradas.png'

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorTexto}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.texto}>{texto}</Text>
            </View>
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={require(imagen)} />
            </View>
            <View style={styles.contenedorBoton}>
                <Pressable style={styles.botonGris} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoBoton}>{textoBotonAtras}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#503484',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contenedorTexto: {
        marginTop: 50,
        marginLeft: 35,
        marginRight: 35,
    },
    contenedorImagen: {
        width: 275,
        height: 275,
        marginTop: 20,

    },
    imagen: {
        height: '100%',
        width: '100%',
        opacity: 0.9,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    texto: {
        marginTop: 25,
        lineHeight: 25,
        fontSize: 16,
        color: 'white',
    },
    textoBoton: {
        lineHeight: 20,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    contenedorBoton: {
        marginTop: 30,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        alignSelf: 'center',
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
});

export default PantallaAyudaPalabrasCensuradas;