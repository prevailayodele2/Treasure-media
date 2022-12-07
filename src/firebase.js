// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ZCKQaCHeKxNfrI2R9AtLk-4wMFIKxSQ",
  authDomain: "treasure-media-41d22.firebaseapp.com",
  projectId: "treasure-media-41d22",
  storageBucket: "treasure-media-41d22.appspot.com",
  messagingSenderId: "922889090442",
  appId: "1:922889090442:web:5c22793b53803beb454473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app