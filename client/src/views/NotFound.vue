<template>
  <div class="row align-items-center" id="not_found">
    <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
      <div class="alert alert-danger">
        <h4 class="alert-heading">该页面不存在</h4>
        <p>您访问的页面不存在，请检查您的操作。如果所有操作正确，希望您可以向我们反映该情况。</p>
        <hr>
        <button class="btn btn-primary" @click="toHome">
          回到主页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'not_found',
    methods: {
      toHome: function () {
        this.$router.push({
          name: 'home',
        });
      },
    },
  }
</script>

<style scoped>
  #not_found {
    height: 90vh;
  }
</style>