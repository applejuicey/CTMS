<template>
  <div id="app" class="container-fluid">
    <top-nav-bar v-if="!showTopNavBar"></top-nav-bar>
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
    computed: {
      showTopNavBar: function () {
        const noTopNavBarRoutes = ['login', 'about'];
        return noTopNavBarRoutes.includes(this.$route.path.split('/')[1]);
      },
    },
  }
</script>

<style>
  #app {
    height: 100%;
  }
</style>
