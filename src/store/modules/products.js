import shop from "../api/shopApi.js";

// initial state
const state = () => ({
  all: [],
});

// getters
const getters = {
  showProducts(state) {
    return state.all;
  },
  inStock: (state) => (cartproductid) => {
    const productid = state.all.find((product) => product.id === cartproductid);
    return productid.inventory;
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find((product) => product.id === id);
    product.inventory--;
  },
  incrementProductInventory(state, { id }) {
    const product = state.all.find((product) => product.id === id);
    product.inventory++;
  },
};

// actions
const actions = {
  getAllProducts(context) {
    shop.getProducts((products) => {
      context.commit("setProducts", products);
    });
  },
  // inStock(context, cartproductid) {
  //   context.getters("inStock", cartproductid);
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
