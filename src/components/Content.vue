/*eslint linebreak-style: ["error", "windows"]*/
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
          :src="image"
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
  private nameIdNew = this.$router;

  private nameId = this.$route.name.toLowerCase();

  private n = this.nameId === undefined ? this.nameIdNew : this.nameId

  private linksOb: Link = this.$store.getters.links.find(
    (ob: Link) => ob.link === this.n,
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

  private img = 'null';

  get isUserLoggedIn(): boolean {
    return this.$store.getters.isUserLoggedIn;
  }

  private onFileChange(event: any): void {
    const file = event.name;
    if (file !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        this.image = reader.result;
        this.img = event;
      };
    }
  }

  private onUpdate(): void {
    if (this.title !== '' && this.description !== '') {
      this.$store.dispatch('updateLink', {
        title: this.title,
        description: this.description,
        id: this.link.id,
        image: this.img,
      });
    }
  }
}
</script>

<style scoped>
</style>
