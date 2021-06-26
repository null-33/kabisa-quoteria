import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/i18n/messages';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'nl', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export default i18n;
