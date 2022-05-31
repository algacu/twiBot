import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLGlKKgdoI_GIxchV2DO6tMnhc1MSfHT8",
  authDomain: "twibot-6e7f3.firebaseapp.com",
  projectId: "twibot-6e7f3",
  storageBucket: "twibot-6e7f3.appspot.com",
  messagingSenderId: "218668505458",
  appId: "1:218668505458:web:f0117edbdded1585fce5eb",
  measurementId: "G-B6XPHGMNRE"
};

// Inicialización de los servicios Firebase (Autentificación y Almacenamiento en la nube)
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
