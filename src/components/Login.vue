<template>
    {{ getUser }}
    {{ isUserAuth }}
    <div class="outer-" v-if="isUserAuth">
        <div>
            <h2>Welcome</h2>
            <div class="container" style="padding: 15px">
                <div class="signed-in" style="display: flex; flex-direction: column">
                    Hello UserName,
                    <p>You are signed in.</p>
                    <button style="margin: 15px 0">Continue shopping</button>
                    <button style="margin: 5px 0 20px 0">Sign out</button>
                </div>
            </div>
            <br />
        </div>
    </div>
    <div class="outer-container" v-else>
        <div class="container">
            <div
                :class="{ signintab: !createUser }"
                style="padding: 0 15px; border-radius: 5px 5px 0 0"
            >
                <label class="showpassword" style="margin-bottom: 0;">
                    <h4 style="margin-left: -5px">
                        Create account.
                        <small>New to Amazon?</small>
                    </h4>
                    <input type="checkbox" :checked="createUser" @click="changeLoginType" />
                    <span
                        class="checkmark"
                        style="
    border-radius: 50%; margin-top: 20px;; transform: scale(0.8)"
                    ></span>
                </label>
            </div>
            <section v-if="createUser">
                <!-- <input type="text" placeholder="Name" v-model="newUser.fullName" /> -->
                <!-- <input type="email" placeholder="Mobile number or email" v-model="newUser.email" /> -->
                <input type="email" placeholder="E-mail" v-model="newUser.email" />
                <input :type="type" placeholder="Create a password" v-model="newUser.password" />

                <label class="showpassword">
                    {{ btnText }}
                    <input type="checkbox" @click="showPassword" />
                    <span class="checkmark"></span>
                </label>
                <div v-for="error in validationErrors" :key="error">
                    <span v-html="error"></span>
                </div>
                <button @click="registerNewUser">Continue</button>
                <div
                    class="policy"
                >By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</div>
                <label class="showpassword" style="margin-bottom: 0;">
                    <h4 style="margin-left: -5px">
                        Sign-In.
                        <small>Allready a customer?</small>
                    </h4>
                    <input type="checkbox" :checked="!createUser" @click="changeLoginType" />
                    <span
                        class="checkmark"
                        style="
    border-radius: 50%; margin-top: 20px;; transform: scale(0.8)"
                    ></span>
                </label>
            </section>
            <section v-else>
                <!-- <label class="showpassword" style="margin-bottom: 0;">
                    <h4 style="margin-left: -5px">
                        Create account.
                        <small>New to Amazon?</small>
                    </h4>
                    <input type="checkbox" :checked="createUser" @click="changeLoginType" />
                    <span
                        class="checkmark"
                        style="
    border-radius: 50%; margin-top: 20px;; transform: scale(0.8)"
                    ></span>
                </label>-->
                <label class="showpassword" style="margin-bottom: 0;  padding-top: 0">
                    <h4 style="margin-left: -5px">
                        Sign-In.
                        <small>Allready a customer?</small>
                    </h4>
                    <input type="checkbox" :checked="!createUser" @click="changeLoginType" />
                    <span
                        class="checkmark"
                        style="
    border-radius: 50%; margin-top: 20px;; transform: scale(0.8)"
                    ></span>
                </label>

                <input type="text" placeholder="Login e-mail" v-model="loginUsername" />
                <input :type="type" placeholder="Login password" v-model="loginPassword" />
                <button>Continue</button>
                <div
                    class="policy"
                >By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            type: "password",
            btnText: "Show password",
            createUser: false,
            newUser: {
                fullName: null,
                email: null,
                password: null
            },
            loginUsername: null,
            loginPassword: null,
            validationErrors: []
        }
    },
    methods: {

        registerNewUser() {
            this.validationErrors = [];
            if (!this.newUser.email) {
                this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
            }
            if (/.+@.+/.test(this.newUser.email) != true) {
                this.validationErrors.push("<strong>E-mail</strong> must be valid.");
            }
            // password validation
            if (!this.newUser.password) {
                this.validationErrors.push("<strong>Password</strong> cannot be empty.");
            }
            if (/.{4,}/.test(this.newUser.password) != true) {
                this.validationErrors.push(
                    "<strong>Password</strong> must be at least 4 characters long."
                );
            }
            if (!(this.password === this.passwordRepeat)) {
                this.validationErrors.push("<strong>Passwords</strong> did not match.");
            }

            // when valid then sign in
            if (this.validationErrors.length <= 0) {
                this.signUp();
            }
        },
        signUp() {

            this.signUpAction({ email: this.newUser.email, password: this.newUser.password });
        },
        changeLoginType() {
            this.createUser = !this.createUser
        },
        showPassword() {
            if (this.type === 'password') {
                this.type = 'text'
            } else {
                this.type = 'password'
            }
        },
        ...mapActions(["signUpAction"]),
    }, computed: {


        ...mapGetters("auth", ['getUser', 'isUserAuth'])
    }
}
</script>

<style scoped>
.policy {
    margin: 15px 0;
    font-size: 0.8rem;
}
button {
    all: unset;
    cursor: pointer;
    background-image: linear-gradient(rgb(255, 234, 163), rgb(236, 202, 47));
    padding: 15px;
    border: 1px solid orange;
    border-radius: 3px;
    text-align: center;
    font-size: 0.95rem;
    margin: 10px 0 0 0;
}
.outer-container {
    display: flex;
    justify-content: center;
    margin: 10px;
}
.signintab {
    background-color: rgb(247, 247, 247);
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(221, 221, 221);
}
.logintab {
    background-color: rgb(247, 247, 247);
    margin-top: 10px;
    border-top: 1px solid rgb(221, 221, 221);
}
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0;
    background-color: white;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 5px;
    max-width: 450px;
}
section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 15px;
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

/* STYLE CHECKBOX
 */
.showpassword {
    display: block;
    position: relative;
    padding-left: 34px;
    margin-bottom: 12px;
    cursor: pointer;
    padding-top: 4px;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.showpassword input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(245, 167, 0);
    border-radius: 3px;
    box-shadow: 0 0 5px rgb(245, 167, 0);
}

/* On mouse-over, add a grey background color */
.showpassword:hover input ~ .checkmark {
    background-color: rgb(248, 248, 248);
}

/* When the checkbox is checked, add a blue background */
.showpassword input:checked ~ .checkmark {
    background-color: #ffffff;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.showpassword input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.showpassword .checkmark:after {
    left: 6.5px;
    top: 4px;
    width: 4px;
    height: 8px;
    border: solid rgb(245, 167, 0);
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>