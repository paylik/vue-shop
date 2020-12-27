/*eslint linebreak-style: ["error", "windows"]*/
<template>
  <div>
    <v-container v-if="news">
      <v-row>
        <v-col>
          <div class="text-h3">
            {{ news.title }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-img
          max-height="350"
          max-width="650"
          :src="news.image"
          class="mx-auto"
        ></v-img>
      </v-row>
      <v-row>
        <v-col>
        {{ news.description }}
        </v-col>
      </v-row>
      <v-row v-if="isUserLoggedIn"><v-spacer></v-spacer>
        <v-col>
        <app-edit-news-modal :news="news"></app-edit-news-modal>
        <v-btn class="warning mx-auto" @click="onDelite"> Удалить </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
      v-else
      class="mt-10"
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import

{ Component, Vue, Prop } from 'vue-property-decorator';
import { NewsClass } from '@/store/news';
import EditNewsModal from './EditNewsModal.vue';

@Component({
  components: {
    appEditNewsModal: EditNewsModal,
  },
})
export default class News extends Vue {
  @Prop(String)
  readonly id!: string;

  get news(): NewsClass {
    return this.$store.getters.newsById(this.id);
  }

  get isUserLoggedIn(): boolean {
    return this.$store.getters.isUserLoggedIn;
  }

  get loading(): boolean {
    return this.$store.getters.loading;
  }

  private onDelite(): void {
    console.log(this.news.title);
  }
}
</script>

<style>

</style>
