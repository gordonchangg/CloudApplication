// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzdaaoY7SqOEN-yDJKaOkGIVdX467Y2Wc",
  authDomain: "cloudapplication-fa907.firebaseapp.com",
  projectId: "cloudapplication-fa907",
  storageBucket: "cloudapplication-fa907.firebasestorage.app",
  messagingSenderId: "503233102260",
  appId: "1:503233102260:web:7a36c13434af37b58132e1",
  measurementId: "G-LDTS15HKVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);