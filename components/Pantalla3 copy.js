import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, ScrollView, Text, StyleSheet, View, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const Pantalla3 = () => {

    const [datos, setDatos] = useState([]);
    const [search, setSearch] = useState('');

    //Utilizo la API de Rick y Morty para obtener información de los personajes de la serie.

    //Utilizo useEffect para lanzar getDatos y mostrar una información inicial al abrir la pantalla, con todos los personajes.
    useEffect(() => {
        getDatos();
    }, [])

    //Llamada a la Api. Construyo la uri pasándole el término de busqueda y recojo datos (array) con setDatos[];
    const getDatos = async () => {
        const resultado = await axios.get(`https://rickandmortyapi.com/api/character/?name=${search}`);
        setDatos(resultado.data.results);
    }

    //Recorro el array de datos con la función Map. En este caso, genero un bloque vista 
    //con los datos seleccionados de cada elemento del conjunto (incluyendo ID de cada elemento).
    const lista = datos.map((personaje) => (
        <View key={personaje.id} style={styles.tarjeta}>
            <Image style={styles.imagen} source={{ uri: personaje.image }} />
            <Text style={styles.nombre}>{personaje.name}</Text>
            <Text style={styles.especie}>{personaje.species}</Text>
        </View>
    ));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscador de personajes</Text>
            <TextInput style={styles.input} placeholder='Introduce un nombre' value={search} onChangeText={setSearch}/>
            <Button title='Buscar' onPress={getDatos}/>
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
    input:{
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
    nombre: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    especie: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    imagen: {
        height: 130,
        width: 130,
        borderRadius: 10,
    }
});

export default Pantalla3;