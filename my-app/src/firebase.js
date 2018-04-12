import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBnoBRfwsBvfzn4GMiu6iWENcQ1VlTVRxw",
  authDomain: "librari-41dab.firebaseapp.com",
  databaseURL: "https://librari-41dab.firebaseio.com",
  projectId: "librari-41dab",
  storageBucket: "",
  messagingSenderId: "588602338676"
};
firebase.initializeApp(config);

export default firebase;