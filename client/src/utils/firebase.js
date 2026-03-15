
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "interviewiq-b7a0f.firebaseapp.com",
  projectId: "interviewiq-b7a0f",
  storageBucket: "interviewiq-b7a0f.firebasestorage.app",
  messagingSenderId: "822099881850",
  appId: "1:822099881850:web:ff9533675ad1c9a1ae70c3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };