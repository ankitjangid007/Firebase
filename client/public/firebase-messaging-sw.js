importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA5nQ8K6g1jbEQJh7bc7AmakZ2zJUASL1M",
  authDomain: "fir-learning-5f5f2.firebaseapp.com",
  projectId: "fir-learning-5f5f2",
  storageBucket: "fir-learning-5f5f2.appspot.com",
  messagingSenderId: "238186255490",
  appId: "1:238186255490:web:56313479a7515c7b2d909b",
  measurementId: "G-V7787KGSH5",
});

const initMessaging = firebase.messaging();
