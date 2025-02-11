// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTz1pAp01dwVDKi2dwYK_SncpRl53eiQI",
  authDomain: "chatapp-97dec.firebaseapp.com",
  projectId: "chatapp-97dec",
  storageBucket: "chatapp-97dec.firebasestorage.app",
  messagingSenderId: "879335037417",
  appId: "1:879335037417:web:f6a6aaeb95a91174be5378",
  measurementId: "G-NZ7WZ77ZPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);