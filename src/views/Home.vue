<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <v-carousel cycle>
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="scroll-x-reverse-transition"
              transition="scroll-x-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="news in newsList" :key="news.title">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-img
              :src="news.image"
              height="200px"
            ></v-img>

            <v-card-title>
              {{ news.title }}
            </v-card-title>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
                :to="'/news/' + news.id"
              >
                Подробнее
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  {{
                    news.description
                  }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private items: Array<object> = [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ]

  private show = false

  private newsList: Array<object> = this.$store.getters.newsList
}
</script>
