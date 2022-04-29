//eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
//eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAHCOr6vEWAhqyq0TDK5FoVux8uVPwkUQ4",
  authDomain: "chat-app-dd996.firebaseapp.com",
  projectId: "chat-app-dd996",
  storageBucket: "chat-app-dd996.appspot.com",
  messagingSenderId: "880416816656",
  appId: "1:880416816656:web:199d5c7912749610471495",
  measurementId: "G-LZ86TB86LM",
};
//eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

//eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("mess", payload);
  const notificationTitle = payload.notification.title;
  const notificationOption = {
    body: payload.notification.body,
    icon: "",
  };
  //eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOption
  );
});
