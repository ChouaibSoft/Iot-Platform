import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
import createPersistedState from "vuex-persistedstate";
import { createFlashStore } from 'vuex-flash';


Vue.use(Vuex);

export const store = new Vuex.Store ({
  state: {
      isLogged: !!localStorage.getItem("token"),
      progress: false,
      userId: '',
      token: null
  },
  getters: {
      isLogged: state => {
          return state.isLogged;
      }
  },
  mutations: {
      LOGIN (state) {
          state.pending = true;
      },
      LOGIN_SUCCESS (state) {
          state.isLogged = true;
          state.pending = false;
      },
      LOGOUT(state) {
          state.token = null;
          state.isLogged = false;
      },
      switchProgress(state) {
          state.progress = !state.progress;
      },
      saveUserId (state, id) {
          state.userId = id
      },
      saveUserToken (state, token) {
          state.token = token
      }
  },
  actions: {
      logout({ commit }) {
          router.push('/');
          commit('LOGOUT');
      },
      switchProgress({ commit }) {
          commit('switchProgress');
      },
      saveUserId (context, Id) {
          context.commit('saveUserId', Id)
      },
      saveUserToken (context, token) {
          context.commit('saveUserToken', token)
      },
  },
    plugins: [
        createPersistedState(),
        createFlashStore()
    ]

});
