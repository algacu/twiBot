import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Stack1 = (props) => {
    return (
        <View style={styles.layout}>
            <Text style={styles.title}>Pantalla Stack 1</Text>
            <Button
                title="Adelante"
                onPress={() => props.navigation.navigate('Stack2')}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    title: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default Stack1;

