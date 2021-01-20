<template>
  <div>
  <app-content></app-content>
    <v-container>
      <v-row justify="center">
      <yandex-map
        :coords="[54.480882, 26.402114]"
        zoom="18"
        style="width: 1200px; height: 600px;"
        :controls="['trafficControl']"
        map-type="map"
      >
        <ymap-marker
          markerId="1"
          marker-type="placemark"
          :coords="[54.481, 26.402]"
          hint-content="Ювелирная бижутерия"
          :balloon="{header: 'Jenavi', body: 'Магазин аксессуаров', footer: 'Цокольный этаж'}"
          :icon="{color: 'red', glyph: 'shopping'}"
          cluster-name="1"
        ></ymap-marker>
      </yandex-map>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import

{ Component, Vue } from 'vue-property-decorator';
import Content from '@/components/Content.vue';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

@Component({
  components: { appContent: Content, yandexMap, ymapMarker },
})

export default class About extends Vue {
}
</script>

<style>

</style>
