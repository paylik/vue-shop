<template>
  <div>
    <app-content/>
    <app-expansion/>
  </div>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';
import Content from '@/components/Content.vue';
import Expansion from './Expansion.vue';

@Component({
  components: { appContent: Content, appExpansion: Expansion },
})
export default class Products extends Vue {
}
</script>

<style>

</style>
