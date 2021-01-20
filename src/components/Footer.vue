/* eslint linebreak-style: ["error", "windows"] */
<template>
  <v-footer
            color="primary lighten-1"
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
        class="my-2 hidden-sm-and-down"
        :to="'/' + link.link"
      >
        {{ link.title }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>
        <a href="mailto:paylik@yandex.ru
        ?subject=Запрос%20Женави%20Сморгонь
        &body=Запрос%20Женави%20Сморгонь">
          Разработка сайта: paylik@yandex.ru
        </a></strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private links: Array<object> = this.$store.getters.links
}
</script>

<style>

</style>
