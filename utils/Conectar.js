/*En esta carpeta encontramos varias funciones que son llamadas...*/
import { Alert } from "react-native";
import { cargarDatosStreaming } from "./FuncionesFirestore";

export const conectar = (usuario, email, token, secretas, censuradas, dados) => {

    const tmi = require("tmi.js");
    const { subscribers } = require("tmi.js/lib/commands");
    const { badgeInfo, badges } = require("tmi.js/lib/parser");

    const options = {
        options: {
            debug: true,
        },
        identity: {
            username: usuario,
            password: token,
        },
        channels: [usuario],
        connection: {
            reconnect: true,
        }
    };

    const arrayPalabrasCensuradas = censuradas.split(" ");
    const arrayPalabrasSecretas = secretas.split(" ");
    const malHablados = [];
    const usuarios = [];
    const expulsados = [];
    const signos = ['.', ',', ';', ':', '-', '_', '/', ')', '(', '!']


    try {

        const client = new tmi.client(options);

        client.connect()
            .then(() => {
                Alert.alert('¡Conectado!', 'Bot conectado con éxito a\ntu canal de Twitch.\n\nPuedes desconectar el bot escribiendo\n!quitarbot en el chat.')
            })
            .catch(() => {
                Alert.alert('Error al conectar', 'Por favor, revisa tu usuario y token de Twitch');
            })

        client.on('connected', (address, port) => {
            client.action(options.channels[0], `¡Hola a todos! twiBot conectado a ${address}:${port}. ¡Probad a escribir "!hola" !`)
            console.log(censuradas)
            console.log(secretas)
        });

        client.on('chat', (target, context, message, self) => {
            if (self) return; //Si el mensaje viene por parte del bot, return (para no entrar en bucle).

            //ANALIZAR EL CONTEXTO (función para controlar datos context)
            const mensaje = message.toLowerCase();
            const palabras = mensaje.split(" ");

            const usuario = `${context["display-name"]}`
            
            if (usuarios.includes(usuario) === false){
                usuarios.push(usuario);
            }
            
            palabras.forEach(palabra => {

                signos.forEach(signo => {
                    if (signo === palabra.substring(palabra.length-1, palabra.length)){
                        palabra = palabra.substring(0, palabra.length - 1)
                    } else if (signo === palabra.substring(0, 1)){
                        palabra = palabra.substring(1, palabra.length)
                    }
                })

                arrayPalabrasSecretas.forEach(secreta => {
                    if (secreta === palabra) {
                        const mayus = palabra.toUpperCase();
                        client.say(target, `¡${context["display-name"]} ha descubierto una palabra secreta: ${mayus}!`);
                    }
                })
                arrayPalabrasCensuradas.forEach(censurada => {
                    if (censurada === palabra) {

                        var malHablado = `${context["display-name"]}`;
                        var cuenta = 0;

                        malHablados.push(malHablado)

                        malHablados.forEach(elemento => {
                            if (elemento === malHablado) {
                                cuenta++;
                            }
                        })

                        if (cuenta === 1) {
                            client.say(target, `¡CUIDADO CON EL LENGUAJE ${context["display-name"]}! Primer strike...`);
                        } else if (cuenta === 2) {
                            client.say(target, `¡CUIDADO CON EL LENGUAJE ${context["display-name"]}! Segundo strike...`);
                        } else if (cuenta >= 3) {
                            client.say(target, `¡CUIDADO CON EL LENGUAJE ${context["display-name"]}! ¡¡Tercer strike y... OUT!!`);
                            if (expulsados.includes(malHablado) === false){
                                expulsados.push(malHablado);
                            }
                            client.timeout(options.channels[0], context.username, 60, 'Uso continuado de lenguaje malsonante.')
                            client.say(target, `¡Te has pasado ${context["display-name"]}! Quedas expulsad@ temporalmente del chat por usar lenguaje malsonante.`);
                        }
                    }
                })
            });

            if (palabras.includes('!hola')) {
                // client.say(target, `¡Bienvenido ${context["display-name"]}! Llevas suscrito ${context["badge-info"].subscriber} meses`);
                client.say(target, `¡Bienvenid@ ${context["display-name"]}!`);
            }

            if (palabras.includes('!dados') && dados === true) {

                if (context.username.toLowerCase() === options.identity.username) {
                    client.say(target, 'Un buen streamer no juega a los dados.');
                } else {
                    const sides = 6;
                    let numero = Math.floor(Math.random() * sides) + 1;
                    if (numero >= 3) {
                        client.say(target, `Has sacado ${numero}. ¡Te has salvado ${context["display-name"]}!`);
                    } else {
                        client.timeout(options.channels[0], context.username, 60, 'Mala suerte en los dados.')
                        client.say(target, `¡Mala suerte ${context["display-name"]}! Has sacado ${numero} y quedas expulsad@ temporalmente.`);
                    }
                }
            }

            if (palabras.includes('!quitarbot') && context.username.toLowerCase() === options.identity.username) {
                
                var current = new Date();
                var dia = current.toLocaleDateString();
                var diaFormateado = dia.replace('/', '.');
                var fechaFormateada = diaFormateado.replace('/', '.');
                var id = email + '-' + fechaFormateada;
                cargarDatosStreaming(id, usuarios.toString(), expulsados.toString(), current.toLocaleTimeString())
                client.say(target, 'twiBot desconectado.');
                client.disconnect();
            }

        })

    } catch (error) {
        console.log(error);
    }
};



