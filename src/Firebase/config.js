import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/analytics'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAHCOr6vEWAhqyq0TDK5FoVux8uVPwkUQ4",
  authDomain: "chat-app-dd996.firebaseapp.com",
  projectId: "chat-app-dd996",
  storageBucket: "chat-app-dd996.appspot.com",
  messagingSenderId: "880416816656",
  appId: "1:880416816656:web:199d5c7912749610471495",
  measurementId: "G-LZ86TB86LM"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()
export {auth, db}

export default firebase