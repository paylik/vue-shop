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
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          :src="image"
        ></v-img>
      </v-row>
      <v-row>
        <v-file-input
          accept="image/*"
          label="File input"
          prepend-icon="mdi-camera"
          @change="onFileChange"
        ></v-file-input>
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
import { Component, Vue } from 'vue-property-decorator';

class Link {
  title: string;

  description: string;

  id: string;

  link: string;

  image: string;

  constructor(title: string, description: string, id: string, link: string, image: string) {
    this.title = title;
    this.link = link;
    this.description = description;
    this.id = id;
    this.image = image;
  }
}

@Component
export default class Content extends Vue {
  private linksOb: any = this.$store.getters.links[1];

  private link = new Link(
    this.linksOb.title,
    this.linksOb.description,
    this.linksOb.id,
    this.linksOb.link,
    this.linksOb.image,
  );

  private title: string = this.link.title;

  private description: string = this.link.description;

  private image: string | ArrayBuffer | null = this.link.image;

  private img: any = null;

  private onFileChange({ event }: { event: any }): void {
    const file = event.target.files[0];
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
