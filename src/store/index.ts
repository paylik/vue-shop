import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import user from './user';
import news, { News } from './news';

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
    createLink(state, payload) {
      state.links.push(payload);
    },
    updateLink(state, { title, description, id }) {
      const link = state.links.find((a) => a.id === id);
      link.title = title;
      link.description = description;
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
    // async createNews({ commit }, payload) {
    //   commit('clearError');
    //   commit('setLoading');
    //
    //   const { image } = payload;
    //
    //   try {
    //     const newNews = new News(
    //       payload.title,
    //       payload.description,
    //       payload.image,
    //       '',
    //     );
    //
    //     const newsBD = await firebase.database().ref('news').push(newNews);
    //     console.log('console.log newsBD ', newsBD);
    //     const imageExt = image.slice(11, 14);
    //     const fileData = await firebase.storage()
    //     .ref(`news/${newsBD.key}.${imageExt}`).put(image);
    //     const imageSrc = await firebase.storage()
    //     .ref(`news/${newsBD.key}.${imageExt}`).getDownloadURL();
    //
    //     await firebase.database().ref('news').child(newsBD.key).update({
    //       image: imageSrc,
    //     });
    //
    //     commit('setLoading', false);
    //     commit('createLink', {
    //       ...newNews,
    //       id: newsBD.key,
    //       image: imageSrc,
    //     });
    //   } catch (error) {
    //     commit('setError', error.message);
    //     commit('setLoading', false);
    //     throw error;
    //   }
    // },
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
    async updateLink({ commit }, { title, description, id }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        await firebase.database().ref('links').child(id).update({
          title, description,
        });
        commit('updateLink', {
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
  modules: {
    user, news,
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
