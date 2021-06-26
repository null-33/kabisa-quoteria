<template>
  <v-scale-transition group tag="v-list">
    <quote-item
      v-for="(item, i) in quotes"
      :item="item"
      :rank="i + 1"
      :key="item.quote.id"
      :class="{ 'mt-8': i > 0 }"
      :loading="loading"
    />
  </v-scale-transition>
</template>

<script lang="ts">
import { QuoteWithStats } from '@/types';
import Vue, { PropType } from 'vue';
import { VList } from 'vuetify/lib';

/* eslint vue/no-unused-components: 0 */

import QuoteItem from './QuoteItem.vue';

export default Vue.extend({
  components: { QuoteItem, VList },
  props: {
    quotes: {
      type: Array as PropType<QuoteWithStats[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
    },
  },
});
</script>
