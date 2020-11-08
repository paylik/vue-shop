<template>
  <v-app-bar app
             absolute
             color="#fcb69f"
             dark
             shrink-on-scroll
             src="https://picsum.photos/1920/1080?random"
             scroll-target="#scrolling-techniques-2"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Магазин аксессуаров</v-toolbar-title>
    <v-btn
      v-for="link in links"
      :key="`${link.id}-header-link`"
      color="white"
      text
      rounded
      class="my-2"
      :to="link.url"
    >
      {{ link.label }}
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
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
