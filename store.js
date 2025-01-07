// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    // Početno stanje admina je prazno
    admin: {
      username: '',
      password: ''
    }
  },
  mutations: {
    // Mutacija za postavljanje podataka administratora
    setAdmin(state, adminData) {
      state.admin.username = adminData.username;
      state.admin.password = adminData.password;
    }
  },
  actions: {
    // Akcija koja se koristi za autentifikaciju i spremanje podataka admina
    loginAdmin({ commit }, credentials) {
      const { username, password } = credentials;

      // Simulacija provjere kredencijala
      if (
        (username === 'ncikovic' && password === '300920003') ||
        (username === 'kblazevic' && password === '05052003')
      ) {
        // Ako su kredencijali točni, spremi podatke u state
        commit('setAdmin', { username, password });
        return true; // Prijava uspješna
      } else {
        return false; // Neispravni podaci
      }
    }
  },
  getters: {
    // Getter za dohvat podataka o adminu
    getAdmin(state) {
      return state.admin;
    }
  }
});
