import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('./views/Tasks.vue')
    },
    {
      path: '/task/:id',
      name: 'task',
      component: () => import('./views/Task.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue')
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: () => import('./views/Schedules.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('./views/Me.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: 'not_found',
      component: () => import('./views/NotFound.vue')
    },
  ]
})
