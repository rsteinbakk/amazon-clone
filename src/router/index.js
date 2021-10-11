import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/MainProducts.vue'
import Cart from '../components/Cart.vue'
import Login from '../components/Login.vue'
import Checkout from '../components/Checkout.vue'
import Stripe from '../components/Stripe.vue'
import Success from "../components/Success.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stripe',
    name: 'Stripe',
    component: Stripe
  },
  {
    path: '/signin',
    name: 'Sign in',
    component: Login
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart




    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
