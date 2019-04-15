import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import getters from './getters'
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex);

export const store = new Vuex.Store ({
  state: {
      isLogged: !!localStorage.getItem("token"),
      progress: false,
      userId: '',
      token: null,
      canals: '',
      apiURL: 'http://localhost:8091',
      locale: 'en' // Default Language
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  plugins: [
    createPersistedState()
    ]

});
