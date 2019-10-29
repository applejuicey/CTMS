<template>
  <div class="text-left">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-12">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-12">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <template v-for="(task, index) in unreceivedTasksArray">
        <div class="card mb-2">
          <div class="card-header bg-transparent d-flex">
            <b class="text-warning text-ellipsis-sm">
              <i class="fas fa-tasks"></i>&nbsp;
              {{task.taskName}}
            </b>
            <span class="ml-auto">
              <span class="cursor-pointer text-primary cursor-pointer" @click="changeRoute(task.taskID, 'view')">
                <i class="fas fa-search"></i>
                <span class="d-sm-inline d-none">&nbsp;查看</span>
              </span>
              <span class="cursor-pointer text-success cursor-pointer" @click="receiveTask(task.taskID)">
                &nbsp;&nbsp;<i class="fas fa-check"></i>
                <span class="d-sm-inline d-none">&nbsp;接受</span>
              </span>
            </span>
          </div>
          <div class="card-body text-left">
            <ul class="list-unstyled mb-0">
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">试验名称：</span>
                <span>{{task.belongedToTrialName}}</span>
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">任务名称：</span>
                <span>{{task.taskName}}</span>
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">截止时间：</span>
                <span>{{task.taskDueTime}}</span>
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">创建时间：</span>
                <span>{{task.taskCreatedTime}}</span>
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">创建用户：</span>
                <span>{{task.taskCreatorName}}</span>
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">指定用户：</span>
                <span>{{task.taskExecutorName}}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <div class="row" v-else>
      <div class="col-12">
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
    name: 'tasks_inbox_cards',
    props: {
      unreceivedTasksArray: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    data: () => {
      return {

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
        alert(`received${taskID}`)
        // TODO:提供taskID和userID，标记receivedStatus为true
      },
    },
  }
</script>