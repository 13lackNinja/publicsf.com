import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyBCiJulpMi4n3m3kNulL1h5tvvOjib2gNM",
    authDomain: "publicsf-eab96.firebaseapp.com",
    databaseURL: "https://publicsf-eab96.firebaseio.com",
    projectId: "publicsf-eab96",
    storageBucket: "publicsf-eab96.appspot.com",
    messagingSenderId: "359880787134"
  };

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();

export default firebase;
