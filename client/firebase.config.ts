import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX3ja7yJVESPwLCJMrZcRKTEFfjW0Sa0w",
  authDomain: "calltube-272ef.firebaseapp.com",
  projectId: "calltube-272ef",
  storageBucket: "calltube-272ef.firebasestorage.app",
  messagingSenderId: "1081584991093",
  appId: "1:1081584991093:web:2b263b2186ee242badf13c",
  measurementId: "G-ZY0LDGRPX7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDb = getFirestore(app);
