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
        <v-img
          max-height="350"
          max-width="650"
          :src="image"
          class="mx-auto"
        ></v-img>
      </v-row>
      <v-row>
<!--        <v-file-input-->
<!--          accept="image/*"-->
<!--          label="File input"-->
<!--          prepend-icon="mdi-camera"-->
<!--          @change="onFileChange($event)"-->
<!--          v-model="files"-->
<!--        ></v-file-input>-->
        <input type="file" accept="image/*" class="mx-auto py-2">
      </v-row>
      <v-row class="subtitle 1">
        {{ description }}
        <v-textarea auto-grow v-model="description"></v-textarea>
      </v-row>
      <v-row>
        <v-btn class="warning mx-auto" @click="onFileChange"> Обновить </v-btn>
      </v-row>
    </v-container>
  </div>

</template>

<script lang="ts">
// eslint-disable-next-line max-classes-per-file
import

{ Component, Vue } from 'vue-property-decorator';

class Link {
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
export default class Content extends Vue {
  private linksOb: Link = this.$store.getters.links.find(
    (ob: Link) => ob.link === this.$route.name.toLowerCase(),
  );

  private link = new Link(
    this.linksOb.title,
    this.linksOb.description,
    this.linksOb.id,
    this.linksOb.link,
    this.linksOb.image,
    this.linksOb.img,
  );

  private title: string = this.link.title;

  private description: string = this.link.description;

  private image: string | ArrayBuffer | null = this.link.image;

  private img: any = null;
  //
  // private files: Array<any> = [];

  private onFileChange(event: any): void {
    console.log('files', event.target.files);
    const file = event.target.files[0];
    console.log('files', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.image = reader.result;
    };
    reader.readAsDataURL(file);
    this.img = file;
  }
}
</script>

<style scoped>
</style>
