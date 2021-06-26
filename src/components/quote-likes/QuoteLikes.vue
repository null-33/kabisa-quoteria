<template>
  <span class="d-flex align-center" :title="$t('labels.numberOfLikes')">
    <span class="font-weight-bold" v-text="stats.likes.length" v-if="stats.likes.length" />
    <v-icon :disabled="stats.likes.length === 0" right color="red">mdi-heart</v-icon>
  </span>
</template>

<script lang="ts">
import { QuoteStats } from '@/types';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    stats: Object as PropType<QuoteStats>,
  },
});
</script>
