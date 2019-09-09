<template>
  <div class="row" id="project_view">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>查看项目-{{ $route.params.projectID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <project-info-table :projectInfoObject="projectInfoObject" :statusObject="statusObject4Project"></project-info-table>
              <tasks-info-table :tasksInfoArray="projectTasksInfoArray" :statusObject="statusObject4ProjectTasks"></tasks-info-table>
<!--              TODO：添加项目包含的用户s-->
              <p>添加包含的用户</p>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import ProjectInfoTable from '@/components/project/ProjectInfoTable.vue';
  import TasksInfoTable from '@/components/task/TasksInfoTable.vue';
  export default {
    name: 'task_view',
    components: {
      BottomCard,
      ProjectInfoTable,
      TasksInfoTable,
    },
    data: function () {
      return {
        headerText: '查看项目',
        tooltipText: '该项目的详细资料如下所示。',
        projectInfoObject: {},
        statusObject4Project: {},
        projectTasksInfoArray: [],
        statusObject4ProjectTasks: {},
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
      this.getProjectTasksInfo();
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
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
          if (response.data.response.statusCode === '1') {
            this.projectInfoObject = response.data.response.project;
            this.statusObject4Project = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.response.statusCode === '0') {
            console.error('ProjectCard获取项目信息失败，错误：', response.data.response.error.message);
            this.statusObject4Project = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取项目信息失败，错误原因：${response.data.response.error.message}`,
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
      getProjectTasksInfo: function () {
        this.statusObject4ProjectTasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/tasks', {
          params: {
            brief: false,
            taskName: '',
            projectID: this.$route.params.projectID,
            projectName: '',
            taskExecutorName: '',
            taskReceivedStatus: 'all',
            taskCompletedStatus: 'all',
          }
        }).then((response) => {
          if (response.data.response.statusCode === '1') {
            // console.log('ProjectView获取任务信息成功', response);
            this.projectTasksInfoArray = response.data.response.tasks;
            this.statusObject4ProjectTasks = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.response.statusCode === '0') {
            console.error('ProjectView获取任务信息失败，错误：', response.data.response.error.message);
            this.statusObject4ProjectTasks = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务信息失败，错误原因：${response.data.response.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('ProjectView获取任务信息失败，错误：', error);
          this.statusObject4ProjectTasks = {
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