/*eslint linebreak-style: ["error", "windows"]*/
<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="590"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Редактировать
      </v-btn>
    </template>
    <v-card v-model="valid" validation>
      <v-card-title class="headline">
        <v-text-field
          v-model="editedTitle"
          name="title"
          label="Заголовок"
          type="text"
          :rules="[(v) => !!v || 'Заглавие не задано']"
        ></v-text-field>
      </v-card-title>
      <v-card-text><v-img
        max-height="150"
        max-width="350"
        :src="editedImage"
        class="mx-auto"
      ></v-img>
        <v-row>
          <v-file-input
            accept="image/*"
            label="File input"
            prepend-icon="mdi-camera"
            @change="onFileChange($event)"
          ></v-file-input>
        </v-row>
        <v-row>
          <v-textarea
            auto-grow
            v-model="editedDescription"
            name="description"
            label="Описание"
            type="text"
            :rules="[(v) => !!v || 'Заглавие не задано']"
            multiline
          ></v-textarea>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="onSave"
          :disabled="!valid"
        >
          Сохранить
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="onCancel"
        >
          Отменить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import

{ Vue, Component, Prop } from 'vue-property-decorator';
import { AddNewsClass } from '@/views/AddNews.vue';

@Component
export default class EditNewsModal extends Vue {
  @Prop(AddNewsClass)
  private news: AddNewsClass;

  private valid = false;

  private dialog = false;

  private editedTitle = this.news.title;

  private editedDescription = this.news.description;

  private editedImage = this.news.image;

  private editFile = this.news.img;

  private onFileChange(event: any): void {
    const file = event.name;
    if (file !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        this.editFile = event;
        this.editedImage = reader.result;
      };
    }
  }

  private onSave(): void {
    this.$store.dispatch('updateNews', {
      title: this.editedTitle,
      description: this.editedDescription,
      image: this.editedImage,
      id: this.news.id,
    });

    this.dialog = false;
  }

  private onCancel(): void {
    this.dialog = false;
    this.editedDescription = this.news.description;
    this.editedImage = this.news.image;
    this.editedTitle = this.news.title;
  }
}

</script>
