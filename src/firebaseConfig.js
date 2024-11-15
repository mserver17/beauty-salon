// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1tHaoQLeWCwchNBQiL18hNJM6twZUQE",
  authDomain: "beauty-salon-469a3.firebaseapp.com",
  databaseURL:
    "https://beauty-salon-469a3-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "beauty-salon-469a3",
  storageBucket: "beauty-salon-469a3.firebasestorage.app",
  messagingSenderId: "536459382197",
  appId: "1:536459382197:web:4180dee806a94a8cd75dfc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
