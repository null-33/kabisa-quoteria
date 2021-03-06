<template>
  <v-card class="kq-quote" color="amber lighten-5" elevation="4">
    <v-skeleton-loader
      min-height="350"
      v-if="!quote"
      class="pa-10 transparent"
      type="list-item-three-line, card-heading"
    ></v-skeleton-loader>

    <template v-else>
      <v-progress-linear v-if="timer" v-model="progress" color="warning" />
      <v-card-text
        class="text-h3 font-quote kq-quote__quote text-center pa-15 black--text"
        :title="$t('labels.quote')"
        v-text="quote.quote"
      />

      <v-card-text
        class="text-h5 font-quote font-weight-light kq-quote__author text-center black--text"
        :title="$t('labels.author')"
        v-text="quote.author"
      />

      <div class="text-right pb-3 pr-3">
        <v-btn text large @click="$emit('like')" :title="$t('labels.pressToLike')">
          <span
            class="font-weight-bold headline mr-3"
            v-if="stats.likes.length"
            v-text="stats.likes.length"
          />
          <v-icon large color="red" :disabled="stats.likes.length === 0">mdi-heart</v-icon>
        </v-btn>
      </div>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Quote, QuoteStats } from '@/types';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'KqQuote',

  props: {
    quote: {
      type: Object as PropType<Quote>,
    },
    stats: {
      type: Object as PropType<QuoteStats>,
    },
    timer: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      requestId: -1,
      timerStart: Date.now(),
      progress: 0,
    };
  },

  watch: {
    quote: {
      immediate: true,
      handler() {
        window.cancelAnimationFrame(this.requestId);

        if (this.timer) {
          this.startTimer();
        }
      },
    },
  },

  methods: {
    startTimer() {
      this.timerStart = Date.now();
      this.requestId = window.requestAnimationFrame(this.updateTimer);
    },

    updateTimer() {
      const timePassed = Date.now() - this.timerStart;

      this.progress = 100 - (timePassed / this.timer) * 100;

      if (timePassed < this.timer) this.requestId = window.requestAnimationFrame(this.updateTimer);
      else this.$emit('timeout');
    },
  },
});
</script>

<style lang="scss">
.v-progress-linear.v-progress-linear {
  transition: none;
}
</style>

<style lang="scss">
.v-skeleton-loader.transparent > .v-skeleton-loader__bone {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
