import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable, Linking, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const Pantalla3 = (props) => {

    const tmi = require("tmi.js");
    const { subscribers } = require("tmi.js/lib/commands");
    const { badgeInfo, badges } = require("tmi.js/lib/parser");

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={styles.contenedor}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "position" : ""}>
                <View style={styles.contenedorImagen}>
                    <Image style={styles.imagen} source={require('../assets/logo_twiBOT.png')} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.contenedorScroll}>
                    <Text style={styles.textoChat}>hoLA</Text>

                </ScrollView>
            </KeyboardAvoidingView>
            <StatusBar style="auto" />
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
        width: 60,
        height: 60,
        borderRadius: 20,
        overflow: 'visible',
        marginTop: 40,
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
    contenedorScroll: {
        marginTop: 30,
        width: 350,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 30,
        borderRadius: 10,
    },
    textoChat: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 15,
    }
});
export default Pantalla3;



