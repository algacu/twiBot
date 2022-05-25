// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLGlKKgdoI_GIxchV2DO6tMnhc1MSfHT8",
  authDomain: "twibot-6e7f3.firebaseapp.com",
  projectId: "twibot-6e7f3",
  storageBucket: "twibot-6e7f3.appspot.com",
  messagingSenderId: "218668505458",
  appId: "1:218668505458:web:f0117edbdded1585fce5eb",
  measurementId: "G-B6XPHGMNRE"
};

// // Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


export { auth, db };
