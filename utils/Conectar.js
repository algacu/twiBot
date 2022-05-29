/*En esta carpeta encontramos varias funciones que son llamadas...*/
import { Alert } from "react-native";

export const conectar = (usuario, token, secretas, censuradas) => {

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
    const recuentoMalHablados = [];


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
            client.action(options.channels[0], `¡Hola a todos! Conectado a ${address}:${port}`)
            console.log(censuradas)
            console.log(secretas)
        });

        client.on('chat', (target, context, message, self) => {
            if (self) return; //Si el mensaje viene por parte del bot, return (para no entrar en bucle).

            //ANALIZAR EL CONTEXTO (función para controlar datos context)
            let mensaje = message.toLowerCase(); //Limpiamos los espacios en la cadena de texto del mensaje.
            const palabras = mensaje.split(" ");

            console.log(secretas)
            console.log(censuradas)
            //const arrayPalabrasSecretas = palabrasSecretas.split(" ");
            //const arrayPalabrasCensuradas = palabrasCensuradas.split(" ");

            palabras.forEach(palabra => {
                if (typeof palabra === 'string') {
                    palabra.trim();
                }
                arrayPalabrasSecretas.forEach(secreta => {
                    if (secreta === palabra) {
                        const mayus = palabra.toUpperCase();
                        client.say(target, `¡${context["display-name"]} ha descubierto una palabra secreta: ${mayus}!`);
                    }
                })
                arrayPalabrasCensuradas.forEach(censurada => {
                    var malHablado = context["display-name"]
                    malHablados.push(malHablado)
                    if (censurada === palabra) {
                        client.say(target, `MALHABLADO`);
                        malHablados.forEach(usuario => (recuentoMalHablados[usuario] = recuentoMalHablados[usuario] + 1 || 1))
                        if (recuentoMalHablados[malHablado === 1]) {
                            client.say(target, `¡CUIDADO CON EL LENGUAJE ${context["display-name"]}! Primer strike...`);
                        } else if (recuentoMalHablados[malHablado === 2]) {
                            client.say(target, `¡CUIDADO CON EL LENGUAJE ${context["display-name"]}! Segundo strike...`);
                        } else if (recuentoMalHablados[malHablado > 2]) {
                            client.say(target, `¡CUIDADO CON EL LENGUAJE ${context["display-name"]}! ¡¡Tercer strike y... OUT!!`);
                        }

                    }
                })
            });

            //palabras.forEach(palabra => console.log(palabra))

            if (palabras.includes('!hello')) {
                // client.say(target, `¡Bienvenido ${context["display-name"]}! Llevas suscrito ${context["badge-info"].subscriber} meses`);
                client.say(target, `¡Bienvenido ${context["display-name"]}!`);
            } else if (palabras.includes('!caca')) {
                client.say(target, `VAYA VAYA, CONQUE TE GUSTA HACER POPÓ ${context["display-name"]}`);
                //console.log(context);
            } else if (palabras.includes('!ruleta')) {

                if (context.username.toLowerCase() === options.identity.username) {
                    client.say(target, 'Un buen streamer no juega a los dados.');
                } else {
                    const sides = 6;
                    let numero = Math.floor(Math.random() * sides) + 1;

                    if (numero >= 7) {
                        client.say(target, `Has sacado ${numero}. Te has salvado ${context["display-name"]}`);
                    } else {
                        //client.action(target, `/timeout ${username} 10`)
                        client.timeout(options.channels[0], context.username, 10, '¡Has fallado!')
                        client.say(target, `¡La has cagado ${context["display-name"]}! Has sacado ${numero} y te has pegado un tiro.`);
                        client.getOptions()
                    }
                }
            } else if (palabras.includes('!quitarbot') && context.username.toLowerCase() === options.identity.username) {
                client.say(target, 'Bot desconectado.');
                client.disconnect();
            }

        })

    } catch (error) {
        console.log(error);
    }
};



