// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "**********************",
  authDomain: "crud-task-8ebfa.firebaseapp.com",
  databaseURL: "https://crud-task-8ebfa.firebaseio.com",
  projectId: "crud-task-8ebfa",
  storageBucket: "crud-task-8ebfa.appspot.com",
  messagingSenderId: "***************",
  appId: "******************"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
