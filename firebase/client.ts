// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBQsa7242E9YSFHDf522lWAQ5XfYHyvZQ",
  authDomain: "interviewer-ai-2c6c2.firebaseapp.com",
  projectId: "interviewer-ai-2c6c2",
  storageBucket: "interviewer-ai-2c6c2.firebasestorage.app",
  messagingSenderId: "844064769932",
  appId: "1:844064769932:web:a63bf3b9f50bd4d88138a9",
  measurementId: "G-4F0FCEMCE1"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const db = getFirestore(app);
