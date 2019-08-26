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
        <label for="belongedToProjectName" class="font-weight-normal">
          <span>隶属于项目：</span>
        </label>
          <input v-model="formValues.belongedToProjectName" type="text" class="form-control" id="belongedToProjectName" placeholder="隶属于项目" disabled>
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
        <label class="font-weight-normal">任务接受者</label>
        <user-list-radio :userList="userList" :statusObject="statusObject4UserListRadio"
                            :selectedUserIDOriginal="formValues.taskExecutorID"
                            @selectionChanged="changeFormTaskExecutorID"></user-list-radio>
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
  import UserListRadio from '@/components/UserListRadio.vue';
  export default {
    name: 'task_edit_form',
    components: {
      UserListRadio,
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
        userList: [],
        statusObject4UserListRadio: {},
        formValues: {},
      };
    },
    watch: {
      taskInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            belongedToProjectName: newVal.belongedToProjectName,
            taskName: newVal.taskName,
            taskDescription: newVal.taskDescription,
            taskExecutorID: newVal.taskExecutorID,
            taskExecutorName: newVal.taskExecutorName,
            taskDueTime: this.formatDate(newVal.taskDueTime),
          };
          this.getUserList();
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
      // 根据传入的projectID从服务器获取参加该试验的所有用户的信息
      getUserList: function () {
        this.statusObject4UserListRadio = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/userList', {
          params: {
            projectID: this.taskInfoObject.belongedToProjectID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('TaskEditForm获取用户列表成功', response);
          this.userList = response.data.userList;
          this.statusObject4UserListRadio = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('TaskEditForm获取用户列表失败，错误：', error);
          this.statusObject4UserListRadio = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取用户列表失败，错误原因：${error}`,
          };
        });
      },
      changeFormTaskExecutorID: function (currentSelection) {
        this.formValues.taskExecutorID = currentSelection;
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