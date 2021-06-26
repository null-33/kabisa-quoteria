import { Nullable, Quote, QuoteStats } from '@/types';
import QuoteCard from '@/components/quote-card';
import QuoteInteractions from '@/mixins/QuoteInteractions';
import { VNode } from 'vue';

export default QuoteInteractions.extend({
  name: 'KqRandomQuote',

  components: {
    QuoteCard,
  },

  data() {
    return {
      quote: null as Nullable<Quote>,
    };
  },

  mounted() {
    this.getQuote();
  },

  render(h): VNode {
    return h('quote-card', {
      props: { quote: this.quote, stats: this.stats, timer: 30000 },
      class: 'kq-quote--random',
      on: { like: () => this.toggleLike(this.quote!), timeout: this.getQuote },
    });
  },

  computed: {
    stats(): QuoteStats {
      return this.$store.getters['getStats'](this.quote?.id);
    },
  },

  methods: {
    async getQuote() {
      this.quote = await this.$store.dispatch('fetchRandomQuote');
    },
  },
});
