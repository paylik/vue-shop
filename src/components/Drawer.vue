<template>
<v-list rounded>
  <v-subheader>КАТЕГОРИИ</v-subheader>
  <v-list-item-group
    color="primary"
  >
    <v-list-item
      v-for="(link, i) in links"
      :key="i"
      :to="link.link"
    >
<!--      <v-list-item-icon>-->
<!--        <v-icon v-text="link.icon"></v-icon>-->
<!--      </v-list-item-icon>-->
      <v-list-item-content>
        <v-list-item-title v-text="link.title"></v-list-item-title>
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
  private links: Array<object> = this.$store.getters.links
}
</script>

<style>

</style>
