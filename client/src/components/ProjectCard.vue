<template>
  <div class="card mb-2" @mouseover="addHover($event)" @mouseout="removeHover($event)">
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
  import ProjectInfoTable from '@/components/ProjectInfoTable.vue';
  import TasksInfoTable from '@/components/TasksInfoTable.vue';
  export default {
    name: 'project_card',
    components: {
      ProjectInfoTable,
      TasksInfoTable,
    },
    props: {
      projectID: {
        type: String,
        required: true,
      },
      projectName: {
        type: String,
        required: true,
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
    computed: {
      collapseID: function () {
        return `#collapse${ this.projectID }`;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        });
        // 绑定事件：展开时从服务器获取项目信息，传入子组件ProjectInfoTable
        // 绑定事件：展开时从服务器获取任务信息，传入子组件TaskInfoTable
        $(this.collapseID).on('shown.bs.collapse', () => {
          this.getProjectInfo();
          this.getTasksInfo();
        })
      })
    },
    methods: {
      addHover: function (event) {
        event.currentTarget.className = 'card mb-2 shadow hover-vibrate';
      },
      removeHover: function (event) {
        event.currentTarget.className = 'card mb-2';
      },
      toggleCollapse: function (projectID) {
        const clickedCollapseID = `#collapse${projectID}`;
        $(clickedCollapseID).collapse('toggle');
      },
      // 根据传入的projectID和currentUserID从服务器获取试验信息
      getProjectInfo: function () {
        this.statusObject4Project = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/projectInfo', {
          params: {
            projectID: this.projectID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('ProjectCard获取项目信息成功', response);
          this.projectInfoObject = response.data.projectInfo;
          this.statusObject4Project = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('ProjectCard获取项目信息失败，错误：', error);
          this.statusObject4Project = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取项目信息失败，错误原因：${error}`,
          };
        });
      },
      // 根据传入的trialID和currentUserID从服务器获取该试验内的、与该用户有关的所有任务信息
      getTasksInfo: function () {
        this.statusObject4Tasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/tasksInfo', {
          params: {
            trialID: this.trialID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('ProjectCard获取任务信息成功', response);
          this.tasksInfoArray = response.data.tasksInfo;
          this.statusObject4Tasks = {
            statusIndicator: 'loaded',
          };
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

<style scoped>

</style>