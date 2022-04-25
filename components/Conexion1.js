import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const texto1 = "Convierte tu perfil de Twitch en un bot \n y modera fácilmente tus streams."
const texto2 = "¡Configura tu propio bot en 3 pasos!"
const textoBoton = "Comenzar"

const Conexion1 = (props) => {
    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={require('../assets/logo_twiBOT.png')} />
            </View>
            <View style={styles.contenedorTexto}>
                <Text style={styles.titulo}>Tú mandas.</Text>
                <Text style={styles.texto1}>{texto1}</Text>
                <Text style={styles.texto2}>{texto2}</Text>
            </View>
            <View style={styles.contenedorBoton}>
                <Pressable style={styles.boton} onPress={() => props.navigation.navigate('Conexion2')}>
                    <Text style={styles.texto}>{textoBoton}</Text>
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
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
        marginTop: 150,
        //Properties to setup your Shadow 
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
    contenedorBoton: {
        marginTop: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: "black"
    },
    boton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#85AD3A',
    }


});
export default Conexion1;

