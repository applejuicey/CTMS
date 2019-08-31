<template>
  <div class="row mb-4 shadow" id="top_nav_bar">
    <div class="col-12">
      <nav class="navbar navbar-expand-md navbar-light bg-warning">
        <span class="navbar-brand">
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
              <span class="nav-link" @click="navigate('tasks')">
                <i class="fas fa-tasks"></i>&nbsp;任务
              </span>
            </li>
            <li class="nav-item cursor-pointer">
              <span class="nav-link" @click="navigate('projects')">
                <i class="fas fa-capsules"></i>&nbsp;项目
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
    </div>
  </div>
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
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    methods: {
      navigate: function (targetPage) {
        const routeMap = new Map()
            .set('home', 'home')
            .set('tasks', 'tasks')
            .set('projects', 'projects')
            .set('users', 'users')
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

<style scoped>
  .shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>

