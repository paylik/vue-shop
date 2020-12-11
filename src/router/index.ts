import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/cert',
    name: 'Cert',
    component: () => import('../views/Cert.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: () => import('../views/Promotions.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/add',
    name: 'AddNews',
    component: () => import('../views/AddNews.vue'),
  },
  {
    path: '/news/:id',
    props: true,
    name: 'New',
    component: () => import('../views/News.vue'),
  },
  {
    path: '/*',
    name: 'E404',
    component: () => import('../views/E404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
