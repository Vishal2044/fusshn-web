import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object containing project credentials
const firebaseConfig = {
  apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance
export const auth = getAuth(app);

// Export Firestore database instance
export const db = getFirestore(app);

export default app;