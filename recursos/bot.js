const tmi = require("tmi.js");
const { subscribers } = require("tmi.js/lib/commands");
const { badgeInfo, badges } = require("tmi.js/lib/parser");

const options = {
    options: {
        debug: true,
    },
    identity: {
        username: 'neoalek',
        password: 'oauth:p68byxq04q1ierh1gx36a0a362z0hh',
    }, 
    channels: ['neoalek']
}

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

    if (comando === '!hello'){
        // client.say(target, `¡Bienvenido ${context["display-name"]}! Llevas suscrito ${context["badge-info"].subscriber} meses`);
        client.say(target, `¡Bienvenido ${context["display-name"]}!`);
    }else if (comando == '!caca'){
        client.say(target, `VAYA VAYA, CONQUE TE GUSTA HACER POPÓ ${context["display-name"]}`);
        console.log(context);
    }else if (comando == '!ruleta'){
        const sides = 6;
        let numero = Math.floor(Math.random() * sides) + 1;

        if (numero >= 7){
            client.say(target, `Has sacado ${numero}. Te has salvado ${context["display-name"]}`);
        } else {
            //client.action(target, `/timeout ${username} 10`)
            client.timeout('neoalek', context.username, 10, '¡Has fallado!')
            client.say(target, `¡La has cagado ${context["display-name"]}! Has sacado ${numero} y te has pegado un tiro.`);
            client.getOptions()
        }
    }
    
})