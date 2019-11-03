<template>
  <div class="list-card">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2" v-if="$route.path.split('/')[1] !== 'tasks'">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          项目任务：
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-nowrap">
          <tbody>
          <tr>
            <td>操作</td>
            <td>任务名称</td>
            <td>隶属于</td>
            <td>创建者</td>
            <td>创建时间</td>
            <td>接受者</td>
            <td>接受状态</td>
            <td>截止时间</td>
            <td>任务进度</td>
            <td>完成状态</td>
            <td>实际完成时间</td>
          </tr>
          <template v-for="(taskInfo, index) in tasksInfoArray">
            <tr>
              <td>
                <span>&ensp;</span>
                <span class="cursor-pointer text-primary" @click="changeRoute(taskInfo.taskID, 'view')">
                  <i class="fas fa-search"></i>
                  <span>&ensp;</span>
                </span>
                <span class="cursor-pointer text-success" @click="changeRoute(taskInfo.taskID, 'edit')" v-if="isAdmin || taskInfo.taskCreatorID === currentUserID">
                  <i class="fas fa-edit"></i>
                  <span>&ensp;</span>
                </span>
                <span class="cursor-pointer text-danger" @click="changeRoute(taskInfo.taskID, 'delete')" v-if="isAdmin || taskInfo.taskCreatorID === currentUserID">
                  <i class="fas fa-trash"></i>
                  <span>&ensp;</span>
                </span>
                <span class="cursor-pointer text-success" @click="receiveTask(taskInfo.taskID)" v-if="taskInfo.taskExecutorID === currentUserID && taskInfo.taskReceivedStatus === '0'">
                  <i class="fas fa-check"></i>
                  <span>&ensp;</span>
                </span>
                <span class="cursor-pointer text-success" @click="completeTask(taskInfo.taskID)" v-if="taskInfo.taskExecutorID === currentUserID && taskInfo.taskReceivedStatus === '1' && taskInfo.taskCompletedStatus === '0'">
                  <i class="fas fa-check-double"></i>
                  <span>&ensp;</span>
                </span>
              </td>
              <td>{{taskInfo.taskName}}</td>
              <td>{{taskInfo.taskBelongedToProjectName}}</td>
              <td>{{taskInfo.taskCreatorName}}</td>
              <td>{{taskInfo.taskCreatedTime}}</td>
              <td>{{taskInfo.taskExecutorName}}</td>
              <td>{{taskInfo.taskReceivedStatus}}</td>
              <td>{{taskInfo.taskDueTime}}</td>
              <td>{{taskInfo.taskProgress}}</td>
              <td>{{taskInfo.taskCompletedStatus}}</td>
              <td>{{taskInfo.taskActualCompletedTime}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">等待初始化</h4>
          <p>
            正在等待初始化流程执行......
          </p>
        </div>
      </div>
    </div>
    <custom-modal :modalHeader="modalHeader" :responseMessage="responseMessage" :modalButtonTarget="modalButtonTarget"></custom-modal>
  </div>
</template>

<script>
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'tasks_info_table',
    components: {
      CustomModal,
    },
    props: {
      tasksInfoArray: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    data: () => {
      return {
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      };
    },
    methods: {
      changeRoute: function (taskID, identifier) {
        this.$router.push({
          name: `task_${identifier}`,
          params: {
            taskID: taskID,
          },
        });
      },
      receiveTask: function (taskID) {
        const submitInfo = {
          taskID: taskID,
          taskReceivedStatus: '1',
        };
        this.$axios({
          method: 'put',
          url: '/task',
          data: submitInfo
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('TasksInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TasksInfoTable操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          $('#customModal').modal('show');
        });
      },
      completeTask: function (taskID) {
        const submitInfo = {
          taskID: taskID,
          taskCompletedStatus: '1',
        };
        this.$axios({
          method: 'put',
          url: '/task',
          data: submitInfo
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('TasksInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TasksInfoTable操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          $('#customModal').modal('show');
        });
      },
    },
  }
</script>