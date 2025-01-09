import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCv1tHaoQLeWCwchNBQiL18hNJM6twZUQE",
  authDomain: "beauty-salon-469a3.firebaseapp.com",
  databaseURL:
    "https://beauty-salon-469a3-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "beauty-salon-469a3",
  storageBucket: "beauty-salon-469a3.appspot.com",
  messagingSenderId: "536459382197",
  appId: "1:536459382197:web:4180dee806a94a8cd75dfc",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
export const db = firebaseDatabase;
