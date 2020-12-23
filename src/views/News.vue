<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h3">
            {{ news.title }}
<!--            <v-text-field v-if="isUserLoggedIn" v-model="title"></v-text-field>-->
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
<!--      <v-row>-->
<!--        <v-file-input-->
<!--          v-if="isUserLoggedIn"-->
<!--          accept="image/*"-->
<!--          label="File input"-->
<!--          prepend-icon="mdi-camera"-->
<!--        ></v-file-input>-->
<!--      </v-row>-->
      <v-row>
        <v-col>
        {{ news.description }}
<!--        <v-textarea auto-grow v-if="isUserLoggedIn" v-model="description"></v-textarea>-->
        </v-col>
      </v-row>
      <v-row><v-spacer></v-spacer>
        <v-col>
        <app-edit-news-modal></app-edit-news-modal>
        <v-btn v-if="isUserLoggedIn" class="warning mx-auto" @click="onUpdate"> Удалить </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import

{ Component, Vue, Prop } from 'vue-property-decorator';
import EditNewsModal from './EditNewsModal.vue';

@Component({
  components: {
    appEditNewsModal: EditNewsModal,
  },
})
export default class News extends Vue {
  @Prop(String)
  readonly id!: string;

  get news(): void {
    return this.$store.getters.newsById(this.id);
  }

  get isUserLoggedIn(): boolean {
    return this.$store.getters.isUserLoggedIn;
  }
}
</script>

<style>

</style>
