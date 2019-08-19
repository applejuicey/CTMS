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
    <form v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="form-group text-left">
        <label for="belongedToTrialName" class="font-weight-normal">
          <span>隶属于项目：</span>
        </label>
        <input v-model="formValues.belongedToTrialName" type="text" class="form-control" id="belongedToTrialName" placeholder="隶属于项目" disabled>
      </div>
      <div class="form-group text-left">
        <label for="taskName" class="font-weight-normal">
          <span>任务名称：</span>
        </label>
        <input v-model="formValues.taskName" type="text" class="form-control" id="taskName" placeholder="任务名称">
      </div>
      <div class="form-group text-left">
        <label for="taskDescription" class="font-weight-normal">
          <span>任务描述：</span>
        </label>
        <input v-model="formValues.taskDescription" type="text" class="form-control" id="taskDescription" placeholder="任务描述">
      </div>
      <div class="form-group text-left">
        <label for="taskExecutorName" class="font-weight-normal">
          <span>接受者：</span>
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-outline-success" type="button" @click="openModal">点击选择任务接受者</button>
            <user-list-modal :userList="userList" :statusObject="statusObject4UserListModal" @mountedComplete="setModalID" @selectionMade="changeExecutor"></user-list-modal>
          </div>
          <input v-model="formValues.taskExecutorName" type="text" class="form-control" id="taskExecutorName" placeholder="接受者" disabled>
        </div>
      </div>
      <div class="form-group text-left">
        <label for="taskDueTime" class="font-weight-normal">
          <span>截止时间：</span>
        </label>
        <input v-model="formValues.taskDueTime" type="date" class="form-control" id="taskDueTime" placeholder="截止时间">
      </div>
      <button type="button" class="btn btn-success" @click="updateTask">更新任务信息</button>
    </form>
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
  import UserListModal from '@/components/UserListModal.vue';
  export default {
    name: 'task_edit_form',
    components: {
      UserListModal,
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
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    data: () => {
      return {
        userListModalID: '',
        userList: [],
        statusObject4UserListModal: {},
        formValues: {},
      };
    },
    watch: {
      taskInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            belongedToTrialName: newVal.belongedToTrialName,
            taskName: newVal.taskName,
            taskDescription: newVal.taskDescription,
            taskExecutorID: newVal.taskExecutorID,
            taskExecutorName: newVal.taskExecutorName,
            taskDueTime: this.formatDate(newVal.taskDueTime),
          };
        },
        deep: true,
      },
    },
    methods: {
      formatDate: function (dateString) {
        const parsedDate = new Date(Date.parse(dateString));
        const year = parsedDate.getFullYear();
        let month = parsedDate.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        let date = parsedDate.getDate();
        date = date < 10 ? ('0' + date) : date;
        return `${year}-${month}-${date}`;
      },
      setModalID: function (modalID) {
        this.userListModalID = `#${ modalID }`;
      },
      openModal: function () {
        this.getUserList();
        $(this.userListModalID).modal('show');
      },
      // 根据传入的trialID从服务器获取参加该试验的所有用户的信息
      getUserList: function () {
        this.statusObject4UserListModal = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/userList', {
          params: {
            trialID: this.taskInfoObject.belongedToTrialID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('TaskEditForm获取用户列表成功', response);
          this.userList = response.data.userList;
          this.statusObject4UserListModal = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('TaskEditForm获取用户列表失败，错误：', error);
          this.statusObject4UserListModal = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取用户列表失败，错误原因：${error}`,
          };
        });
      },
      changeExecutor: function (userID, username) {
        this.formValues.taskExecutorName = username;
        this.formValues.taskExecutorID = userID;
      },
      // TODO: 将表格信息POST至服务器
      updateTask: function () {
        console.log(this.formValues)
      },
    },
  }
</script>

<style scoped>
  .list-card {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid #eee;
    border-radius: .25rem;
    border-left-width: .25rem;
    /*border-left-color: #28a745;*/
  }
</style>