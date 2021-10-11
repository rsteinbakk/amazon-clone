<template>
  <header class="desktop">
    <router-link to="/">
      <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG25.png" class="logo" />
    </router-link>
    <div class="search">
      <input type="text" class="searchinput" placeholder="Search Amazon" />
      <div class="searchicon">&nbsp;</div>
    </div>
    <nav>
      <router-link to="/signin" class="signitin">
        <span v-if="!getUser">Hello guest</span>
        <span v-if="getUser">Hello {{ getUser.displayName }}</span>
        <span v-if="!getUser">Sign in</span>
        <span v-if="getUser">Go to account</span>
      </router-link>
      <div>
        <span>Returns</span>
        <span>and Orders</span>
      </div>
    </nav>
    <router-link to="/cart" class="cart" style="text-decoration: none">
      <div>{{ cartTotalItems }}</div>
    </router-link>
  </header>
  <!-- MOBIL: -->
  <header class="mobile">
    <div class="mobile-nav-and-logo">
      <router-link to="/" style="padding-top: 5px">
        <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG25.png" class="logo" />
      </router-link>
      <div class="sign-in-cart">
        <router-link
          to="/signin"
          class="signin-text"
          v-if="getUser"
        >Hello, {{ getUser.displayName }} ></router-link>
        <router-link to="/signin" class="signin-text" v-else>Sign in ></router-link>
        <router-link to="/signin" class="signin-icon">
          <img src="../assets/signin.png" />
        </router-link>
        <router-link to="/cart" class="mobile-cart" style="text-decoration: none;">
          <div>{{ cartTotalItems }}</div>
        </router-link>
      </div>
    </div>
    <div class="search-mobile">
      <input type="text" class="searchinput-mobile" placeholder="Search Amazon" />
      <div class="searchicon">&nbsp;</div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  watch: {
    getUser() {
      if (this.getUser) {
        this.$toast.info('Signed in.', {
          position: "bottom",
        })
      } else {
        this.$toast.info('Signed out.', {
          position: "bottom",
        })
      }
    }
  },
  computed: {

    ...mapGetters("cart", {
      cartTotalItems: "cartTotalItems",
    }),
    ...mapGetters("auth", ['getUser', 'isUserAuth'])
  },
};
</script>

<style scoped>
.logo {
  cursor: pointer;
}
.mobile-nav-and-logo {
  z-index: 10;
  display: flex;
  justify-content: space-between;
  width: 100vw;
}
.mobile {
  display: none;
}
.inputmobile {
  margin: 10px 0;
}
.signin-text {
  display: flex;
  align-items: center;
  color: white;
  font-size: 12px;
  letter-spacing: 0.03rem;
  font-weight: 100;
  text-decoration: none;
}
.signin-icon img {
  width: 30px;
  margin-left: 3px;
  margin-top: 16px;
  margin-right: 10px;
}
.sign-in-cart {
  display: flex;
}
.search-mobile {
  display: flex;
  margin: 10px 10px 5px 10px;
  width: 94vw;
}
.searchinput-mobile {
  width: 100%;
  /* flex: 1; */
  line-height: 15px;
  margin: 0;
  padding: 0;
  border: 0;
  height: 38px;
  font-family: inherit;
  font-size: 15px;
  border-radius: 3px 0 0 3px;
  outline: 0;
  -webkit-appearance: none;
  box-shadow: none;
  text-indent: 8px;
  direction: ltr;
}
.mobile-cart {
  color: #f08804;
  width: 41px;
  height: 38px;
  /* border: 1px solid white; */
  display: flex;
  justify-content: center;
  background-image: url("../assets/handlekurv.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 12px 10px 10px 0;
}
.cart {
  color: #f08804;
  width: 41px;
  height: 38px;
  /* border: 1px solid white; */
  display: flex;
  justify-content: center;
  background-image: url("../assets/handlekurv.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 10px;
}
.cart div,
.mobile-cart div {
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  font-weight: 600;
  margin-left: 4px;
  margin-top: 1px;
}
header {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: rgb(6, 25, 39);
  /* position: sticky;
  top: 0; */
  z-index: 95;
}
.search {
  display: flex;
  margin: 0 10px 0 0;

  flex: 1;
}
.searchicon {
  height: 38px;
  width: 45px;
  height: 38px;
  background-color: hsl(35, 98%, 70%);
  border-radius: 0 3px 3px 0;

  background-image: url("../assets/searchglass.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.searchinput {
  width: 100%;
  /* flex: 1; */
  line-height: 15px;
  margin: 0;
  padding: 0;
  border: 0;
  height: 38px;
  font-family: inherit;
  font-size: 15px;
  border-radius: 3px 0 0 3px;
  outline: 0;
  -webkit-appearance: none;
  box-shadow: none;
  text-indent: 8px;
  direction: ltr;
}
header img {
  width: 100px;
  margin: 0 20px;
  object-fit: contain;
  margin: 0 20px;
  margin-top: 11px;
}
nav {
  color: #fff;
  display: flex;
  justify-content: space-evenly;
}
nav div {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  font-size: 14px;
  line-height: 15px;
  font-weight: 700;
}
nav div span:first-child {
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  font-weight: 400;
}
nav .signitin {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  font-size: 14px;
  line-height: 15px;
  font-weight: 700;
  color: white;
  text-decoration: none;
}
nav .signitin span:first-child {
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  font-weight: 400;
}
.desktop {
  position: sticky;
  top: 0;
}
@media screen and (max-width: 600px) {
  .mobile {
    display: flex;
  }
  .desktop {
    display: none;
  }
  header {
    height: fit-content;
    padding-bottom: 15px;
    flex-direction: column;
  }
  nav {
    display: none;
  }
}
</style>