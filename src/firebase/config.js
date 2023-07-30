import exp from "constants";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK0iVAvJTIoN1eyX6enh4hIE2SMUt6OEw",
  authDomain: "e-commerce-7b0b7.firebaseapp.com",
  projectId: "e-commerce-7b0b7",
  storageBucket: "e-commerce-7b0b7.appspot.com",
  messagingSenderId: "939366286078",
  appId: "1:939366286078:web:2d947c5b13e88f34675baf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
