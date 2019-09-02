<template>
  <div class="list-card">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-xl-6 offset-xl-3">
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
        <table class="table table-bordered text-nowrap">
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
                <span class="cursor-pointer text-primary" @click="changeRoute(taskInfo.taskID, 'view')">
                  <i class="fas fa-search"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-success" @click="changeRoute(taskInfo.taskID, 'edit')" v-if="isAdmin || taskInfo.taskCreatorID === currentUserID">
                  <i class="fas fa-edit"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-danger" @click="changeRoute(taskInfo.taskID, 'delete')" v-if="isAdmin || taskInfo.taskCreatorID === currentUserID">
                  <i class="fas fa-trash"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-success" @click="receiveTask(taskInfo.taskID)" v-if="taskInfo.taskExecutorID === currentUserID && taskInfo.taskReceivedStatus === false">
                  <i class="fas fa-check"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-success" @click="completeTask(taskInfo.taskID)" v-if="taskInfo.taskExecutorID === currentUserID && taskInfo.taskReceivedStatus === true && taskInfo.taskCompletedStatus === false">
                  <i class="fas fa-check-double"></i>&nbsp;
                </span>
              </td>
              <td>{{taskInfo.taskName}}</td>
              <td>{{taskInfo.belongedToTrialName}}</td>
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
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">等待初始化</h4>
          <p>
            正在等待初始化流程执行......
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tasks_info_table',
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
        alert(`received${taskID}`)
        // TODO:提供taskID和userID，标记receivedStatus为true
      },
      completeTask: function (taskID) {
        alert(`completed${taskID}`)
        // TODO:提供taskID和userID，标记taskCompletedStatus为true
      },
    },
  }
</script>

<style scoped>

</style>