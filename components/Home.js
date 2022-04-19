import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button
                title="Abrir modal"
                onPress={() => navigation.navigate('PantallaModal')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    title: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Home;