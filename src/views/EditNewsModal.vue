<template>
  <v-dialog
    v-model="modal"
    persistent
    max-width="500px"
  >
    <v-btn
      color="primary"
      dark
      slot="activator"
      class="mx-auto"
    >
      Редактировать
    </v-btn>
  </v-dialog>
</template>

<script lang="ts">
import

{ Vue } from 'vue-property-decorator';

export default class EditNewsModal extends Vue {
  private modal = false;
}

</script>
