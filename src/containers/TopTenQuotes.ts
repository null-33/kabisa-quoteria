import Vue from 'vue';
import { QuoteWithStats } from '@/types';
import RankedQuoteList from '@/components/ranked-quote-list';
import { VNode } from 'vue';

export default Vue.extend({
  name: 'KqTopTenQuotes',

  components: {
    RankedQuoteList,
  },

  data() {
    return {};
  },

  render(h): VNode {
    return h('ranked-quote-list', {
      props: { quotes: this.quotes, loading: !this.hasStats },
    });
  },

  computed: {
    quotes(): QuoteWithStats[] {
      const quotes: QuoteWithStats[] = this.$store.getters['rankedQuotes'];

      return quotes.slice(0, 10);
    },

    hasStats(): boolean {
      return this.$store.getters['hasStats'];
    },
  },
});
