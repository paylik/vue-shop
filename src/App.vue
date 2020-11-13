<template>
  <v-app>
    <v-navigation-drawer app temporary>
      <!-- -->
    </v-navigation-drawer>
    <Header/>
    <v-content app>
      <router-view/>
    </v-content>
   <Footer/>
  </v-app>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Footer,
    Header,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet');
</style>
