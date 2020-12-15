import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

export class News {
  private title: string;

  private description: string;

  private image: string;

  id: string;

  constructor(title: string, description: string, image: string, id: string) {
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
      const link = state.news.find((a) => a.id === id);
      link.title = title;
      link.description = description;
    },
  },
  actions: {
    createNews({ commit }, payload: News) {
      // payload.id = Math.floor(Math.random() * 10000).toString();
      // payload.id = 'Math.floor(Math.random() * 10000).toString()';

      commit('createNews', payload);
    },
  },
  modules: {},
  getters: {
    newsList(state) {
      return state.newsList;
    },
  },
};
