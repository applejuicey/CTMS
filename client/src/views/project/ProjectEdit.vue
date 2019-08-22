<template>
  <div class="row" id="project_edit">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>编辑项目-{{ $route.params.projectID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <project-edit-form :projectInfoObject="projectInfoObject" :statusObject="statusObject4Project"></project-edit-form>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import ProjectEditForm from '@/components/ProjectEditForm.vue';
  export default {
    name: 'project_edit',
    components: {
      BottomCard,
      ProjectEditForm,
    },
    data: function () {
      return {
        headerText: '编辑项目',
        tooltipText: '您可以在下方修改该项目并提交至服务器。',
        projectInfoObject: {},
        statusObject4Project: {},
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
    created: function () {
      this.getProjectInfo();
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      // 根据传入的projectID和currentUserID从服务器获取该项目的信息
      getProjectInfo: function () {
        this.statusObject4Project = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/projectInfo', {
          params: {
            projectID: this.$route.params.projectID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('Project获取项目信息成功', response);
          this.projectInfoObject = response.data.projectInfo;
          this.statusObject4Project = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Project获取项目信息失败，错误：', error);
          this.statusObject4Project = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>

<style scoped>

</style>