// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOnzWxLvPcPJ2ifdIsXmJvpwtDTDzm2vc",
  authDomain: "alif-c7c63.firebaseapp.com",
  projectId: "alif-c7c63",
  storageBucket: "alif-c7c63.appspot.com",
  messagingSenderId: "911237273803",
  appId: "1:911237273803:web:4efaeb0466a86c8950234e",
  measurementId: "G-MKQ4B3JQPS"
};

// Firebase'ni boshlatish
const app = initializeApp(firebaseConfig);

// Analytics'ni boshlatish
export const analytics = getAnalytics(app);

// Eventlarni log qilish funksiyasi
export const logAnalyticsEvent = (eventName, eventParams) => {
  logEvent(analytics, eventName, eventParams);
};
