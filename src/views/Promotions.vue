<template>
  <Content/>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';
import Content from '@/components/Content.vue';

@Component({
  components: { Content },
})
export default class Promotions extends Vue {
}
</script>

<style>

</style>
