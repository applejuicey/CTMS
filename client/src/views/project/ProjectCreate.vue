<template>
  <div class="row" id="project_create">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>创建新项目</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
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
    name: 'project_create',
    components: {
      BottomCard,
    },
    data: function () {
      return {
        headerText: '创建新项目',
        tooltipText: '您可以在下方填写新项目的资料并提交至服务器！',
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