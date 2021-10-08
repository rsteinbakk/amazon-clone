import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from 'vue-toast-notification';
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCPqFN3slPKVO1RDbhwnr-yVYw2t0yByJI",
  authDomain: "ama-webstore.firebaseapp.com",
  databaseURL: "https://ama-webstore-default-rtdb.firebaseio.com",
  projectId: "ama-webstore",
  storageBucket: "ama-webstore.appspot.com",
  messagingSenderId: "517705603689",
  appId: "1:517705603689:web:76c4b533138861106220f8",
  measurementId: "G-V3WSM8XLVC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

createApp(App)
  .use(store)
  .use(router)
  .use(VueToast)
  .mount("#app");


