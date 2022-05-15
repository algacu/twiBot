import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Button, Pressable, Linking, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import global from './Global'

const PantallaChat = (props) => {

    const tmi = require("tmi.js");
    const { subscribers } = require("tmi.js/lib/commands");
    const { badgeInfo, badges } = require("tmi.js/lib/parser");
    const [texto, setTexto] = useState('');


    let mensajes = [];
    const listaMensajes = [];


    const options = {
        options: {
            debug: true,
        },
        identity: {
            username: global.user,
            password: global.token,
        },
        channels: [global.channel]
    }

    const conectaChat = async () => {
        try {
            alert(options.identity.username + ' ' + options.identity.password)
            const client = new tmi.client(options);
            client.connect();

            client.on('connected', (address, port) => {
                client.action('neoalek', `¡Hola a todos! Conectado a ${address}:${port}`)

            })

            client.on('chat', (target, context, message, self) => {
                if (self) return; //Si el mensaje viene por parte del bot, return (para no entrar en bucle).

                //ANALIZAR EL CONTEXTO (función para controlar datos context)

                let comando = message.trim(); //Limpiamos los espacios en la cadena de texto del mensaje.
                comando = comando.toLowerCase();

                mensajes.push("\n" + context['display-name'] + ': ' + message);

                alert(mensajes[0]);

                listaMensajes = mensajes.map((mensaje) => (
                    <View>
                        <Text>{mensaje.text}</Text>
                    </View>
                ));

                //setTexto(context['display-name'] + ': ' + message)

                if (comando === '!hello') {
                    // client.say(target, `¡Bienvenido ${context["display-name"]}! Llevas suscrito ${context["badge-info"].subscriber} meses`);
                    client.say(target, `¡Bienvenido ${context["display-name"]}!`);
                } else if (comando == '!caca') {
                    client.say(target, `VAYA VAYA, CONQUE TE GUSTA HACER POPÓ ${context["display-name"]}`);
                    console.log(context);
                } else if (comando == '!ruleta') {
                    const sides = 6;
                    let numero = Math.floor(Math.random() * sides) + 1;

                    if (numero >= 7) {
                        client.say(target, `Has sacado ${numero}. Te has salvado ${context["display-name"]}`);
                    } else {
                        //client.action(target, `/timeout ${username} 10`)
                        client.timeout('neoalek', context.username, 10, '¡Has fallado!')
                        client.say(target, `¡La has cagado ${context["display-name"]}! Has sacado ${numero} y te has pegado un tiro.`);
                        client.getOptions()
                    }
                }

            })

        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.contenedor}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "position" : ""}>
                <View style={styles.contenedorImagen}>
                    <Image style={styles.imagen} source={require('../assets/logo_twiBOT.png')} />
                    <Button title="conecta" onPress={() => conectaChat()}></Button>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.contenedorScroll}>
                    {listaMensajes}
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
export default PantallaChat;



