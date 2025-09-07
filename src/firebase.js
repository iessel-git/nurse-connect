// src/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAmEJootCl6dkOtDNe-ZR-twfDm480Dlc",
  authDomain: "nurse-connect-c4db9.firebaseapp.com",
  projectId: "nurse-connect-c4db9",
  storageBucket: "nurse-connect-c4db9.firebasestorage.app",
  messagingSenderId: "1003234282904",
  appId: "1:1003234282904:web:7d503daab415845d4dafed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB
export const db = getFirestore(app);
