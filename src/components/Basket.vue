<template>
  <small>{{ basket }}</small>
  <div class="checkout-container">
    <h3>
      <span class="not-bold">Subtotal</span> <span class="super">$</span>33<span
        class="super"
        >59</span
      >
    </h3>
    <button class="checkout">Proceed to checkout (2 items)</button>
  </div>

  <div class="mobilecontainer" v-for="(item, index) in products" :key="index">
    <article class="mobile">
      <div>
        <img :src="item.image" class="mainimg" />
      </div>
      <div class="mobile-products-description">
        <h4>Nike Sweater Excellence</h4>
        <div class="price"><small>$</small>{{ item.price }}</div>
        <div class="instock">In stock</div>
      </div>
    </article>

    <div class="cartnumber">
      <button>-</button>
      <input type="number" max="10" :value="item.itemCount" />
      <button>+</button>
    </div>
    <button class="whitebutton" @click="deleteBasketItem(index)">Delete</button>
  </div>
  <div class="checkout-container">
    <button class="checkout" style="margin-top: 30px">Continue shopping</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  methods: {
    deleteBasketItem(index) {
      // console.log(index);
      this.$store.dispatch("deleteBasketItem", { index: index });
    },
    checkout(products) {
      this.$store.dispatch("cart/checkout", products);
    },
  },
  computed: {
    // basket() {
    //   return this.$store.getters.showBasket;
    // },
    ...mapState({
      checkoutStatus: (state) => state.cart.checkoutStatus,
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice",
    }),
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
.mobilecontainer {
  border-bottom: 1px solid rgb(221, 221, 221);
}
.mobile {
  border-top: 1px solid rgb(221, 221, 221);
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-top: 10px;
  padding-right: 5px;
  display: flex;
  flex-direction: row;
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
</style>