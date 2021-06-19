<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Kabisa logo"
          class="shrink mr-2"
          contain
          src="https://d33wubrfki0l68.cloudfront.net/4b721b7ee7719508c7470bc7b3b693c44b24364b/62fe7/images/kabisa-logo-4b721b7e.svg"
          transition="scale-transition"
          width="120"
        />
      </div>

      <v-app-bar-title>Quoteria</v-app-bar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
