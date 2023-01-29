import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKl6v2EXzUdQB0KcRFn8H_8598j3F0zR4",
  authDomain: "music-player-iso.firebaseapp.com",
  projectId: "music-player-iso",
  storageBucket: "music-player-iso.appspot.com",
  messagingSenderId: "462499639122",
  appId: "1:462499639122:web:df092af5dfcd8d9c25948b",
  measurementId: "G-S6Z5X7WPSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
