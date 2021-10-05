import cart from "./modules/cart.js";
import products from "./modules/products.js"
// import createLogger from "./pluginutils/logger.js";
import { createStore } from "vuex";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    cart,
    products,
  },
  strict: debug,
//   plugins: debug ? [createLogger()] : [],
});
