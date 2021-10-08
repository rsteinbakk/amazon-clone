<template>
  <div :class="{ grey: signInTrue }">
    <div id="nav"></div>
    <Header></Header>
    <!-- https://github.com/ankurk91/vue-toast-notification -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- <Login v-if="login"></Login>
      <MainProducts v-if="!checkout && !login"></MainProducts>
      <Cart v-if="checkout && !login"></Cart>-->
    </main>

    <!-- https://www.youtube.com/watch?v=RDV3Z1KCBvo 41 min -->
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import { mapActions } from "vuex";
// import MainProducts from "./components/MainProducts.vue";
// import Cart from "./components/Cart.vue";
// import Login from "./components/Login.vue";
export default {
  components: {
    Header
    // MainProducts,
    // Cart, Login
  },
  data() {
    return {
      checkout: false,
      login: false,
    };
  }, methods: {

    ...mapActions("auth", ["authAction"])

  }, computed: {
    signInTrue() {
      if (this.$route.name === "Sign in") {
        document.body.style.backgroundColor = "#EFEFEF";
        return true;
      } else {
        document.body.style.backgroundColor = "#FFF";
        return false;
      }
    }
  }, mounted() {
    this.authAction();
  }
};
</script>

<style>
@import url(//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember);
@font-face {
  font-family: "Amazon Ember";
  src: url("./fonts/AmazonEmberDisplay_Rg.ttf") format("truetype");
}
body {
  font-family: "Amazon Ember", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  /* background-color: rgb(206, 206, 206); */
}
main {
  padding: 10px 13px;
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

/* transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
