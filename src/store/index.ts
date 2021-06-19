import { Nullable, Quote } from '@/types';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import fapp from '@/firebase';
import Firebase from 'firebase';

Vue.use(Vuex);

type State = {
  quotes: Quote[];
  user: Nullable<Firebase.auth.UserCredential>;
};

export default new Vuex.Store<State>({
  state: {
    quotes: [],
    user: null,
  },
  mutations: {
    setQuotes(state, quotes: Quote[]) {
      state.quotes = quotes;
    },

    setUser(state, user: Firebase.auth.UserCredential) {
      state.user = user;
    },
  },
  actions: {
    async fetchAllQuotes({ commit }) {
      const response = await axios.get<Quote[]>('http://quotes.stormconsultancy.co.uk/quotes.json');

      commit('setQuotes', response.data);

      return response.data;
    },

    async fetchRandomQuote() {
      const response = await axios.get<Quote>('http://quotes.stormconsultancy.co.uk/random.json');

      return response.data;
    },

    async signIn({ commit }) {
      try {
        const user = await fapp.auth().signInAnonymously();

        commit('setUser', user);
      } catch (e) {
        // TODO: create fallback for failed authentication
      }
    },
  },
  modules: {},
});
