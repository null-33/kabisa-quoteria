<template>
  <v-list-item>
    <v-list-item-action-text style="min-width: 80px" class="text-h3 font-weight-black black--text"
      >{{ rank }}.</v-list-item-action-text
    >
    <v-list-item-content
      class="kq-quote"
      :class="{
        'pl-10': $vuetify.breakpoint.lgAndUp,
      }"
    >
      <v-skeleton-loader
        v-if="loading"
        type="list-item-three-line, card-heading"
      ></v-skeleton-loader>
      <template v-else>
        <div
          class="headline font-quote kq-quote__quote"
          v-text="item.quote.quote"
          :title="$t('labels.quote')"
        ></div>
        <div class="mt-3 d-flex justify-space-between align-center">
          <span
            class="subtitle-1 font-quote kq-quote__author"
            v-text="item.quote.author"
            :title="$t('labels.author')"
          />
          <quote-likes :stats="item.stats" />
        </div>
      </template>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { QuoteWithStats } from '@/types';
import QuoteLikes from '@/components/quote-likes';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  components: {
    QuoteLikes,
  },

  props: {
    item: {
      type: Object as PropType<QuoteWithStats>,
    },

    loading: {
      type: Boolean,
      default: true,
    },

    rank: {
      type: Number,
    },
  },
});
</script>
