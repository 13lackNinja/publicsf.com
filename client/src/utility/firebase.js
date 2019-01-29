// Imports, configures, and initializes Firebase Authorization, Storage, and
// Realtime Database services.

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyA9PA22LxDswjyMH03f9f4GiozZ_4JwMMA",
    authDomain: "publicsf-ef5ca.firebaseapp.com",
    databaseURL: "https://publicsf-ef5ca.firebaseio.com",
    projectId: "publicsf-ef5ca",
    storageBucket: "publicsf-ef5ca.appspot.com",
    messagingSenderId: "272217516075"
  };

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();

export default firebase;
