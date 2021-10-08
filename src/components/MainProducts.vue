<template>
  <div>
    <div
      style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px;
    "
    >
      <ul>
        <li>Sjekk inventory når den er full, ikke mulig å legge til flere</li>
        <li>Lage ShowProduct.vue</li>
        <li>Lag CheckOut.vue</li>
      </ul>
    </div>
    <div class="container">
      <div class="mobilecontainer">
        <!-- <article class="mobile">
        <div>
          <img src="../assets/prodimg/sweater.jpg" class="mainimg" />
        </div>
        <div class="mobile-products-description">
          <h4>Nike Sweater Excellence</h4>
          <div class="stars">
            <img src="../assets/4-star.png" class="star" />
            <div class="starcount">8</div>
          </div>
          <div class="price">399,- <span class="instock">In stock</span></div>
          <div class="description">
            An Amazon Brand - This classic V-neck sweater features ribbing on
            the collar, hem, and cuffs to keep you warm
          </div>
        </div>
        </article>-->

        <article class="mobile" v-for="(product, index) in showProducts" :key="index">
          <div>
            <img :src="product.image" class="mainimg" />
          </div>
          <div class="mobile-products-description">
            <h4>{{ product.title }}</h4>
            <div class="stars">
              <img :src="checkStarCount(product.rating.rate)" class="star" />
              <div class="starcount">{{ product.rating.rate }}</div>
            </div>
            <div class="price">
              <small>$</small>
              {{ product.price.toFixed(2) }}
              <span
                class="instock"
              >In stock: {{ product.inventory }}</span>
            </div>
            <div class="description">{{ product.description }}</div>
            <div class="cart">
              <button :disabled="!product.inventory" @click="addProductToCart(product)">Add to cart</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import star1 from "../assets/1-star.png";
import star2 from "../assets/2-star.png";
import star3 from "../assets/3-star.png";
import star4 from "../assets/4-star.png";
import star5 from "../assets/5-star.png";
export default {
  data() {
    return {
      // products: [],
      star1: star1,
      star2: star2,
      star3: star3,
      star4: star4,
      star5: star5,
    };
  },
  methods: {
    getFakeApi() {
      // fetch("https://fakestoreapi.com/products/category/men's%20clothing")
      fetch("https://fakestoreapi.com/products/")
        .then((res) => res.json())
        .then((json) => (this.products = json));
    },
    checkStarCount(starcount) {
      if (starcount <= 1.5) {
        return this.star1;
      } else if (starcount <= 2.5) {
        return this.star2;
      } else if (starcount <= 3.5) {
        return this.star3;
      } else if (starcount <= 4.5) {
        return this.star4;
      } else {
        return this.star5;
      }
    },
    ...mapActions("cart", [
      "addProductToCart", // ->( this.addToBasket())
    ]),
  },
  watch: {
    cartTotalItems() {
      const model = this;
      if (this.cartTotalItems) {
        model.$toast.success('Item added. Go to cart.', {
          onClick: function () {
            model.$router.push('cart')
          },
          position: "bottom",
        })
      }
    }
  },
  computed: {
    ...mapGetters("products", [
      "showProducts", // -> this.showProducts
    ]),
    ...mapGetters("cart", [
      "cartTotalItems",
    ]),
  },
  created() {
    // this.getFakeApi();
    // this.$store.dispatch("getProducts");

    this.$store.dispatch("products/getAllProducts");
  },
};
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.instock {
  font-size: 10px;
  margin-left: 5px;
  color: grey;
}
/* .container { */
/* margin: 8px;  flytta til body*/

/* } */
.mobilecontainer {
  display: flex;
  flex-direction: column;
}
.mobile {
  border: 1px solid rgb(221, 221, 221);
  border-radius: 3px;
  margin-bottom: 15px;
  padding-right: 5px;
  display: flex;
  flex-direction: row;
}
.mobile .mainimg {
  max-width: 140px;
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
.mobile .description {
  font-size: 13px;
  color: rgb(70, 70, 70);

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.price {
  font-size: 1.4rem;
  font-weight: 300;
}
.stars {
  display: flex;
  align-items: center;
}

.starcount {
  margin-top: 2px;
  margin-left: 1px;
  font-size: 11px;
  color: rgb(180, 180, 180);
}

@media screen and (min-width: 700px) {
  .mobilecontainer {
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .mobile {
    margin: 10px;
    max-width: 300px;
    padding: 20px;
  }
}
</style>