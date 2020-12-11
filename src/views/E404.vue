<template>
  <div>
    <v-container>
      <v-row justify="center">
        <h3>Что-то пошло не так! Такой страницы не существует!</h3>
      </v-row>
      <v-row>
        <v-btn
          color="red"
          text
          rounded
          class="my-2 mx-auto"
          to="/"
        >Вернуться на главную.
        </v-btn>
      </v-row>
      <v-row>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/vue-shop-22584.appspot.com/o/links%2FpYAAAgIrMeA-960.jpg?alt=media&token=8c8f03e3-2778-40a7-b86c-f47a9d0f46cc"
        ></v-img>
      </v-row>
    </v-container>E404
  </div>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';

@Component
export default class E404 extends Vue {
}
</script>

<style>

</style>
