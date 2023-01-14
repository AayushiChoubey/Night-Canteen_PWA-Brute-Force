import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "nightcravings-e274f.firebaseapp.com",
    projectId: "nightcravings-e274f",
    storageBucket: "nightcravings-e274f.appspot.com",
    messagingSenderId: "678344961370",
    appId: "1:678344961370:web:2b535646bbaa4d6c595763",
    measurementId: "G-6QJTG02JJL"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

module.exports = { firestore };