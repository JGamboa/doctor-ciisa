import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: '',
    box: null,
  },
  mutations: {
    getBox(state, payload){
      state.box = payload;
    },
    getUser(state, payload){
      state.token = payload.token;
      if (payload === ''){
        state.user = '';
      }else{
        state.user = payload.usuario;
        router.push({ name: 'Dashboard'});
      }
    }
  },
  actions: {
    storeBox({commit}, payload){
      localStorage.setItem('selected-box', JSON.stringify(payload));
      commit('getBox', payload);
    },
    getBox({ commit }){
      const selected_box = JSON.parse(localStorage.getItem('selected-box'));
      let payload = selected_box;
      commit('getBox', payload);
    },
    storeUser({ commit }, payload){
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.usuario));
      commit('getUser', payload);
    },
    logout({commit}){
      commit('getUser', '');
      commit('getBox', null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('selected-box');
      router.push({name: 'Login'});
    },
    getToken({commit}){
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      let payload = {
        token: token,
        usuario: user,
      }

      if(token){
        commit('getUser', payload);
      }else{
        commit('getUser', '');
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    loggedUser: state => state.user,
    selectedBox: state => state.box,
  },
  modules: {
  }
})
