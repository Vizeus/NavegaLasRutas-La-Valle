import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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