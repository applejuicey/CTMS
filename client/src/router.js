import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Tasks from './views/task/Tasks.vue';
import TaskView from './views/task/TaskView.vue';
import TaskEdit from './views/task/TaskEdit.vue';
import TaskDelete from './views/task/TaskDelete.vue';
import TaskCreate from './views/task/TaskCreate.vue';
import Projects from './views/project/Projects.vue';
import ProjectView from './views/project/ProjectView.vue';
import ProjectEdit from './views/project/ProjectEdit.vue';
import ProjectDelete from './views/project/ProjectDelete.vue';
import ProjectCreate from './views/project/ProjectCreate.vue';
import Users from './views/user/Users.vue';
import UserView from './views/user/UserView.vue';
import UserEdit from './views/user/UserEdit.vue';
import UserDelete from './views/user/UserDelete.vue';
import UserCreate from './views/user/UserCreate.vue';
import Files from './views/file/Files.vue';
import FileView from './views/file/FileView.vue';
import FileEdit from './views/file/FileEdit.vue';
import FileDelete from './views/file/FileDelete.vue';
import FileCreate from './views/file/FileCreate.vue';
import Templates from './views/template/Templates.vue';
import TemplateView from './views/template/TemplateView.vue';
import TemplateEdit from './views/template/TemplateEdit.vue';
import TemplateDelete from './views/template/TemplateDelete.vue';
import TemplateCreate from './views/template/TemplateCreate.vue';

import Me from './views/Me.vue';
import About from './views/About.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/ctms/',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        needAuth: false,
      },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/task/view/:taskID',
      name: 'task_view',
      component: TaskView,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/task/edit/:taskID',
      name: 'task_edit',
      component: TaskEdit,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/task/delete/:taskID',
      name: 'task_delete',
      component: TaskDelete,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/task/create',
      name: 'task_create',
      component: TaskCreate,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/project/view/:projectID',
      name: 'project_view',
      component: ProjectView,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/project/edit/:projectID',
      name: 'project_edit',
      component: ProjectEdit,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/project/delete/:projectID',
      name: 'project_delete',
      component: ProjectDelete,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/project/create',
      name: 'project_create',
      component: ProjectCreate,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/user/view/:userID',
      name: 'user_view',
      component: UserView,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/user/edit/:userID',
      name: 'user_edit',
      component: UserEdit,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/user/delete/:userID',
      name: 'user_delete',
      component: UserDelete,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/user/create',
      name: 'user_create',
      component: UserCreate,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/files',
      name: 'files',
      component: Files,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/file/view/:fileID',
      name: 'file_view',
      component: FileView,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/file/edit/:fileID',
      name: 'file_edit',
      component: FileEdit,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/file/delete/:fileID',
      name: 'file_delete',
      component: FileDelete,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/file/create',
      name: 'file_create',
      component: FileCreate,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/templates',
      name: 'templates',
      component: Templates,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/template/view/:templateID',
      name: 'template_view',
      component: TemplateView,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/template/edit/:templateID',
      name: 'template_edit',
      component: TemplateEdit,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/template/delete/:templateID',
      name: 'template_delete',
      component: TemplateDelete,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/template/create',
      name: 'template_create',
      component: TemplateCreate,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        needAuth: false,
      },
    },
    {
      path: '*',
      name: 'not_found',
      component: NotFound,
      meta: {
        needAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  //根据meta.needAuth判断是否路由过滤
  if (to.matched.some(route => route.meta.needAuth)) {
    //点击的是需要验证的页面
    if (localStorage.getItem('userInfo') !== null) {
      // 验证成功
      next();
    } else {
      // 验证失败
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        path: '/login',
      });
    }
  } else {
    //点击的是不需要验证的页面,则进行正常的路由跳转
    next();
  }
});

export default router;
