<template>
  <div class="row" id="user_view">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>查看用户-{{ $route.params.userID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="userInfoHeaderText" :cardTooltipText="userInfoTooltipText">
            <template v-slot:card-body>

            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  export default {
    name: 'user_view',
    components: {
      BottomCard,
    },
    data: function () {
      return {
        userInfoHeaderText: '用户资料',
        userInfoTooltipText: '该用户的资料如下所示。',
      }
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {

    },
  }
</script>

<style scoped>

</style>