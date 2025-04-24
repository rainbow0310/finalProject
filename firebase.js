// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWkPZ6x3hyMgNsSZYMZHjqElVmHVAVss4",
  authDomain: "feedme-ca610.firebaseapp.com",
  projectId: "feedme-ca610",
  storageBucket: "feedme-ca610.firebasestorage.app",
  messagingSenderId: "605778596093",
  appId: "1:605778596093:web:90cae4838ba1f94ac76e94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});