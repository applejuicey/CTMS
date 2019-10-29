<template>
  <div class="card mb-2">
    <div class="card-header bg-transparent d-flex">
      <b class="cursor-pointer text-primary text-ellipsis-sm" @click="toggleCollapse(projectID)" data-toggle="tooltip" data-placement="top" :title="projectNameTipText">
        <i class="fas fa-capsules"></i>&nbsp;
        {{ projectName }}&nbsp;
        <i class="fas fa-hand-point-left"></i>&nbsp;
      </b>
      <span class="ml-auto">
        <span class="cursor-pointer text-primary" @click="changeRoute(projectID, 'view')">
          <i class="fas fa-search"></i>
          <span class="d-sm-inline d-none">&nbsp;查看项目信息</span>
        </span>
      </span>
    </div>
    <div :id="`collapse${projectID}`" class="card-body collapse">
      <project-info-table :projectInfoObject="projectInfoObject" :statusObject="statusObject4Project"></project-info-table>
      <tasks-info-table :tasksInfoArray="tasksInfoArray" :statusObject="statusObject4Tasks"></tasks-info-table>
    </div>
  </div>
</template>

<script>
  import ProjectInfoTable from '@/components/project/ProjectInfoTable.vue';
  import TasksInfoTable from '@/components/task/TasksInfoTable.vue';
  export default {
    name: 'project_card',
    components: {
      ProjectInfoTable,
      TasksInfoTable,
    },
    props: {
      projectID: {
        type: Number,
        required: true,
      },
      projectName: {
        type: String,
        required: true,
      },
    },
    computed: {
      collapseID: function () {
        return `#collapse${ this.projectID }`;
      },
    },
    data: function () {
      return {
        projectNameTipText: '点击项目名称可以展示或隐藏项目内容。',
        projectInfoObject: {},
        statusObject4Project: {},
        tasksInfoArray: [],
        statusObject4Tasks: {},
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        // 绑定事件：展开时从服务器获取项目信息，传入子组件ProjectInfoTable
        // 绑定事件：展开时从服务器获取任务信息，传入子组件TaskInfoTable
        $(this.collapseID).on('shown.bs.collapse', () => {
          this.getProjectInfo();
          this.getTasksInfo();
        });
      })
    },
    methods: {
      toggleCollapse: function (projectID) {
        const clickedCollapseID = `#collapse${projectID}`;
        $(clickedCollapseID).collapse('toggle');
      },
      getProjectInfo: function () {
        this.statusObject4Project = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/project', {
          params: {
            projectID: this.projectID,
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
      getTasksInfo: function () {
        this.statusObject4Tasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/task', {
          params: {
            brief: false,
            taskName: '',
            projectID: this.projectID,
            projectName: '',
            taskExecutorName: '',
            taskReceivedStatus: 'all',
            taskCompletedStatus: 'all',
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            // console.log('ProjectCard获取任务信息成功', response);
            this.tasksInfoArray = response.data.tasks;
            this.statusObject4Tasks = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('ProjectCard获取任务信息失败，错误：', response.data.error.message);
            this.statusObject4Tasks = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('ProjectCard获取任务信息失败，错误：', error);
          this.statusObject4Tasks = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
      changeRoute: function (projectID, identifier) {
        this.$router.push({
          name: `project_${identifier}`,
          params: {
            projectID: projectID,
          },
        });
      },
    },
  }
</script>