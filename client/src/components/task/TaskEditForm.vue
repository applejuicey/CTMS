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
      <div class="form-group text-left" v-if="isAdmin">
        <label class="font-weight-normal">
          <span>隶属于项目：</span>
        </label>
        <project-list-radio :projectList="projectList" :statusObject="statusObject4ProjectListRadio"
                         :selectedProjectIDOriginal="formValues.taskBelongedToProjectID"
                         @selectionChanged="changeFormBelongedToProjectID"></project-list-radio>
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
        <label class="font-weight-normal">
          <span>任务接受者</span>
        </label>
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
      <button type="button" class="btn btn-success" @click="submit">提交</button>
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
  import ProjectListRadio from '@/components/project/ProjectListRadio.vue';
  import UserListRadio from '@/components/user/UserListRadio.vue';
  export default {
    name: 'task_edit_form',
    components: {
      ProjectListRadio,
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
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    data: () => {
      return {
        userList: [],
        statusObject4UserListRadio: {},
        projectList: [],
        statusObject4ProjectListRadio: {},
        formValues: {},
      };
    },
    watch: {
      taskInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            taskBelongedToProjectID: newVal.taskBelongedToProjectID,
            taskBelongedToProjectName: newVal.taskBelongedToProjectName,
            taskName: newVal.taskName,
            taskDescription: newVal.taskDescription,
            taskExecutorID: newVal.taskExecutorID,
            taskExecutorName: newVal.taskExecutorName,
            taskDueTime: this.formatDate(newVal.taskDueTime),
          };
          this.getUserList();
          this.getProjectList();
        },
        deep: true,
      },
    },
    created: function () {
      this.formValues = {
        taskBelongedToProjectID: this.taskInfoObject.taskBelongedToProjectID,
        taskBelongedToProjectName: this.taskInfoObject.taskBelongedToProjectName,
        taskName: this.taskInfoObject.taskName,
        taskDescription: this.taskInfoObject.taskDescription,
        taskExecutorID: this.taskInfoObject.taskExecutorID,
        taskExecutorName: this.taskInfoObject.taskExecutorName,
        taskDueTime: this.formatDate(this.taskInfoObject.taskDueTime),
      };
      this.getUserList();
      this.getProjectList();
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
      getProjectList: function () {
        this.statusObject4ProjectListRadio = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/projects', {
          params: {
            brief: true,
            projectName: '',
            projectInvestigatorName: '',
            projectSponsorName: '',
            projectInvolvedUserRealName: '',
            projectCreatedYearMonth: '',
            projectStage: 'all',
          }
        }).then((response) => {
          if (response.data.response.statusCode === '1') {
            this.projectList = response.data.response.projects;
            this.statusObject4ProjectListRadio = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.response.statusCode === '0') {
            console.error('TaskEditForm获取项目信息失败，错误：', response.data.response.error.message);
            this.statusObject4ProjectListRadio = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取项目列表失败，错误原因：${response.data.response.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskEditForm获取项目信息失败，错误：', error);
          this.statusObject4ProjectListRadio = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取项目列表失败，错误原因：${error}`,
          };
        });
      },
      changeFormTaskExecutorID: function (currentSelection) {
        this.formValues.taskExecutorID = currentSelection;
      },
      changeFormBelongedToProjectID: function (currentSelection) {
        this.formValues.taskBelongedToProjectID = currentSelection;
      },
      // TODO: 将表格信息POST至服务器
      submit: function () {
        console.log(this.formValues)
        // 不要提供projectname，因为不对
      },
    },
  }
</script>

<style scoped>

</style>