<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h3">
            {{ title }}
            <v-text-field v-model="title"></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>
            {{ url }}
            <v-text-field v-model="url"></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-img
          max-height="350"
          max-width="650"
          :src="image"
          class="mx-auto"
        ></v-img>
      </v-row>
      <v-row>
        <v-file-input
          accept="image/*"
          label="File input"
          prepend-icon="mdi-camera"
          @change="onFileChange($event)"
        ></v-file-input>
        <!--        <input type="file" accept="image/*" class="mx-auto py-2">-->
      </v-row>
      <v-row class="subtitle 1">
        {{ description }}
        <v-textarea auto-grow v-model="description"></v-textarea>
      </v-row>
      <v-row>
        <v-btn class="warning mx-auto" @click="createLink"> Добавить </v-btn>
      </v-row>
    </v-container>
  </div>

</template>

<script lang="ts">
// eslint-disable-next-line max-classes-per-file
import

{ Component, Vue } from 'vue-property-decorator';

class AddNewsClass {
  title: string;

  description: string;

  id: string;

  link: string;

  image: string;

  img: any;

  // eslint-disable-next-line max-len
  constructor(title: string, description: string, id: string, link: string, image: string, img: any) {
    this.title = title;
    this.link = link;
    this.description = description;
    this.id = id;
    this.image = image;
    this.img = img;
  }
}

@Component
export default class AddList extends Vue {
  private news = new AddNewsClass('', '', '', '', '', '');

  private title: string = this.news.title;

  private description: string = this.news.description;

  private image: string | ArrayBuffer | null = this.news.image;

  private img = 'null';

  private url = this.news.link;

  private id = this.news.id;

  private onFileChange(event: any): void {
    const file = event.name;
    if (file !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        this.image = reader.result;
        this.img = file;
      };
    }
  }

  private createNews(): void {
    const newNews = {
      title: this.title,
      description: this.description,
      image: this.image,
      link: this.url,
      id: this.id,
    };

    this.$store.dispatch('createNews', newNews)
      .then(() => {
        this.$router.push('/');
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }
}
</script>

<style scoped>
</style>
