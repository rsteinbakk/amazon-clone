import shop from "../api/shopApi.js";

// initial state
const state = () => ({
  all: [],
});

// getters
const getters = {
    showProducts(state) {
        return state.all;
    }
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
};

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts((products) => {
      commit("setProducts", products);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
