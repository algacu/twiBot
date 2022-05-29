import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { global } from '../components/Global';

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

export const cargarDatosStreaming = async (id, usuarios, expulsados, hora) => {
    await setDoc(doc(db, 'streamings', id), {
        usuarios: usuarios,
        expulsados: expulsados,
        hora: hora,
    });
}

