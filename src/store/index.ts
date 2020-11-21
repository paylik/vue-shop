import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import user from './user';

Vue.use(Vuex);

class Link {
  private title: string;

  private link: string;

  private image: string;

  private description: string;

  private id: string;

  constructor(title: string, link: string, image: string, description: string, id: string) {
    this.title = title;
    this.link = link;
    this.image = image;
    this.description = description;
    this.id = id;
  }
}

let links;

export default new Vuex.Store({

  state: {
    links: links = [
      {
        title: 'Домой',
        link: '/',
        id: 0,
      },
    ],
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    loadLinks(state, payload) {
      state.links.push(...payload);
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    setError({ commit }, payload) {
      commit('setError', payload);
    },
    clearError({ commit }) {
      commit('clearError');
    },
    async fetchLinks({ commit }) {
      commit('clearError');
      commit('setLoading', true);

      const resultLinks: Array<any> = [];

      try {
        const val = await firebase.database().ref('links').once('value');
        const bdLinks = val.val();
        Object.keys(bdLinks).forEach((key) => {
          const link = bdLinks[key];
          resultLinks.push(
            new Link(link.title, link.link, link.image, link.description, key),
          );
        });
        commit('loadLinks', resultLinks);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
  },
  modules: {
    user,
  },
  getters: {
    links(state) {
      return state.links;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
