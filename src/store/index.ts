import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import user from './user';
import news from './news';

Vue.use(Vuex);

class Link {
  title: string;

  private link: string;

  private image: string;

  description: string;

  private id: string;

  constructor(title: string, link: string, image: string, description: string, id: string) {
    this.title = title;
    this.link = link;
    this.image = image;
    this.description = description;
    this.id = id;
  }
}
const links: Link[] = [];

export default new Vuex.Store({

  state: {
    links: links,
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
    createLink(state, payload: Link) {
      state.links.push(payload);
    },
    updateLink(state, { title, description, id }: any) {
      const link = state.links.find((a: any) => a.id === id);
      if (link) {
        link.title = title;
        link.description = description;
      }
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

      const resultLinks: Array<Link> = [];

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
    async updateLink({ commit }, {
      title,
      description,
      id,
      image,
    }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        if (image.name) {
          const imageExt = image.name.slice(image.name.length - 3, image.name.length);
          await firebase.storage().ref(`links/${id}.${imageExt}`).put(image);
          const imageSrc = await firebase.storage().ref(`links/${id}.${imageExt}`).getDownloadURL();
          await firebase.database().ref('links').child(id).update({
            title, description, image: imageSrc,
          });
          commit('updateLink', {
            title, description, id, image: imageSrc,
          });
        } else {
          await firebase.database().ref('links').child(id).update({
            title, description,
          });
          commit('updateLink', {
            title, description, id,
          });
        }
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
