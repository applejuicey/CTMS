<template>
  <nav class="navbar navbar-expand-md sticky-top bg-warning">
    <span class="navbar-brand cursor-default">
      <i class="fas fa-cog"></i>&nbsp;项目管理系统
    </span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('home')">
                <i class="fas fa-home"></i>&nbsp;主页
              </span>
        </li>
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('projects')">
                <i class="fas fa-capsules"></i>&nbsp;项目
              </span>
        </li>
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('tasks')">
                <i class="fas fa-tasks"></i>&nbsp;任务
              </span>
        </li>
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('files')">
               <i class="fas fa-file-alt"></i>&nbsp;文件
              </span>
        </li>
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('templates')">
               <i class="fas fa-folder-open"></i>&nbsp;模板
              </span>
        </li>
        <li class="nav-item cursor-pointer" v-if="isAdmin">
              <span class="nav-link" @click="navigate('users')">
                <i class="fas fa-users-cog"></i>&nbsp;用户
              </span>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('me')">
                <i class="fas fa-address-card"></i>&nbsp;我
              </span>
        </li>
        <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="logout">
                <i class="fas fa-sign-out-alt"></i>&nbsp;注销
              </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'top_nav_bar',
    data: () => {
      return {

      }
    },
    computed: {

      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin || false;
      },
    },
    methods: {
      navigate: function (targetPage) {
        const routeMap = new Map()
            .set('home', 'home')
            .set('tasks', 'tasks')
            .set('projects', 'projects')
            .set('users', 'users')
            .set('files', 'files')
            .set('templates', 'templates')
            .set('me', 'me');
        const destinationName = routeMap.get(targetPage);
        this.$router.push({ name: destinationName});
      },
      logout: function () {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        this.$router.push({
          name: 'login',
        });
      },
    },
  }
</script>

