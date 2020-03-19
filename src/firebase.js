// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAfs0xM7Gb-ceu_B4E2GPkcWET-m5s17V0",
  authDomain: "crud-task-8ebfa.firebaseapp.com",
  databaseURL: "https://crud-task-8ebfa.firebaseio.com",
  projectId: "crud-task-8ebfa",
  storageBucket: "crud-task-8ebfa.appspot.com",
  messagingSenderId: "1098389120188",
  appId: "1:1098389120188:web:49373271ed46ba2def1cb9"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
