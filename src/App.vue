<template>
  <Header></Header>
  <div class="ch"><button @click="checkout = !checkout">CHECKOUT</button></div>
  <main>
    <MainProducts v-if="!checkout"></MainProducts>
    <Basket v-else></Basket>
  </main>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->

  <!-- https://www.youtube.com/watch?v=RDV3Z1KCBvo 41 min -->
</template>
<script>
import Header from "./components/Header.vue";
import MainProducts from "./components/MainProducts.vue";
import Basket from "./components/Basket.vue";
export default {
  components: {
    Header,
    MainProducts,
    Basket,
  },
  data() {
    return {
      checkout: false,
    };
  },
};
</script>

<style>
@import url(//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember);
@font-face {
  font-family: "Amazon Ember";
  src: url("//db.onlinewebfonts.com/t/157c6cc36dd65b1b2adc9e7f3329c761.eot");
  src: url("//db.onlinewebfonts.com/t/157c6cc36dd65b1b2adc9e7f3329c761.eot?#iefix")
      format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/157c6cc36dd65b1b2adc9e7f3329c761.woff2")
      format("woff2"),
    url("//db.onlinewebfonts.com/t/157c6cc36dd65b1b2adc9e7f3329c761.woff")
      format("woff"),
    url("//db.onlinewebfonts.com/t/157c6cc36dd65b1b2adc9e7f3329c761.ttf")
      format("truetype"),
    url("//db.onlinewebfonts.com/t/157c6cc36dd65b1b2adc9e7f3329c761.svg#Amazon Ember")
      format("svg");
}

body {
  font-family: "Amazon Ember", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

.ch {
  display: flex;
  justify-content: flex-end;
  margin-bottom: -19px;
}
main {
  padding: 2px 13px;
}
button {
  all: unset;
  padding: 5px 15px;
  margin: 4px 7px 4px 4px;
  border-radius: 5px;
  cursor: pointer;
}
.cartbtn {
  background-color: rgb(223, 157, 35);
}
.checkout {
  background-color: rgb(245, 224, 40);
}
/* 
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
