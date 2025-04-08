import { getApps, getApp} from "firebase/app";
import { initializeApp } from "firebase/app";
import {Firestore, getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2N2IoTdE11wlM1PaZn0ey0EQLldBOUeM",
    authDomain: "notion-app-47ac7.firebaseapp.com",
    projectId: "notion-app-47ac7",
    storageBucket: "notion-app-47ac7.firebasestorage.app",
    messagingSenderId: "425140792811",
    appId: "1:425140792811:web:cd4a48bde3f086426cfdae"
  };


  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  export {db};