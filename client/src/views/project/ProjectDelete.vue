<template>
  <div class="row" id="project_delete">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>删除项目-{{ $route.params.projectID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>

              <div class="row">
                <div class="col-xl-6 offset-xl-3">
                  <div class="alert alert-danger">
                    <h4 class="alert-heading">请确认您的操作！</h4>
                    <p>当您再三确认后，点击下方的按钮以删除该项目！</p>
                    <hr>
                    <button class="btn btn-danger">删除项目</button>
                  </div>
                </div>
              </div>

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
    name: 'project_delete',
    components: {
      BottomCard,
    },
    data: function () {
      return {
        headerText: '删除项目',
        tooltipText: '请确认您的操作！',
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