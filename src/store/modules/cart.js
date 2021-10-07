import shop from "../api/shopApi.js";

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  items: [],
  checkoutStatus: null,
});

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(
        (product) => product.id === id
      );
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      };
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
  cartTotalItems: (state) => {
    let totalQuantity = 0;
    for (let i = 0; state.items.length > i; i++) {
      totalQuantity = totalQuantity + state.items[i].quantity;
    }
    return totalQuantity;
  }
};

// mutations
const mutations = {
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1,
    });
  },

  removeProductFromCart(state, { id }) {
    state.items.indexOf(id);
    for (let i = 0; state.items.length > i; i++) {
      if (state.items[i].id === id) {
        state.items.splice(i, 1);
      }
    }
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.quantity++;
  },

  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.quantity--;
  },

  setCartItems(state, { items }) {
    state.items = items;
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
};

// actions
const actions = {
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items];
    commit("setCheckoutStatus", null);
    // empty cart
    commit("setCartItems", { items: [] });
    shop.buyProducts(
      products,
      () => commit("setCheckoutStatus", "successful"),
      () => {
        commit("setCheckoutStatus", "failed");
        // rollback to the cart saved before sending the request
        commit("setCartItems", { items: savedCartItems });
      }
    );
  },
  // REMOVES ONLY ONE ITEM AT THE TIME | IF 1 ITEM, THE PRODUCT IS REMOVED FROM CART
  removeItemFromCart({ state, commit }, product) {
    const cartItem = state.items.find((item) => item.id === product.id);
    if (product.quantity === 1) {
      commit(
        "products/incrementProductInventory",
        { id: product.id },
        { root: true }
      );
      commit("removeProductFromCart", cartItem);
    } else if (product.quantity >= 2) {
      commit("decrementItemQuantity", cartItem);
      // add 1 item back in stock
      commit(
        "products/incrementProductInventory",
        { id: product.id },
        { root: true }
      );
    }
  },
  removeProductFromCart(context, product) {
    for (let i = 1; product.quantity > i; i++) {
      context.dispatch("removeItemFromCart", product);
    }
    product.quantity = 1;
    context.dispatch("removeItemFromCart", product);
  },
  addProductToCart({ state, commit }, product) {
    
    // Kode som kjøres fra Cart.vue - legg antall på eksisterende vare.
    if (product.quantity) {
      const cartItem = state.items.find((item) => item.id === product.id);
      commit("incrementItemQuantity", cartItem);
      // remove 1 item from stock
      commit(
        "products/decrementProductInventory",
        { id: product.id },
        { root: true }
      );
      return;
    }
    //  Kode som kjøres fra MainProducts.vue - hvis produktet ikke eksisterer legg til ny, ellers øk quantity på eksisterende vare
    commit("setCheckoutStatus", null);
    if (product.inventory > 0) {
      const cartItem = state.items.find((item) => item.id === product.id);
      if (!cartItem) {
        commit("pushProductToCart", { id: product.id });
      } else {
        commit("incrementItemQuantity", cartItem);
      }
      // remove 1 item from stock
      commit(
        "products/decrementProductInventory",
        { id: product.id },
        { root: true }
      );
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
