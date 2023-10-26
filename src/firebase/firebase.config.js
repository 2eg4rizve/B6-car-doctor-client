// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;











// apiKey: "AIzaSyDCV30RNXdkBKctOJj8fY7In6XU8nXrh4k",
//   authDomain: "cars-doctor-c61e1.firebaseapp.com",
//   projectId: "cars-doctor-c61e1",
//   storageBucket: "cars-doctor-c61e1.appspot.com",
//   messagingSenderId: "19446660259",
//   appId: "1:19446660259:web:0f618267ff199e8586d316"