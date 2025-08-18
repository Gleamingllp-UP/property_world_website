import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBeoPQ7q0wIPnKNd8vyBy5N7_qQxvMivSs",
  authDomain: "property-world-abd37.firebaseapp.com",
  projectId: "property-world-abd37",
  storageBucket: "property-world-abd37.firebasestorage.app",
  messagingSenderId: "856087188213",
  appId: "1:856087188213:web:e180eca558252b52aa6bbc",
  measurementId: "G-1S6WJC56HV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
