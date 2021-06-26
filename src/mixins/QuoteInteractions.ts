import { Quote } from '@/types';
import Vue from 'vue';

export default Vue.extend({
  methods: {
    toggleLike(quote: Quote) {
      this.$store.dispatch('toggleLike', quote.id);
    },
  },
});
