// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//we dont need anaylitcs unless we set them up for our firebase project
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJwi1Kh3DMlWIGX8F5_8fGLM58Zfr0k3c",
  authDomain: "fir-user-reg-auth-dc473.firebaseapp.com",
  projectId: "fir-user-reg-auth-dc473",
  storageBucket: "fir-user-reg-auth-dc473.appspot.com",
  messagingSenderId: "1069777380594",
  appId: "1:1069777380594:web:aaeb866eda761485e0dc6b",
  measurementId: "G-VN81VT9XJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
//const analytics = getAnalytics(app);
