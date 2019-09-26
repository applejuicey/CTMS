<template>
  <div id="app" class="height-100-percentage">
    <top-nav-bar v-if="!showTopNavBar"></top-nav-bar>
    <div v-else>&nbsp;</div>
    <div class="container-fluid mt-3">
      <router-view/>
    </div>
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

<style scoped>
  .container-fluid {
    height: 80%;
  }
</style>