import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/cert',
    name: 'cert',
    component: () => import('../views/Cert.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/promotions',
    name: 'promotions',
    component: () => import('../views/Promotions.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/add',
    name: 'addNews',
    component: () => import('../views/AddNews.vue'),
  },
  {
    path: '/news/:id',
    props: true,
    name: 'news',
    component: () => import('@/views/News.vue'),
  },
  {
    path: '/*',
    name: 'e404',
    component: () => import('../views/E404.vue'),
  },
  {
    path: '/news/*',
    name: 'e404',
    component: () => import('../views/E404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
