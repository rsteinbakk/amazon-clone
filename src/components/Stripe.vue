<template>
  <div>
    {{ testet }}
    <p>{{ test2 }}</p>
  </div>
</template>

<script>
import { collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";

import { addDoc } from "firebase/firestore";
export default {
  data() {
    return {
      testet: [],
      test2: "loading2...",
      test3: "",
    }
  },
  methods: {
    getRtdb() {
      const db = getFirestore();
      const q = query(collection(db, "invoices"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log(querySnapshot);
        // const cities = [];
        // querySnapshot.forEach((doc) => {
        //   cities.push(doc.data());
        // });
        // console.log("Current cities in CA: ", cities.join(", "));
      });
      this.test3 = unsubscribe;


      // const q = query(collection(db, "invoices")
      // , where("state", "==", "CA"));

      // (q, (querySnapshot) => {
      //   const invoices = [];
      //   querySnapshot.forEach((doc) => {
      //     invoices.push(doc.data());
      //   });
      //   console.log("Current invoices: ", invoices.join(", "));
      // });
    }
  },
  mounted() {
    // this.getRtdb();
  },
  async created() {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "invoices"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      this.testet.push(doc.data());
    })

    const docRef = await addDoc(collection(db, "invoices"), {
      email: "steinbakkpc@outlook.com",
      items: [{
        amount: 900,
        currency: "NOK",
        quantity: 5, // Optional, defaults to 1.
        description: "superduper"
      },
      {
        amount: 7999,
        currency: "NOK",
        description: "shipping cost"
      }]
    });
    console.log("Document written with ID: ", docRef.id);
  }

}
</script>

<style scoped>
</style>