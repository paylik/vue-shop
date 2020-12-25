import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

export class News {
  title: string;

  description: string;

  image: any;

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
      state.newsList.push(...payload);
    },
    createNews(state, payload) {
      state.newsList.push(payload);
    },
    updateNews(state, { title, description, id }) {
      const news = state.newsList.find((a) => a.id === id);
      news.title = title;
      news.description = description;
    },
  },
  actions: {
    async createNews({ commit }, payload: News) {
      commit('clearError');
      commit('setLoading', true);

      const { image } = payload;

      try {
        const newNews = new News(payload.title, payload.description, '');
        const fbValue = firebase.database().ref('news').push(newNews);
        const imageExt = image.name.slice(image.name.length - 3, image.name.length);

        const fileData = await firebase.storage()
          .ref(`news/${fbValue.key}.${imageExt}`).put(image);
        const imageSrc = await firebase.storage()
          .ref(`news/${fbValue.key}.${imageExt}`).getDownloadURL();

        await firebase.database().ref('news').child(fbValue.key).update({
          image: imageSrc,
        });

        commit('setLoading', false);
        commit('createNews', {
          ...newNews,
          id: fbValue.key,
          image: imageSrc,
        });
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    async fetchNews({ commit }) {
      commit('clearError');
      commit('setLoading', true);

      const resultNews: Array<News> = [];

      try {
        const fbVal = await firebase.database().ref('news').once('value');
        const bdNews = fbVal.val();

        Object.keys(bdNews).forEach((key) => {
          const news = bdNews[key];
          resultNews.push(
            new News(news.title, news.description, news.image, key),
          );
        });

        commit('loadNews', resultNews);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    async updateNews({ commit }, {
      title,
      description,
      image,
      id,
    }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        console.log(image);
        await firebase.database().ref('news').child(id).update({
          title, description,
        });
        commit('updateNews', {
          title, description, id,
        });
        commit('setLoading', false);
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
    newsById(state) {
      return (newsId) => state.newsList.find((news) => news.id === newsId);
    },
  },
};
