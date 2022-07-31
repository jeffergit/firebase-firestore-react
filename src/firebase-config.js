// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI7KbWm7heGJyawVfczHXjhOyd7f3orUA",
  authDomain: "utak-exam-jeffersoncruz.firebaseapp.com",
  projectId: "utak-exam-jeffersoncruz",
  storageBucket: "utak-exam-jeffersoncruz.appspot.com",
  messagingSenderId: "302232150109",
  appId: "1:302232150109:web:5fac8229426ca5768cedb4",
  measurementId: "G-58GB4VLWZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);


