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
        <v-btn class="warning mx-auto" @click="onDelete"> Удалить </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <app-e404></app-e404>
    </v-container>
  </div>
</template>

<script lang="ts">
import

{ Component, Vue, Prop } from 'vue-property-decorator';
import { NewsClass } from '@/store/news';
import EditNewsModal from './EditNewsModal.vue';
import E404 from './E404.vue';

@Component({
  components: {
    appEditNewsModal: EditNewsModal,
    appE404: E404,
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

  private onDelete(): void {
    // eslint-disable-next-line no-restricted-globals
    const sure = confirm('Вы уверены, что хотите удалить новость?');
    if (sure) {
      const { id } = this.news;

      this.$store.dispatch('deleteNews', id)
        .then(() => { this.$router.push('/'); })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    }
  }
}
</script>

<style scoped>
  .news-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;}
</style>
