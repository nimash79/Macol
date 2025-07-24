// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCMzQL75XHdpuY6p0BgsfV0SIYwpVG5uw",
  authDomain: "macol-72da1.firebaseapp.com",
  projectId: "macol-72da1",
  storageBucket: "macol-72da1.firebasestorage.app",
  messagingSenderId: "114809930321",
  appId: "1:114809930321:web:f21cebfd5984956a4bee70",
  measurementId: "G-W2SB8BV8E0",
  vapidKey: "BMZf9Fq0B289OIfXKb6U7aeBNf-fnSI8RsgkcwMcDdzzl6VUMIZQQSnv2kZ850cQDSpzfamDRnU1xsIhNKr3Hq4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };