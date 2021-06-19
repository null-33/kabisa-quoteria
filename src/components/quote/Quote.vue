<template>
  <div />
</template>

<script lang="ts">
import { Quote } from '@/types';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    quote: {
      type: Object as PropType<Quote>,
    },
  },
});
</script>
