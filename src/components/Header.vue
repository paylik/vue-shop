<template>
  <v-card >
  <v-app-bar app
             absolute
             color="#fcb69f"
             dark
             shrink-on-scroll
             prominent
             src="https://picsum.photos/1920/1080?random"
             fade-img-on-scroll
             scroll-target="#scrolling-techniques-5"
             scroll-threshold="500"
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
      :to="'/' + link.link"
    >
      {{ link.title }}
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn v-if="isUserLoggedIn" icon>
      <router-link to="/add" tag="span" class="pointer">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </router-link>
    </v-btn>
    <v-btn icon>
      <router-link to="/login" tag="span" class="pointer">
        <v-icon
          v-if="isUserLoggedIn"
          @click="logOut"
        >mdi-logout</v-icon>
        <v-icon v-else>mdi-dots-vertical</v-icon>
      </router-link>
    </v-btn>
  </v-app-bar>
  </v-card>
</template>

<script lang="ts">
import

{ Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  private links: Array<object> = this.$store.getters.links

  get isUserLoggedIn(): boolean {
    return this.$store.getters.isUserLoggedIn;
  }

  public logOut(): void {
    this.$store.dispatch('logout');
  }
}
</script>

<style scoped>
.pointer{
  cursor: pointer;
}

</style>
