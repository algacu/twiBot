import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, ScrollView, Text, StyleSheet, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const Pantalla4 = () => {

    const [datos, setDatos] = useState([]);
    const [search, setSearch] = useState('Spain');

    //Utilizo la API Rest Countries para obtener de los países del mundo.
    //Está configurada para coger nombres completos y parciales. Si buscamos 'italy' nos saldrá sólo Italia, 
    //pero si buscamos 'republic'nos saldrá Italia y todos los países del mundo que son repúblicas.
    //Aunque la API está en inglés, nos permite buscar países en el idioma original de cada país. Por ejemplo, 'España' y 'Spain' arrojan lo mismo.

    //Utilizo useEffect para lanzar getDatos y mostrar una información inicial al abrir la pantalla.
    //Podria no usar esta función y mostrar la pantalla en blanco, sin haber inicializado la variable search.
    useEffect(() => {
        getDatos();
    }, [])

    //Llamada a la Api. Construyo la uri pasándole el término de busqueda y recojo datos (array) con setDatos[];
    const getDatos = async () => {
        try {
            const resultado = await axios.get(`https://restcountries.com/v3.1/name/${search}`);
            setDatos(resultado.data);
        } catch (error) {
            console.log(error)
        }
    }

    //Recorro el array de datos con la función Map. En este caso, genero un bloque vista 
    //con los datos seleccionados de cada elemento del conjunto (incluyendo ID de cada elemento).
    const lista = datos.map((dato) => (
        <View key={dato.cca2} style={styles.tarjeta}>
            <View style={styles.bloque}>
                <Image style={styles.imagen} source={{ uri: dato.flags.png }} />
                <Text style={styles.title}>{dato.name.common}</Text>
                <Text style={styles.subtitle}>{dato.name.official}</Text>
            </View>
            <View style={styles.bloque}>
                <Text style={styles.texto}>Region: {dato.region}</Text>
            </View>
            <View style={styles.bloque}>
                <Text style={styles.texto}>Capital: {dato.capital}</Text>
                <Text style={styles.texto}>Población: {dato.population}</Text>
            </View>
        </View>
    ));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscador de países</Text>
            <TextInput style={styles.input} placeholder='Introduce un país' value={search} onChangeText={setSearch} />
            <Button title='Buscar' onPress={getDatos} />
            <View style={styles.container}>
                <ScrollView style={styles.container}>{lista}</ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    tarjeta: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    bloque: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        width: 200,
        height: 30,
        marginTop: 10,
        marginLeft: 75,
        fontStyle: 'italic',
    },
    title: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    texto: {
        marginTop: 3,
        fontSize: 16,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    imagen: {
        height: 120,
        width: 200,
        borderRadius: 10,
    }
});

export default Pantalla4;