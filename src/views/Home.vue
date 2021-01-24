<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <v-col cols="2" class="d-none d-lg-block">
          <v-img src="http://shop.nbacademy.ru/img/logo-jenavi-smorgon-3.png"></v-img>
        </v-col>
        <v-col cols="12" lg="8">
          <div class="logo_time">
            <h2>ТОРГОВЫЙ ОБЪЕКТ 'ЖЕНАВИ' </h2>
            <h3>РЕЖИМ РАБОТЫ: <br>пн-пт 10<sup>00</sup>-20<sup>00</sup>,
              сб-вс 10<sup>00</sup>-19<sup>00</sup>,
              перерыв 14<sup>00</sup>-15<sup>00</sup></h3>
            <p>Директор Ольга Николаевна +375-29-782-33-37 (мтс) </p></div>
        </v-col>
        <v-col cols="1" class="d-none d-lg-block">
          <v-img src="http://shop.nbacademy.ru/img/Swarovski-logo.jpg"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-none d-md-block">
          <v-carousel cycle>
            <v-carousel-item
              v-for="news in newsList"
              :key="news.id"
              :src="news.image"
              reverse-transition="scroll-x-reverse-transition"
              transition="scroll-x-transition"
            >
              <div class="news-link float-right">
                <v-btn class="error" :to="'/news/' + news.id">{{ news.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="news in newsList" :key="news.title" class="col-lg-4">
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
                  {{ news.description.slice(0, 30) }}...
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
import { NewsClass } from '@/store/news';

@Component
export default class Home extends Vue {
  private show = false

  private newsList: Array<NewsClass> = this.$store.getters.newsList
}
</script>
