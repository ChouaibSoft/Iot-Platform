import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router';


Vue.use(Vuex);

export const store = new Vuex.Store ({
  state: {
      isLogged: !!localStorage.getItem("token"),
      progress: false
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
          state.isLogged = false;
      },
      switchProgress(state) {
          state.progress = !state.progress;
      },
  },
  actions: {
      logout({ commit }) {
          localStorage.removeItem("token");
          router.push('/');
          commit('LOGOUT');
      },
      switchProgress({ commit }) {
          commit('switchProgress');
      },
  }
});
