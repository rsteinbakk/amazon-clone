import { getAuth, onAuthStateChanged } from "firebase/auth";

// initial state
const state = () => ({
  user: null,
  error: null,
});

// getters
const getters = {
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
  };

// mutations
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

// actions
const actions = {
  checkAuthState() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (uid === "bwBFfLMUPfckKW70JZNr4kY9Ngl1") {
          this.loggedIn = true;
          console.log("admin logged in");
        }
      } else {
        this.loggedIn = false;
      }
    });
  },
  signUpAction({ commit }, payload) {
      const auth = getAuth();
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        commit("setUser", response.user);
      })
      .catch((error) => {
        commit("setError", error.message);
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
