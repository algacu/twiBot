import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { global } from '../components/Global';

export const actualizarBD = async (campo, datos, usuario) => {

    const id = 'agarcode@gmail.com'
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

export const descargarDatos = async (tipoDato) => {
    const id = 'agarcode@gmail.com'
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        if (tipoDato == 'secretas') {
            const secretas = data.palabrasSecretas;
            return secretas;
        }

    } else {
        console.log("¡No se ha encontrado el dato en la BD!");
    }
}