<template>
  <div class="row" id="project_edit">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>编辑项目-{{ $route.params.projectID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
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
  import ProjectEditForm from '@/components/project/ProjectEditForm.vue';
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
    created: function () {
      this.getProjectInfo();
    },
    methods: {
      getProjectInfo: function () {
        this.statusObject4Project = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/project', {
          params: {
            projectID: this.$route.params.projectID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.projectInfoObject = response.data.project[0];
            this.statusObject4Project = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('ProjectCard获取项目信息失败，错误：', response.data.error.message);
            this.statusObject4Project = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取项目信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('ProjectCard获取项目信息失败，错误：', error);
          this.statusObject4Project = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取项目信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>