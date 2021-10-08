<template>
  <!-- <small>{{ products }}</small> -->
  <div>
    <div class="checkout-container" v-if="cartTotalItems > 0">
      <div class="loggedin" v-if="getUser">
        <p>
          Nice to see you,
          <b>{{ getUser.displayName }}</b>.
        </p>
      </div>
      <h3>
        <span class="not-bold">Subtotal</span>
        ${{ cartTotalPrice.toFixed(2) }}
      </h3>
      <button class="checkout">Proceed to checkout ({{ this.cartTotalItems }} items)</button>
    </div>
    <div class="checkout-container" v-else>
      <p></p>The shopping cart is empty.
    </div>
    <transition-group name="slide-fade">
      <div class="mobilecontainer" v-for="(item) in cartProducts" :key="item.id">
        <div v-if="item > 1">{{ cartProducts[0] }}</div>
        <article class="mobile">
          <div>
            <img :src="item.image" class="mainimg" />
          </div>
          <div class="mobile-products-description">
            <h4>{{ item.title }}</h4>
            <div class="price">
              <small>$</small>
              {{ item.price.toFixed(2) }}
            </div>
            <div class="instock">In Stock</div>
            <!-- <div class="instock" v-if="inStock(item.id) !== 0">In stock ({{ inStock(item.id) }})</div>
            <div class="instock" style="color:red;" v-else>Out of stock</div>-->
          </div>
        </article>

        <div class="cartnumber">
          <button @click="decrementCartItem(item)">-</button>
          <input type="number" :value="item.quantity" />
          <button :disabled="inStock(item.id) == 0" @click="addProductToCart(item)">+</button>
        </div>
        <button class="whitebutton" @click="removeProductFromCart(item)">Delete</button>
      </div>
    </transition-group>
    <div class="checkout-container">
      <div
        style="width: 300px; 
  border-top: 1px solid rgb(221, 221, 221); height: 32px; margin-top: 20px"
        v-if="cartTotalItems.length"
      >&nbsp;</div>

      <h3 v-if="cartTotalItems > 1">
        <span class="not-bold">Subtotal</span>
        ${{ cartTotalPrice.toFixed(2) }}
      </h3>
      <button
        class="checkout"
        v-if="cartTotalItems > 1"
      >Proceed to checkout ({{ this.cartTotalItems }} items)</button>
      <router-link to="/" style="all:unset">
        <button class="checkout" style="margin-top: 30px; ">Continue shopping</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
    }
  },
  methods: {
    // inStock(id) {
    //   this.$store.dispatch("products/inStock", { id: id });
    // },
    // deleteBasketItem(index) {
    //   // console.log(index);
    //   this.$store.dispatch("deleteBasketItem", { index: index });
    // },
    checkout(products) {
      this.$store.dispatch("cart/checkout", products);
    },
    decrementCartItem(item) {
      this.$store.dispatch("cart/removeItemFromCart", item);
    },
    removeProductFromCart(item) {
      this.$store.dispatch("cart/removeProductFromCart", item);
    },
    ...mapActions("cart", [
      "addProductToCart", // ->( this.addToBasket())
    ]),
  },
  computed: {
    // basket() {
    //   return this.$store.getters.showBasket;
    // },
    // cartTotalItems() {
    //   let totalQuantity = 0;
    //   for (let i = 0; this.cartProducts.length > i; i++) {
    //     totalQuantity = totalQuantity + this.cartProducts[i].quantity;
    //   }
    //   return totalQuantity;
    // },
    ...mapState({
      checkoutStatus: (state) => state.cart.checkoutStatus,
    }),
    ...mapGetters("cart", {
      cartProducts: "cartProducts",
      cartTotalPrice: "cartTotalPrice",
      cartTotalItems: "cartTotalItems",
    }),
    ...mapGetters("products", {
      inStock: "inStock",
    }),
    ...mapGetters("auth", ['getUser', 'isUserAuth'])

  },
};
</script>

<style scoped>
.whitebutton {
  border: 1px solid rgba(180, 180, 180, 0.637);
  margin: 15px 5px;
  font-size: 0.7rem;
  color: rgb(109, 109, 109);
  box-shadow: 0 0 4px rgb(197, 197, 197);
  padding: 7px 13px;
}
.cartnumber input {
  all: unset;
  text-align: center;

  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
  padding: 5px;
  border: 1px solid rgba(180, 180, 180, 0.637);
  border-right: none;
  border-left: none;
  height: 22px;
  width: 50px;
}
.cartnumber button {
  background-image: linear-gradient(to top, #d8d9da 0%, #f1f1f1 100%);
  margin: 0;
  height: 22px;
  width: 10px;
  text-align: center;
}
.cartnumber button:first-of-type {
  border-radius: 5px 0 0 5px;
  border: 1px solid rgba(180, 180, 180, 0.637);
}
.cartnumber button:last-of-type {
  border-radius: 0 5px 5px 0;
  border: 1px solid rgba(180, 180, 180, 0.637);
}
h3 {
  margin-bottom: 10px;
}
.checkout-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.not-bold {
  font-weight: 100;
}
.checkout {
  padding: 9px 30px;
  min-width: 220px;
  text-align: center;
}
.super {
  font-size: 0.63em;
  line-height: 0.5em;
  vertical-align: baseline;
  position: relative;
  top: -0.4em;
}

/* SAMME SOM MainProducts view omtrent: */
.cart {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.instock {
  font-size: 12px;
  margin-left: 5px;
  color: rgb(116, 165, 120);
}
/* .container { */
/* margin: 8px;  flytta til body*/

/* } */
.mobilecontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mobile {
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-top: 10px;
  padding-right: 5px;
  display: flex;
  flex-direction: row;
}
:not(.mobile:first-child) > .mobile {
  border-top: 1px solid rgb(221, 221, 221);
}
.mobile .mainimg {
  max-width: 100px;
  margin: 7px;
}

.mobile-products-description {
  margin: 2px 0 0 5px;
}
.mobile-products-description > div {
  margin: 5px 0;
}
.mobile h4 {
  font-weight: 200;
  margin: 5px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price {
  font-size: 1.4rem;
  font-weight: 300;
}

@media screen and (min-width: 700px) {
  /* .mobilecontainer { */
  /* flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap; */
  /* } */
  .mobile {
    margin: 20px;
    max-width: 300px;
  }
}

/* transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  /* transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.8s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-250px);
  opacity: 0;
}
</style>