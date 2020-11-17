<template>
<v-list rounded>
  <v-subheader>REPORTS</v-subheader>
  <v-list-item-group
    color="primary"
  >
    <v-list-item
      v-for="(link, i) in links"
      :key="i"
      :to="link.url"
    >
<!--      <v-list-item-icon>-->
<!--        <v-icon v-text="link.icon"></v-icon>-->
<!--      </v-list-item-icon>-->
      <v-list-item-content>
        <v-list-item-title v-text="link.label"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</v-list>
</template>

<script lang="ts">

import

{ Component, Vue } from 'vue-property-decorator';

@Component
export default class Drawer extends Vue {
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
