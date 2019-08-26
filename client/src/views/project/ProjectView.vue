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
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import ProjectInfoTable from '@/components/ProjectInfoTable.vue';
  import TasksInfoTable from '@/components/TasksInfoTable.vue';
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
      // 根据传入的projectID和currentUserID从服务器获取该项目所有任务的信息
      getProjectTasksInfo: function () {
        this.statusObject4ProjectTasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/tasksInfo', {
          params: {
            projectID: this.$route.params.projectID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('Project获取任务信息成功', response);
          this.projectTasksInfoArray = response.data.tasksInfo;
          this.statusObject4ProjectTasks = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Project获取任务信息失败，错误：', error);
          this.statusObject4ProjectTasks = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务文件信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>

<style scoped>

</style>