<template>
  <div class="row mb-5 shadow" id="top_nav_bar">
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
            <li class="nav-item">
              <span class="nav-link" @click="navigate('home')">
                <i class="fas fa-home"></i>&nbsp;主页
              </span>
            </li>
            <li class="nav-item">
              <span class="nav-link" @click="navigate('task')">
                <i class="fas fa-tasks"></i>&nbsp;任务
              </span>
            </li>
            <li class="nav-item" v-if="showProjectLink">
              <span class="nav-link" @click="navigate('project')">
                <i class="fas fa-capsules"></i>&nbsp;项目
              </span>
            </li>
            <li class="nav-item" v-if="showScheduleLink">
              <span class="nav-link" @click="navigate('schedule')">
                <i class="fas fa-clipboard-list"></i>&nbsp;进度
              </span>
            </li>
            <li class="nav-item" v-if="showUserLink">
              <span class="nav-link" @click="navigate('user')">
                <i class="fas fa-users-cog"></i>&nbsp;用户
              </span>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <span class="nav-link" @click="navigate('me')">
                <i class="fas fa-address-card"></i>&nbsp;我
              </span>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                用户切换
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <span class="dropdown-item" @click="lp">LP</span>
                <span class="dropdown-item" @click="wsy">WSY</span>
                <span class="dropdown-item" @click="fy">FY</span>
              </div>
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
        showProjectLink: true,
        showScheduleLink: true,
        showUserLink: true,
      }
    },
    methods: {
      navigate: function (targetPage) {
        const routeMap = new Map()
            .set('home', 'home')
            .set('task', 'task')
            .set('project', 'project')
            .set('schedule', 'schedule')
            .set('user', 'user')
            .set('me', 'me');
        const destinationName = routeMap.get(targetPage);
        this.$router.push({ name: destinationName});
      },
      lp: function () {
        this.showProjectLink = true;
        this.showScheduleLink = true;
        this.showUserLink = true;
      },
      wsy: function () {
        this.showProjectLink = true;
        this.showScheduleLink = true;
        this.showUserLink = true;
      },
      fy: function () {
        this.showProjectLink = false;
        this.showScheduleLink = false;
        this.showUserLink = false;
      },
    },
  }
</script>

<style scoped>
  .shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
  }
</style>

