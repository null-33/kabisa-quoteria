<template>
  <v-container>
    <random-quote :class="{ 'mt-10': $vuetify.breakpoint.mdAndUp }" />

    <h1
      class="text-h2 text-center mt-15"
      :class="{ 'pt-15': $vuetify.breakpoint.lgdAndUp }"
      v-text="$t('labels.topTenQuotes')"
    ></h1>
    <v-divider class="my-12" />

    <v-row justify="center">
      <v-col cols="12" lg="10">
        <top-ten-quotes />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import RandomQuote from '@/containers/RandomQuote';
import TopTenQuotes from '@/containers/TopTenQuotes';
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',

  components: {
    RandomQuote,
    TopTenQuotes,
  },
});
</script>
