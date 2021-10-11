import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';

// Initialize Firebase
import firebaseConfig from "./firebase.init";
import { initializeApp } from "firebase/app";
initializeApp(firebaseConfig);

createApp(App)
  .use(store)
  .use(router)
  .use(VueToast)
  .mount("#app");

// import { collection, getDocs, getFirestore } from "firebase/firestore";

// const db = getFirestore();
// export async function getDb() {
//   const querySnapshot = await getDocs(collection(db, "invoices"));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     return doc.data();
//   });
// }
