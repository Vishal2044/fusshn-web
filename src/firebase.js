import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object containing project credentials
const firebaseConfig = {
  apiKey: "AIzaSyD_qheSZktpfGmF-txgA7saVD3oCVYpRHw",
  authDomain: "mad-over-grills.firebaseapp.com",
  projectId: "mad-over-grills",
  storageBucket: "mad-over-grills.firebasestorage.app",
  messagingSenderId: "938529738100",
  appId: "1:938529738100:web:41dcb8e2663237b51b3021",
  measurementId: "G-QZMY5SQDPN"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance
export const auth = getAuth(app);

// Export Firestore database instance
export const db = getFirestore(app);

export default app;