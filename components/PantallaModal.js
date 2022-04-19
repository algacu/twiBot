import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function PantallaModal({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla Modal</Text>
            <Button
                title='Atrás'
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

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

export default PantallaModal;