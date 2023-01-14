import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "nightcravings-90cfe.firebaseapp.com",
    projectId: "nightcravings-90cfe",
    storageBucket: "nightcravings-90cfe.appspot.com",
    messagingSenderId: "47245835062",
    appId: "1:47245835062:web:50f8f0b15411046797d197",
    measurementId: "G-667SDQFYCC"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

module.exports = { firestore };