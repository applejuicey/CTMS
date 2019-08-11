<template>
  <div id="app" class="container-fluid">
    <top-nav-bar></top-nav-bar>
    <router-view/>
  </div>
</template>

<script>
  import TopNavBar from '@/components/TopNavBar.vue';
  export default {
    name: 'app',
    components: {
      TopNavBar
    },
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
    text-align: center;
  }
  b {
    font-weight: 500;
  }
</style>
