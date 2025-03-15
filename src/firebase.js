// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHetUobnpTjWVYAL-Y3jjCxSCl-EZ9mDU",
  authDomain: "onlinebookstoredashboard.firebaseapp.com",
  projectId: "onlinebookstoredashboard",
  storageBucket: "onlinebookstoredashboard.firebasestorage.app",
  messagingSenderId: "942349489254",
  appId: "1:942349489254:web:6ea95bead2cdf24f9409a7",
  measurementId: "G-1YEPYKKVDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };