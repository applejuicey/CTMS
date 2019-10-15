<template>
  <div class="row" id="task_view">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>查看任务-{{ $route.params.taskID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <task-info-table :taskInfoObject="taskInfoObject" :statusObject="statusObject4Task"></task-info-table>
              <files-info-table :filesInfoArray="filesInfoArray" :statusObject="statusObject4Files"></files-info-table>
              <user-info-table :userInfoObject="userInfoObject" :statusObject="statusObject4User"></user-info-table>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import TaskInfoTable from '@/components/task/TaskInfoTable.vue';
  import FilesInfoTable from '@/components/file/FilesInfoTable.vue';
  import UserInfoTable from '@/components/user/UserInfoTable.vue';
  export default {
    name: 'task_view',
    components: {
      BottomCard,
      TaskInfoTable,
      FilesInfoTable,
      UserInfoTable,
    },
    data: function () {
      return {
        headerText: '任务资料',
        tooltipText: '该任务的详细资料如下所示。',
        taskInfoObject: {},
        statusObject4Task: {},
        filesInfoArray: [],
        statusObject4Files: {},
        userInfoObject: {},
        statusObject4User: {},
      }
    },
    created: function () {
      this.getTaskInfo();
      this.getTaskFilesInfo();
    },
    methods: {
      getTaskInfo: function () {
        this.statusObject4Task = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/task', {
          params: {
            taskID: this.$route.params.taskID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.taskInfoObject = response.data.task[0];
            this.statusObject4Task = {
              statusIndicator: 'loaded',
            };
            this.getTaskExecutorInfo();
          } else if (response.data.statusCode === '0') {
            console.error('TaskView获取任务信息失败，错误：', response.data.error.message);
            this.statusObject4Task = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskView获取任务信息失败，错误：', error);
          this.statusObject4Task = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
      getTaskFilesInfo: function () {
        this.statusObject4Files = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/file', {
          params: {
            brief: 'false',
            fileBelongedToTaskID: this.$route.params.taskID,
            fileName: '',
            fileBelongedToTaskName: '',
            fileBelongedToProjectName: '',
            fileCreatorName: '',
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.filesInfoArray = response.data.files;
            this.statusObject4Files = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('TaskView获取任务文件信息失败，错误：', response.data.error.message);
            this.statusObject4Files = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务文件信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskView获取任务文件信息失败，错误：', error);
          this.statusObject4Files = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务文件信息失败，错误原因：${error}`,
          };
        });
      },
      getTaskExecutorInfo: function () {
        this.statusObject4User = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/user', {
          params: {
            userID: this.taskInfoObject.taskExecutorID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.userInfoObject = response.data.user[0];
            this.statusObject4User = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('TaskView获取用户信息失败，错误：', response.data.error.message);
            this.statusObject4User = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取用户信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskView获取用户信息失败，错误：', error);
          this.statusObject4User = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取用户信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>