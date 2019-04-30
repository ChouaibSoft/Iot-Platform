import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import User from './modules/User'


Vue.use(Vuex);



// noinspection JSAnnotator
export const store = new Vuex.Store ({
  state: {
      progress: false,
      canals: null,
      canal: null,
      fields: null,
      apiURL: 'http://localhost:8091'
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules:{
      user : User
  },
  plugins: [
    createPersistedState({
        path: ['user']
    })
  ]
});
