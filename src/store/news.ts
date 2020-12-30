import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

export class NewsClass {
  title: string;

  description: string;

  image: File;

  id: string;

  constructor(title: string, description: string, image: File, id = '') {
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
    updateNewsList(state, id: string) {
      state.newsList = state.newsList.filter((i) => i.id !== id);
    },
    createNews(state, payload) {
      state.newsList.push(payload);
    },
    updateNews(state, {
      title,
      description,
      id,
      image,
    }) {
      const news = state.newsList.find((a) => a.id === id);
      news.title = title;
      news.description = description;
      news.image = image;
    },
  },
  actions: {
    async createNews({ commit }, payload: NewsClass) {
      commit('clearError');
      commit('setLoading', true);

      const { image } = payload;

      try {
        const newNews = new NewsClass(payload.title, payload.description, '');
        const fbValue = firebase.database().ref('news').push(newNews);
        const imageExt = image.name.slice(image.name.length - 3, image.name.length);

        const fileData = await firebase.storage()
          .ref(`news/${fbValue.key}.${imageExt}`).put(image);
        const imageSrc = await firebase.storage()
          .ref(`news/${fbValue.key}.${imageExt}`).getDownloadURL();

        if (fbValue.key != null) {
          await firebase.database().ref('news').child(fbValue.key).update({
            image: imageSrc,
          });
        }

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

      const resultNews: Array<NewsClass> = [];

      try {
        const fbVal = await firebase.database().ref('news').once('value');
        const bdNews = fbVal.val();

        Object.keys(bdNews).forEach((key) => {
          const news = bdNews[key];
          resultNews.push(
            new NewsClass(news.title, news.description, news.image, key),
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
    }: NewsClass) {
      commit('clearError');
      commit('setLoading', true);

      try {
        if (image.name) {
          const imageExt = image.name.slice(image.name.length - 3, image.name.length);
          await firebase.storage().ref(`news/${id}.${imageExt}`).put(image);
          const imageSrc = await firebase.storage().ref(`news/${id}.${imageExt}`).getDownloadURL();
          await firebase.database().ref('news').child(id).update({
            title, description, image: imageSrc,
          });
          commit('updateNews', {
            title, description, id, image: imageSrc,
          });
        } else {
          await firebase.database().ref('news').child(id).update({
            title, description,
          });
          commit('updateNews', {
            title, description, id, image,
          });
        }
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    async deleteNews({ commit }, id: string) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const value = await firebase.database().ref(`news/${id}`).once('value');
        const ref = value.val().image;
        const fullName = firebase.storage().refFromURL(`${ref}`).name;
        console.log(fullName);
        const file = firebase.storage().ref('news').child(fullName);
        await file.delete();
        await firebase.database().ref('news').child(id).remove();
        commit('updateNewsList', id);
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
