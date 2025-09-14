import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDxk0IKsri0BQX6u31yMCVRQtcpFYhyCs",
  authDomain: "react-native-mobile-69555.firebaseapp.com",
  projectId: "react-native-mobile-69555",
  storageBucket: "react-native-mobile-69555.firebasestorage.app",
  messagingSenderId: "233948645952",
  appId: "1:233948645952:web:b00098a714ac9353d32da5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };