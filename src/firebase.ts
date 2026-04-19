import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Config Firebase — apiKey est une clé publique web (safe en frontend)
const firebaseConfig = {
  apiKey: "AIzaSyDUMMY-REPLACE-WITH-YOUR-WEB-API-KEY",
  authDomain: "hotel-haven-d832e.firebaseapp.com",
  projectId: "hotel-haven-d832e",
  storageBucket: "hotel-haven-d832e.firebasestorage.app",
  messagingSenderId: "957223587842",
  appId: "1:957223587842:web:5ffbecdbb629f233ca971b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Exemple : envoyer une réservation
// import { collection, addDoc } from "firebase/firestore";
// await addDoc(collection(db, "reservations"), { nom, chambre, date, createdAt: new Date() });