//Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrEY_GTQ73aXLESiXZXBgAmUWBOg1J5Zg',
  authDomain: 'project-6f813.firebaseapp.com',
  projectId: 'project-6f813',
  storageBucket: 'project-6f813.appspot.com',
  messagingSenderId: '722510145937',
  appId: '1:722510145937:web:6e84b65c8cf7b8f08c9230',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = getAuth(app);
const storage = getStorage(app);
export default storage;
