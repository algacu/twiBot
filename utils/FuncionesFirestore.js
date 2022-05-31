import { db } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

//Funciones que sirven para cargar determinados datos en Firestore.

//Carga las parametrizaciones del bot definidas por el usuario (id), 
// para tenerlas disponibles la próxima vez que utilice la app.
export const actualizarBD = async (campo, datos, id) => {
    const actualiza = doc(db, 'usuarios', id);
    switch (campo) {
        case 'token':
            await updateDoc(actualiza, {
                token: datos
            });
            break;
        case 'usuario':
            await updateDoc(actualiza, {
                usuario: datos
            });
            break;
        case 'palabrasSecretas':
            await updateDoc(actualiza, {
                palabrasSecretas: datos
            });
            break;
        case 'palabrasCensuradas':
            await updateDoc(actualiza, {
                palabrasCensuradas: datos
            });
            break;
        case 'dados':
            await updateDoc(actualiza, {
                dados: datos
            });
            break;
    }
}

//Carga determinados datos de un streaming al día, utilizando al usuario y la fecha del streaming
// como id para la creación de registro.
export const cargarDatosStreaming = async (id, usuarios, expulsados, hora) => {
    await setDoc(doc(db, 'streamings', id), {
        usuarios: usuarios,
        expulsados: expulsados,
        hora: hora,
    });
}

