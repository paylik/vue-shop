<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <Drawer/>
    </v-navigation-drawer>
    <Header
      @toggleDrawer="drawer = !drawer"
    ></Header>
    <v-main app>
      <router-view v-if="!loading"></router-view>
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
        v-else
        class="mt-10"
      ></v-progress-circular>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      :timeout="5000"
      :multi-line="true"
      @input="closeError"
      v-if="error"
    >
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click.native="closeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
   <Footer/>
  </v-app>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Drawer from '@/components/Drawer.vue';
import firebase from 'firebase';

@Component({
  components: {
    Footer,
    Header,
    Drawer,
  },
})
export default class App extends Vue {
  $props = ['id'];

  private drawer = false;

  private snackbar = true;

  get error(): string {
    return this.$store.getters.error;
  }

  get isUserLoggedIn(): boolean {
    return this.$store.getters.isUserLoggedIn;
  }

  get loading(): boolean {
    return this.$store.getters.loading;
  }

  private closeError(): void {
    this.$store.dispatch('clearError');
    this.snackbar = false;
  }

  // eslint-disable-next-line class-methods-use-this
  created(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCcwHJB-TC5j_sHM35NqXlGW4SR0_3Ypf8',
      authDomain: 'vue-shop-22584.firebaseapp.com',
      databaseURL: 'https://vue-shop-22584.firebaseio.com',
      projectId: 'vue-shop-22584',
      storageBucket: 'vue-shop-22584.appspot.com',
      messagingSenderId: '687339852851',
      appId: '1:687339852851:web:2f372b59a200794761ff46',
      measurementId: 'G-MXME18L0K3',
    });
    firebase.analytics();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
    this.$store.dispatch('fetchLinks');
    this.$store.dispatch('fetchNews');
  }
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
