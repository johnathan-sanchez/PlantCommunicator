// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy5Yg4vtogNhvs8RGnB9eiF22Ra2iun7k",
  authDomain: "leaf-link-96b37.firebaseapp.com",
  projectId: "leaf-link-96b37",
  storageBucket: "leaf-link-96b37.firebasestorage.app",
  messagingSenderId: "675172517381",
  appId: "1:675172517381:web:7572836efd887afba63e6c",
  measurementId: "G-7NPDS7SNLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);