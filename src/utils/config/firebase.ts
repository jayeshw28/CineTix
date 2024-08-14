// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBL0820AXCw9eZB45o9gz0nlwUd8las9Q",
  authDomain: "cinetix-1df00.firebaseapp.com",
  projectId: "cinetix-1df00",
  storageBucket: "cinetix-1df00.appspot.com",
  messagingSenderId: "708824069124",
  appId: "1:708824069124:web:ef2cb22da17850a5d7b151",
  measurementId: "G-D962YFT8D0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
