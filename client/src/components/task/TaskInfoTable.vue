<template>
  <div class="text-left list-card">
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
      <div class="d-flex mb-2">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          任务资料：
        </span>
        <div class="btn-group ml-auto">
          <button type="button" class="btn btn-success"  @click="changeRoute(taskInfoObject.taskID, 'edit')" v-if="isAdmin || taskInfoObject.taskCreatorID === currentUserID">
            <i class="fas fa-edit"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑任务</span>
          </button>
          <button type="button" class="btn btn-success" @click="createFile(taskInfoObject.taskID, taskInfoObject.taskName)" v-if="isAdmin || taskInfoObject.taskExecutorID === currentUserID">
            <i class="fas fa-plus"></i>
            <span class="d-sm-inline d-none">&nbsp;新建文件</span>
          </button>
          <button type="button" class="btn btn-success" @click="receiveTask(taskInfoObject.taskID)" v-if="taskInfoObject.taskExecutorID === currentUserID && taskInfoObject.taskReceivedStatus === '0'">
            <i class="fas fa-check"></i>
            <span class="d-sm-inline d-none">&nbsp;接受任务</span>
          </button>
          <button type="button" class="btn btn-success" @click="completeTask(taskInfoObject.taskID)" v-if="taskInfoObject.taskExecutorID === currentUserID && taskInfoObject.taskReceivedStatus === '1' && taskInfoObject.taskCompletedStatus === '0'">
            <i class="fas fa-check-double"></i>
            <span class="d-sm-inline d-none">&nbsp;完成任务</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless table-sm text-nowrap mb-0">
          <tbody>
          <tr>
            <td class="table-left-column">任务名称：</td>
            <td class="table-right-column">{{ taskInfoObject.taskName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">任务描述：</td>
            <td class="table-right-column">{{ taskInfoObject.taskDescription }}</td>
          </tr>
          <tr>
            <td class="table-left-column">隶属于：</td>
            <td class="table-right-column">{{ taskInfoObject.taskBelongedToProjectName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">创建者：</td>
            <td class="table-right-column">{{ taskInfoObject.taskCreatorRealName }}（{{ taskInfoObject.taskCreatorName }}）</td>
          </tr>
          <tr>
            <td class="table-left-column">创建时间：</td>
            <td class="table-right-column">{{ taskInfoObject.taskCreatedTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">接受者：</td>
            <td class="table-right-column">{{ taskInfoObject.taskExecutorRealName }}（{{ taskInfoObject.taskExecutorName }}）</td>
          </tr>
          <tr>
            <td class="table-left-column">接受状态：</td>
            <td class="table-right-column">{{ taskInfoObject.taskReceivedStatus|taskReceivedStatusFilter }}</td>
          </tr>
          <tr>
            <td class="table-left-column">截止时间：</td>
            <td class="table-right-column">{{ taskInfoObject.taskDueTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">任务进度：</td>
            <td class="table-right-column">{{ taskInfoObject.taskProgress }}</td>
          </tr>
          <tr>
            <td class="table-left-column">完成状态：</td>
            <td class="table-right-column">{{ taskInfoObject.taskCompletedStatus|taskCompletedStatusFilter }}</td>
          </tr>
          <tr>
            <td class="table-left-column">实际完成时间：</td>
            <td class="table-right-column">{{ taskInfoObject.taskActualCompletedTime }}</td>
          </tr>
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
    name: 'task_info_table',
    components: {
      CustomModal,
    },
    props: {
      taskInfoObject: {
        type: Object,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      };
    },
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    filters: {
      taskReceivedStatusFilter: function (taskReceivedStatus) {
        const taskReceivedStatusMap = new Map();
        taskReceivedStatusMap.set('0', '未接受')
            .set('1', '已接受');
        return taskReceivedStatusMap.get(taskReceivedStatus);
      },
      taskCompletedStatusFilter: function (taskCompletedStatus) {
        const taskCompletedStatusMap = new Map();
        taskCompletedStatusMap.set('0', '未完成')
            .set('1', '已完成');
        return taskCompletedStatusMap.get(taskCompletedStatus);
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
      createFile: function (taskID, taskName) {
        this.$router.push({
          name: 'file_create',
          params: {
            taskID: taskID,
            taskName: taskName,
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
            console.error('TaskInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskInfoTable操作失败，错误：', error);
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
            console.error('TaskInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskInfoTable操作失败，错误：', error);
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