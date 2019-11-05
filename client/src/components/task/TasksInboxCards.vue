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
            <b class="text-success text-ellipsis-sm">
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
                <span class="font-weight-normal">项目名称：</span>
                <span>{{task.taskBelongedToProjectName}}</span>
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
                <span>{{task.taskCreatorRealName}}（{{task.taskCreatorName}}）</span>
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                <span class="font-weight-normal">指定用户：</span>
                <span>{{task.taskExecutorRealName}}（{{task.taskExecutorName}}）</span>
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
    <custom-modal :modalHeader="modalHeader" :responseMessage="responseMessage" :modalButtonTarget="modalButtonTarget"></custom-modal>
  </div>
</template>

<script>
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'tasks_inbox_cards',
    components: {
      CustomModal,
    },
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
            console.error('TasksInboxCards操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TasksInboxCards操作失败，错误：', error);
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