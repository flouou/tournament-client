import Vue from 'vue';
import VueRouter from 'vue-router';
import Clubs from '../views/Clubs.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Clubs',
    component: Clubs,
  },
  {
    path: '/groups',
    name: 'Groups',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "groups" */ '../views/Groups.vue'),
  },
  {
    path: '/schedule',
    name: 'Schedule',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
