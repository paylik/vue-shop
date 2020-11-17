<template>
  <v-app-bar app
             absolute
             color="#fcb69f"
             dark
             shrink-on-scroll
             src="https://picsum.photos/1920/1080?random"
             @toggleDrawer="$emit('toggleDrawer')"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon
      @click="$emit('toggleDrawer')"
      class="hidden-md-and-up"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>
      <router-link to="/" tag="span" class="pointer">
    Магазин аксессуаров
      </router-link>
    </v-toolbar-title>
    <v-btn
      v-for="link in links"
      :key="`${link.id}-header-link`"
      color="white"
      text
      rounded
      class="my-2 hidden-sm-and-down"
      :to="link.url"
    >
      {{ link.label }}
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon>
      <router-link to="/login" tag="span" class="pointer">
        <v-icon>mdi-dots-vertical</v-icon>
      </router-link>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import

{ Component, Vue, Prop } from 'vue-property-decorator';

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

<style scoped>
.pointer{
  cursor: pointer;
}

</style>
