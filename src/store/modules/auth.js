import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";

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
  },
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
  authAction(context) {
    console.log("checking auth");
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setTimeout(() => {
          context.commit("setUser", auth.currentUser);
        }, 500);
      } else {
        context.commit("setUser", null);
      }
    });
  },
  signUpAction({ commit }, payload) {
    const displayName = payload.displayName;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: displayName,
        }).then(() => {
          auth.currentUser.reload().then(() => {
            commit("setUser", getAuth().currentUser);
          });
        });
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  signInAction(context, payload) {
    // return
    let auth = getAuth();
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((response) => {
        context.commit("setUser", response.user);
      })
      .catch((error) => {
        context.commit("setError", error.message);
      });
  },
  signOutAction({ commit }) {
    console.log("trying to sign out");
    getAuth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  deleteUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (confirm("Do you want to delete this account?")) {
      deleteUser(user)
        .then(() => {
          console.log("user deleted");
        })
        .catch((error) => {
          console.log(error + " error deleting user");
        });
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
