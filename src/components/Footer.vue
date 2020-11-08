<template>
  <v-footer app
            color="primary lighten-1"
            padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="`${link.id}-footer-link`"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private links: Array<object> = [
    {
      label: 'Домой',
      url: '/',
      id: 1,
    },
    {
      label: 'Продукция',
      url: '/products',
      id: 2,
    },
    {
      label: 'О нас',
      url: '/about',
      id: 3,
    },
    {
      label: 'Сертификаты',
      url: '/cert',
      id: 4,
    },
    {
      label: 'Акции',
      url: '/promotions',
      id: 5,
    },
  ];
}
</script>

<style>

</style>
