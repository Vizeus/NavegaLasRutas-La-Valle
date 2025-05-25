// Importá las funciones necesarias desde los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

// Configuración de Firebase de tu aplicación web
// Para Firebase JS SDK versión 7.20.0 y posteriores, measurementId es opcional
const firebaseConfig = {
    apiKey: "AIzaSyB6FMKWl-J5DV2n0qTWNDp-fmY-t503a2E",
    authDomain: "mi-e-commerce---curso-react.firebaseapp.com",
    projectId: "mi-e-commerce---curso-react",
    storageBucket: "mi-e-commerce---curso-react.firebasestorage.app",
    messagingSenderId: "706505808951",
    appId: "1:706505808951:web:092347b064763b238f33b2",
    measurementId: "G-ZDN9YV89RR"
};

// Inicializo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };





