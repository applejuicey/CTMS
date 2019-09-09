<template>
  <div class="row" id="task_view">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>查看任务-{{ $route.params.taskID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <task-info-table :taskInfoObject="taskInfoObject" :statusObject="statusObject4Task"></task-info-table>
              <file-info-table :taskFiles="taskFiles" :statusObject="statusObject4TaskFiles"></file-info-table>
              <p>添加任务执行用户的资料</p>
              <!--              TODO：添加任务执行用户的资料-->
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
  import FileInfoTable from '@/components/file/FileInfoTable.vue';
  export default {
    name: 'task_view',
    components: {
      BottomCard,
      TaskInfoTable,
      FileInfoTable,
    },
    data: function () {
      return {
        headerText: '任务资料',
        tooltipText: '该任务的详细资料如下所示。',
        taskInfoObject: {},
        statusObject4Task: {},
        taskFiles: [],
        statusObject4TaskFiles: {},
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
      this.getTaskInfo();
      this.getTaskFilesInfo();
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
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
          if (response.data.response.statusCode === '1') {
            this.taskInfoObject = response.data.response.task;
            this.statusObject4Task = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.response.statusCode === '0') {
            console.error('TaskView获取任务信息失败，错误：', response.data.response.error.message);
            this.statusObject4Task = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务信息失败，错误原因：${response.data.response.error.message}`,
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
      // 根据传入的taskID和currentUserID从服务器获取该任务有关文件的信息
      getTaskFilesInfo: function () {
        this.statusObject4TaskFiles = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/taskFilesInfo', {
          params: {
            taskID: this.$route.params.taskID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('Task获取任务文件信息成功', response);
          this.taskFiles = response.data.taskFiles;
          this.statusObject4TaskFiles = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Task获取任务文件信息失败，错误：', error);
          this.statusObject4TaskFiles = {
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