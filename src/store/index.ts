import { Nullable, Quote, QuoteStats, QuoteWithStats } from '@/types';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import fapp from '@/firebase';

const statsRef = fapp.database().ref('stats');

Vue.use(Vuex);

type State = {
  quotes: Quote[];
  user: Nullable<string>;
  stats: Stats;
  hasStats: boolean;
};

type Stats = Record<number, QuoteStats>;

export default new Vuex.Store<State>({
  state: {
    quotes: [],
    user: null,
    stats: {},
    hasStats: false,
  },
  mutations: {
    setQuotes(state, quotes: Quote[]) {
      state.quotes = quotes;
    },

    setUser(state, user: string) {
      state.user = user;
    },

    setStats(state, stats: Stats) {
      state.stats = stats;
      state.hasStats = true;
    },
  },
  getters: {
    hasUser: (state) => !!state.user,
    getUser: (state) => state.user,

    quotesWithStats: (state, getters): QuoteWithStats[] =>
      state.quotes.map((quote) => ({ quote, stats: getters.getStats(quote.id) })),

    rankedQuotes: (state, getters) =>
      (getters.quotesWithStats as QuoteWithStats[]).slice().sort((a, b) => {
        // quotes with most likes on top
        if (a.stats.likes.length !== b.stats.likes.length)
          return b.stats.likes.length - a.stats.likes.length;

        if (a.stats.likes.length === 0) return 0;

        const newestA = a.stats.likes.slice().pop();
        const newestB = b.stats.likes.slice().pop();

        // otherwise put the quote with most recent like on top
        return newestB!.timestamp - newestA!.timestamp;
      }),

    getStats:
      (state) =>
      (id: number): QuoteStats =>
        state.stats[id] ?? { likes: [] },

    hasStats: (state) => state.hasStats,
  },
  actions: {
    async init({ dispatch }) {
      await dispatch('signIn');
      await dispatch('hookDatabase');
    },

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

        commit('setUser', user.user?.uid);
      } catch (e) {
        // TODO: create fallback for failed authentication
      }
    },

    hookDatabase({ commit }) {
      statsRef.on('value', (snapshot) => {
        const val: Nullable<Stats> = snapshot.val();

        if (val !== null) {
          commit('setStats', val);
        }
      });
    },

    unhookDatabase() {
      statsRef.off();
    },

    toggleLike({ state, getters }, quoteId: string) {
      const stats: QuoteStats = getters.getStats(quoteId);
      const likes = stats.likes.slice();

      const index = likes.findIndex((like) => like.user === state.user!);

      if (index >= 0) {
        likes.splice(index, 1);
      } else {
        likes.push({ user: state.user!, timestamp: Date.now() });
      }

      statsRef.update({ [quoteId]: { ...stats, likes } });
    },
  },
});
