import firebase from "firebase";


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAZJdyt7vrJBbwN_yY4W_nQJCYCTFhqZ4U",
    authDomain: "workout-app-ea497.firebaseapp.com",
    databaseURL: "https://workout-app-ea497.firebaseio.com",
    projectId: "workout-app-ea497",
    storageBucket: "workout-app-ea497.appspot.com",
    messagingSenderId: "887429273694"
  };
  firebase.initializeApp(config);




export default firebase;