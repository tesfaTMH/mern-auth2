// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth2-20f54.firebaseapp.com",
  projectId: "mern-auth2-20f54",
  storageBucket: "mern-auth2-20f54.appspot.com",
  messagingSenderId: "449347192981",
  appId: "1:449347192981:web:3a1f4320f889939da3739c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
