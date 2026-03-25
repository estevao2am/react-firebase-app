import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgUktSGTsqFU73maIdvKTdfMu_UpWZbLw",
  authDomain: "curso-react-e52a0.firebaseapp.com",
  databaseURL:
    "https://curso-react-e52a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "curso-react-e52a0",
  storageBucket: "curso-react-e52a0.firebasestorage.app",
  messagingSenderId: "1065039719649",
  appId: "1:1065039719649:web:d4fd15ac30cddf15019ba0",
  measurementId: "G-D9EDKMP3V3",
};

const firebaseAPP = initializeApp(firebaseConfig);
const db = getFirestore(firebaseAPP);
const auth = getAuth(firebaseAPP);

export { db, auth };
