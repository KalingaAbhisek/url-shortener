import app from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
  apiKey: "AIzaSyCzoLKTKwt5_FZokCn9rBfQXCpSLsRCvjk",
  authDomain: "url-shortener-14581.firebaseapp.com",
  projectId: "url-shortener-14581",
  storageBucket: "url-shortener-14581.appspot.com",
  messagingSenderId: "524156760537",
  appId: "1:524156760537:web:d7cec0b8d7bcf8b0aee9c8",
  measurementId: "G-ND8N3NKYHP"
};

// Initialize Firebase
  const firebase = app.initializeApp(firebaseConfig);
  const firestore=firebase.firestore();
  const auth=firebase.auth();

  if(process.env.NODE_ENV==='development'){
    firestore.useEmulator('localhost',8080);
    auth.useEmulator('http://127.0.0.1:9099')
  }

  export {firebase, firestore, auth, app}