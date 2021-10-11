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
        <li>Todo:</li>
        <!-- <li>Lage ShowProduct.vue</li> -->
        <!-- <li>Sjekke om besøkende kommer for første gang, i så fall informere om at dette er en test-side</li> -->
        <li>Stripe funker nå med enkelt produkt som er registrert i Stripe, få stripe til å samkjøre med produktene i nettbutikken </li>
        <li>Lagre informasjon slik at data ikke blir borte om bruker refresher sida. </li>
        <li>Lagre ordre på bruker </li>
  
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
        <section v-for="(product, index) in showProducts" :key="index" class="mobile-border">
          <article class="mobile">
            <div class="mainimg" :style="{ 'background-image': 'url(' + product.image + ')' }">

              <!-- <img :src="product.image" class="mainimg" /> -->
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
            </div>
          </article>
          <div class="cart">
            <button :disabled="!product.inventory" @click="addProductToCart(product)">Add to cart</button>
          </div>
        </section>
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
        model.$toast.success('Added. Go to cart.', {
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
.mobile-border {
  display: flex;
  flex-direction: column;
  /* border: 1px solid rgb(221, 221, 221); */
  border-radius: 3px;
  margin-bottom: 15px;
}
.mobile {
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  height: 180px;
  max-width: 300px;
}
.mobile .mainimg {
  min-width: 130px;
  max-width: 130px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  margin: 7px;
}

.cart {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
}
button {
  background-color: rgb(255, 187, 0);
  margin: 7px 40px 20px 15px;

}
.mobile-products-description {
  margin: 2px 0 0 5px;
}
.mobile-products-description > div {
  margin: 5px 0;
}
.mobile h4 {
  font-weight: 200;
  font-size: 0.8rem;
  margin: 5px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* max-width: 150px; */
}
.mobile .description {
  font-size: 13px;
  color: rgb(70, 70, 70);
  min-width: 130px;
  max-width: 160px;
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
    margin: 5px;
    max-width: 300px;
    padding: 15px 15px 0 15px;
  }
  .cart button {
    margin-top: 0;
    margin-right: 50px;
  }
}
</style>