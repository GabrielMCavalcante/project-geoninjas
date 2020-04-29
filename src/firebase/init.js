import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAKWQPMgXcd7n_Z_AMwtxVRYMzD0aINXvY",
    authDomain: "vuejs-project-geo-ninjas.firebaseapp.com",
    databaseURL: "https://vuejs-project-geo-ninjas.firebaseio.com",
    projectId: "vuejs-project-geo-ninjas",
    storageBucket: "vuejs-project-geo-ninjas.appspot.com",
    messagingSenderId: "173564586313",
    appId: "1:173564586313:web:d2a5c644f2b204ac741298"
  };
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();