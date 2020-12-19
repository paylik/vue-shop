<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h3">
            {{ title }}
            <v-text-field v-if="isUserLoggedIn" v-model="title"></v-text-field>
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
        <v-file-input
          v-if="isUserLoggedIn"
          accept="image/*"
          label="File input"
          prepend-icon="mdi-camera"
          @change="onFileChange($event)"
        ></v-file-input>
        <!--        <input type="file" accept="image/*" class="mx-auto py-2">-->
      </v-row>
      <v-row class="subtitle 1">
        {{ description }}
        <v-textarea auto-grow v-if="isUserLoggedIn" v-model="description"></v-textarea>
      </v-row>
      <v-row>
        <v-btn v-if="isUserLoggedIn" class="warning mx-auto" @click="onUpdate"> Обновить </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import

{ Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class News extends Vue {
  @Prop(String)
  readonly id!: string;

  news(): void {
    return this.$store.getters.newsById(this.id);
  }
}
</script>

<style>

</style>
