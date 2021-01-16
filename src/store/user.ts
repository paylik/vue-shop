import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

class User {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }
}

Vue.use(Vuex);

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state: any, payload: User) {
      state.user = payload;
    },
  },
  actions: {
    async loginUser(
      { commit }: { commit: Function },
      { email, password }: { email: string; password: string },
    ) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', new User(user.uid));
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    autoLoginUser({ commit }: { commit: Function }, payload: User) {
      commit('setUser', new User(payload.uid));
    },
    logout({ commit }: { commit: Function }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  modules: {},
  getters: {
    user(state: any) {
      return state.user;
    },
    isUserLoggedIn(state: any) {
      return state.user !== null;
    },
  },
};
