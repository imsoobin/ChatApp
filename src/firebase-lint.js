import firebase from "firebase/compat/app";

import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAHCOr6vEWAhqyq0TDK5FoVux8uVPwkUQ4",
  authDomain: "chat-app-dd996.firebaseapp.com",
  //   databaseURL: "https://chat-app-dd996-default-rtdb.firebaseio.com",
  projectId: "chat-app-dd996",
  storageBucket: "chat-app-dd996.appspot.com",
  messagingSenderId: "880416816656",
  appId: "1:880416816656:web:199d5c7912749610471495",
  measurementId: "G-LZ86TB86LM",
};
//eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/** Xu ly phan hien thong bao tin nhan ra man hinh */
//eslint-disable-next-line no-undef
const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      // console.log(currentToken);
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (err) {
    console.log("error token", err);
  }

  return currentToken;
};

export const onMessageList = () =>
  new Promise((resovle) => {
    messaging.onMessage((payload) => {
      resovle(payload);
    });
  });
