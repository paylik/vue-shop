/*eslint linebreak-style: ["error", "windows"]*/
<template>
  <div>
    <v-container>
      <v-form v-model="valid" ref="form" validation>
      <v-row>
        <v-col>
          <div class="text-h3">
            {{ title }}
            <v-text-field
              v-model="title"
              name="title"
              label="Добавить заглавие"
              required
              :rules="[(v) => !!v || 'Имя не определено']"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-img
          max-height="350"
          max-width="650"
          :src="newImage"
          class="mx-auto"
        ></v-img>
      </v-row>
      <v-row>
        <v-file-input
          accept="image/*"
          type="file"
          label="File input"
          prepend-icon="mdi-camera"
          @change="onFileChange"
        ></v-file-input>
      </v-row>
      <v-row class="subtitle 1">
        {{ description }}
        <v-textarea
          auto-grow
          v-model="description"
          label="Добавить описание"
          type="text"
          multiline
          counter="300"
          required
          :rules="[(v) => !!v || 'Описание не задано']"
        ></v-textarea>
      </v-row>
      <v-row>
        <v-btn
          class="warning mx-auto"
          @click="createNews"
          :loading="loading"
          :disabled="!valid || loading"
        > Добавить </v-btn>
      </v-row>
      </v-form>
    </v-container>
  </div>

</template>

<script lang="ts">

import

{ Component, Vue } from 'vue-property-decorator';

import { NewsClass } from '../store/news';

@Component
export default class AddNews extends Vue {
  private news = new NewsClass('', '', null, '');

  private title: string = this.news.title;

  private description: string = this.news.description;

  private image: File | null = this.news.image;

  private id: string = this.news.id;

  private valid = false;

  private onFileChange(event: any): void {
    if (event !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        this.image = event;
        this.newImage = reader.result;
      };
    }
  }

  private createNews(): void {
    const newNews = {
      title: this.title,
      description: this.description,
      image: this.image,
    };

    this.$store.dispatch('createNews', newNews)
      .then(() => {
        this.$router.push('/');
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }

  get loading(): boolean {
    return this.$store.getters.loading;
  }
}
</script>

<style scoped>
</style>
