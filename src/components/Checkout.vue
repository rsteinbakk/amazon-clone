<template>
    <div>
        <transition name="fade">
            <div class="popup" v-if="activateLogin" style="cursor:pointer;">
                <div class="popuplogin">
                    <LoginVue></LoginVue>
                </div>
            </div>
        </transition>
        <div class="outer-container">
            <div class="container">
                <h1 style="margin-bottom: 0">Amazon Checkout</h1>
                <button
                    style="transform: scale(0.8); background-color: rgb(243, 243, 243); width: 90px; padding: 5px 1px ; font-weight: normal; font-size: 0.9rem; "
                    @click="$router.push('/cart')"
                >Edit cart</button>
                <div class="checkoutitems" v-for="(item) in cartProducts" :key="item.id">
                    <div class="item">
                        <div
                            class="mainimg"
                            :style="{ 'background-image': 'url(' + item.image + ')' }"
                        ></div>
                        <div class="price">
                            <h4 style="margin: 0; padding: 0 0 10px 0;">{{ item.title }}</h4>
                            ${{ item.price.toFixed(2) }}
                            <br />
                            <small
                                style="margin-left: 0; padding-left: 0; color: grey"
                            >Quantity: {{ item.quantity }}</small>
                        </div>
                    </div>
                </div>

                <h3>
                    <span class="not-bold">Subtotal</span>
                    ${{ cartTotalPrice.toFixed(2) }}
                </h3>
            </div>
        </div>

        <div class="outer-container" v-if="!getUser && !guest">
            <div class="container">
                <button @click="activateLogin = true">Login and continue</button>
                <button @click="guest = true">Continue as guest</button>
            </div>
        </div>
        <div class="outer-container" v-else>
            <div class="container">
                <h3 class="process">1: Select shipping adress</h3>
                <input type="email" placeholder="E-mail" :value="getUser.email" v-if="getUser" />
                <input type="email" placeholder="E-mail" v-else />
                <input type="text" placeholder="Firstname and lastname" value="Firstname Lastname" />
                <input type="text" placeholder="Adress" value="Testadress 3" />
                <input type="text" placeholder="City" value="Oslo" />
                <input type="text" placeholder="Postal Code" value="3350" />
            </div>
        </div>

        <div class="outer-container" v-if="getUser || guest">
            <div class="container">
                <h3 class="process">2: Credit card information</h3>
                <button @click="redirect">Test stripe payment</button>
            </div>
        </div>
    </div>
</template>

<script>
import LoginVue from "./Login.vue";
import { mapGetters } from "vuex"
import { loadStripe } from '@stripe/stripe-js';
import { onMounted } from "@vue/runtime-core";
export default {
    setup() {
        let stripe = null;
        onMounted(async () => {
            stripe = await loadStripe(process.env.VUE_APP_STRIPE_KEY);
        })

        function redirect() {
            stripe.redirectToCheckout({
                successUrl: "http://localhost:8080/#/success",
                cancelUrl: "http://localhost:8080",
                lineItems: [
                    {
                        price: "price_1JjHWFFZx264vamsp57vUMkt",
                        quantity: 1
                    }
                ],
                mode: "payment"
            })
        }
        return { redirect }
    },
    components: {
        LoginVue,
    },
    data() {
        return {
            activateLogin: false,
            cartItems: false,
            newEmail: null,
            testAdress: "Gateveien 10",
            guest: false,
            isMock: false,
        }
    },
    methods: {
        checkCartItems() {
            this.cartItems = true;
            if (this.cartTotalItems > 0) {
                this.cartItems = true;
            } else {
                this.cartItems = false;
                this.$router.push('/')
            }
        },
    },
    computed: {
        ...mapGetters("auth", ['getUser', 'isUserAuth']),
        ...mapGetters("cart", {
            cartProducts: "cartProducts",
            cartTotalPrice: "cartTotalPrice",
            cartTotalItems: "cartTotalItems",
        }),
    },
    mounted() {
        this.checkCartItems();
    }, watch: {
        getUser() {
            if (this.getUser) {
                this.activateLogin = false;
            } else {
                this.$toast.info('Signed out.', {
                    position: "bottom",
                })
            }

        }
    },
}
</script>

<style scoped>
.process {
    background-color: rgb(243, 243, 243);
    border-radius: 3px;
    width: 100%;
    padding: 10px 15px;
    color: rgb(71, 71, 71);
    font-weight: normal;
    margin-bottom: 8px;
}
.process:first-child {
    margin-bottom: 28px;
}
.mainimg {
    min-width: 30px;
    max-width: 30px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    margin: 7px;
}
.checkoutitems {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 300px;
}
.checkoutitems .item {
    display: flex;
    align-items: top;
    margin: 5px;
    border-bottom: 1px solid rgb(223, 223, 223);
    width: 300px;
}
.checkoutitems .item * {
    padding: 10px;
}
.popup {
    position: absolute;
    overflow-y: scroll;
    min-height: 100vh;
    width: 100vw;
    min-height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.719);
}
.popuplogin {
    z-index: 100;
    min-height: 100vh;
}
.outer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 310px;
}
h2 {
    margin-bottom: 4px;
}
button {
    width: 180px;
    text-align: center;
    padding: 7px;
    background-color: rgb(255, 201, 51);
    margin: 10px 0;
}
button.testdelivery {
    margin-bottom: 10px;
    transform: scale(0.7);
    text-align: center;
    padding: 10px 15px;
    font-size: 1rem;
    margin-top: 0;
    color: rgb(255, 255, 255);
    background-color: rgb(53, 159, 185);
    box-shadow: 0 0 3px rgb(148, 148, 148);
}
input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    /* flex: 1; */
    line-height: 15px;
    margin: 0 0 15px 0;
    padding: 0;
    border: 1px solid rgb(180, 180, 180);
    height: 38px;
    border-radius: 5px;
    font-family: inherit;
    font-size: 15px;
    border-radius: 3px;
    text-indent: 8px;
    direction: ltr;
}
/* transition */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>