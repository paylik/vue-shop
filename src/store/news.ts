import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

export class News {
  title: string;

  description: string;

  image: string;

  id: string;

  constructor(title: string, description: string, image: string, id = '') {
    this.title = title;
    this.description = description;
    this.image = image;
    this.id = id;
  }
}

Vue.use(Vuex);

export default {
  state: {
    newsList: [],
  },
  mutations: {
    loadNews(state, payload) {
      state.news.push(...payload);
    },
    createNews(state, payload) {
      state.newsList.push(payload);
    },
    updateNews(state, { title, description, id }) {
      const news = state.news.find((a) => a.id === id);
      news.title = title;
      news.description = description;
    },
  },
  actions: {
    async createNews({ commit, getters }, payload: News) {
      commit('clearError');
      commit('setLoading', true);

      commit('createNews', payload);
      try {
        const newNews = new News(payload.title, payload.description, payload.image);
        const fbValue = firebase.database().ref('news').push('newNews');

        commit('setLoading', false);
        commit('createNews', {
          ...newNews,
          id: fbValue.key,
        });
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
  },
  modules: {},
  getters: {
    newsList(state) {
      return state.newsList;
    },
  },
};
