import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1dEhAERYOedPVMMRgc1aD7KKqDQnDLoE",
  authDomain: "mkimpulsa-web.firebaseapp.com",
  projectId: "mkimpulsa-web",
  storageBucket: "mkimpulsa-web.firebasestorage.app",
  messagingSenderId: "636225439258",
  appId: "1:636225439258:web:335d02482394c7c77a33a3",
  measurementId: "G-TPX3WE5EED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { app, analytics, db, auth };
