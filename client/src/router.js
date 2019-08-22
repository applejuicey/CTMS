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
      component: () => import('./views/task/Tasks.vue')
    },
    {
      path: '/task/view/:taskID',
      name: 'task_view',
      component: () => import('./views/task/TaskView.vue'),
    },
    {
      path: '/task/edit/:taskID',
      name: 'task_edit',
      component: () => import('./views/task/TaskEdit.vue'),
    },
    {
      path: '/task/delete/:taskID',
      name: 'task_delete',
      component: () => import('./views/task/TaskDelete.vue'),
    },
    {
      path: '/task/create',
      name: 'task_create',
      component: () => import('./views/task/TaskCreate.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/project/Projects.vue')
    },
    {
      path: '/project/view/:projectID',
      name: 'project_view',
      component: () => import('./views/project/ProjectView.vue'),
    },
    {
      path: '/project/edit/:projectID',
      name: 'project_edit',
      component: () => import('./views/project/ProjectEdit.vue'),
    },
    {
      path: '/project/delete/:projectID',
      name: 'project_delete',
      component: () => import('./views/project/ProjectDelete.vue'),
    },
    {
      path: '/project/create',
      name: 'project_create',
      component: () => import('./views/project/ProjectCreate.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/user/Users.vue'),
    },
    {
      path: '/user/view/:userID',
      name: 'user_view',
      component: () => import('./views/user/UserView.vue'),
    },
    {
      path: '/user/edit/:userID',
      name: 'user_edit',
      component: () => import('./views/user/UserEdit.vue'),
    },
    {
      path: '/user/delete/:userID',
      name: 'user_delete',
      component: () => import('./views/user/UserDelete.vue'),
    },
    {
      path: '/user/create',
      name: 'user_create',
      component: () => import('./views/user/UserCreate.vue'),
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
