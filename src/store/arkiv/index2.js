import { createStore } from "vuex";
// import { productsApi } from "./api.js";

export default createStore({
  state: {
    products: [],
    basket: [],
    checkoutStatus: null
  },
  getters: {
    showProducts(state) {
      return state.products;
    },
    showBasket(state) {
      return state.basket;
    },
    showBasketLength(state) {
      return state.basket.length;
    },
  },
  mutations: {
    getProducts(state, products) {
      state.products = products;
    },
    checkExisting(state, payload) {
      if (state.basket.length !== 0) {
        state.basket.findIndex((basketitem, index) => {
          if (basketitem.id === payload.productobject.id) {
            console.log(basketitem.title + " " + index);
            console.log("isexisting: true");
            return true;
          } else {
            console.log("isexisting: false");
            return false;
          }
        });
      } else {
        console.log("isexisting: false");
        return false;
      }
    },
    addToBasket(state, payload) {
      state.basket.push(payload.productobject);
      // console.log(state);

      // if (state.basket.length == 0) {
      //   payload.productobject.itemCount = 1;
      //   state.basket.push(payload.productobject);
      // } else {
      //   state.basket.findIndex((basketitem, index) => {
      //     if (basketitem.id === payload.productobject.id) {
      //       console.log("index exists:" + basketitem.id + "index: " + index);
      //       state.basket[index].itemCount ++;
      //     } else {
      //       payload.productobject.itemCount = 1;
      //       state.basket.push(payload.productobject);
      //     }
      //   });
      // }
    },
    deleteBasketItem(state, payload) {
      state.basket.splice(payload.index, 1);
    },
// NYE FRA HER
    pushProductToCart (state, { id }) {
      state.basket.push({
        id,
        quantity: 1
      })
    },
  
    incrementItemQuantity (state, { id }) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity++
    },
  
    setCartItems (state, { items }) {
      state.basket = items
    },
  
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
  
  },
  actions: {
    getProducts(context) {
      fetch("https://fakestoreapi.com/products/")
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .then((data) => context.commit("getProducts", data))
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // addToBasket(context, basketproduct) {
    //   // console.log(basketproduct.productobject.id);
    //   // context.commit('setCheckoutStatus', null)
    //   if (product.inventory > 0) {
    //     const cartItem = context.state.items.find(item => item.id === product.id)
    //     if (!cartItem) {
    //       context.commit('pushProductToCart', { id: product.id })
    //     } else {
    //       context.commit('incrementItemQuantity', cartItem)
    //     }
    //     // remove 1 item from stock
    //     context.commit('products/decrementProductInventory', { id: product.id }, { root: true })
    //   }
    // },
    deleteBasketItem(context, basketitem) {
      context.commit("deleteBasketItem", basketitem);
    },
    
  },
  modules: {},
});
