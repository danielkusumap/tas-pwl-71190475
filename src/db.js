// Conveniently import this file anywhere to use db

// import firebase from 'firebase/app'
import 'firebase/firestore'

// export const db = firebase
//     .initializeApp({ projectId: 'tas-pwl-71190475' })
//     .firestore()
// Import the functions you need from the SDKs you need
import { firestore, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCOjiT7jajGihCQ4U1rZSYbYzQaTKDLGuc",
  authDomain: "tas-pwl-71190475.firebaseapp.com",
  projectId: "tas-pwl-71190475",
  storageBucket: "tas-pwl-71190475.appspot.com",
  messagingSenderId: "1067974601378",
  appId: "1:1067974601378:web:06cc5c5711bd6e725485fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = firestore(app);

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
