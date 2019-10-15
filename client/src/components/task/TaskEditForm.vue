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
    <div class="row" v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="col-12">
        <form>
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
            <label for="taskProgress" class="font-weight-normal">
              <span>任务进度：</span>
            </label>
            <input v-model="formValues.taskProgress" type="text" class="form-control" id="taskProgress" placeholder="任务进度">
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
          <button type="button" class="btn btn-success" @click="submit" :disabled="submitLoading">
            <i class="fas fa-check"></i>&nbsp;提交
          </button>
        </form>
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
  import ProjectListRadio from '@/components/project/ProjectListRadio.vue';
  import UserListRadio from '@/components/user/UserListRadio.vue';
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'task_edit_form',
    components: {
      ProjectListRadio,
      UserListRadio,
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
    computed: {
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
        submitLoading: false,
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
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
            taskProgress: newVal.taskProgress,
          };
          this.getProjectList();
          this.getUserList();
        },
        deep: true,
      },
    },
    created: function () {
      this.formValues = {
        taskBelongedToProjectID: this.taskInfoObject.taskBelongedToProjectID || null,
        taskName: this.taskInfoObject.taskName || '',
        taskDescription: this.taskInfoObject.taskDescription || '',
        taskExecutorID: this.taskInfoObject.taskExecutorID || null,
        taskDueTime: this.formatDate(this.taskInfoObject.taskDueTime || new Date()),
        taskProgress:  this.taskInfoObject.taskProgress || 0,
      };
      this.getProjectList();
      this.getUserList();
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
      getProjectList: function () {
        this.statusObject4ProjectListRadio = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/project', {
          params: {
            brief: true,
            projectName: '',
            projectInvestigatorName: '',
            projectSponsorName: '',
            projectInvolvedUserRealName: '',
            projectCreatedYearMonth: '',
            projectStage: '',
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.projectList = response.data.projects;
            this.statusObject4ProjectListRadio = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('TaskEditForm获取项目信息失败，错误：', response.data.error.message);
            this.statusObject4ProjectListRadio = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取项目列表失败，错误原因：${response.data.error.message}`,
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
      getUserList: function () {
        this.statusObject4UserListRadio = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/user', {
          params: {
            brief: false,
            userRealName: '',
            userInvolvedProjectID: this.taskInfoObject.taskBelongedToProjectID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.userList = response.data.users;
            this.statusObject4UserListRadio = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('TaskEditForm获取用户列表失败，错误：', response.data.error.message);
            this.statusObject4UserListRadio = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取用户列表失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
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
      changeFormBelongedToProjectID: function (currentSelection) {
        this.formValues.taskBelongedToProjectID = currentSelection;
      },
      submit: function () {
        const submitInfo = {
          taskBelongedToProjectID: this.formValues.taskBelongedToProjectID,
          taskName: this.formValues.taskName,
          taskDescription: this.formValues.taskDescription,
          taskExecutorID: this.formValues.taskExecutorID,
          taskDueTime: this.formValues.taskDueTime,
          taskProgress: this.formValues.taskProgress,
        };
        this.submitLoading = true;
        const axiosMethod = this.$route.path.split('/')[2] === 'create'? 'post' : 'put';
        this.$axios({
          method: axiosMethod,
          url: '/task',
          data: submitInfo
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'tasks';
          } else if (response.data.statusCode === '0') {
            console.error('TaskEditForm操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskEditForm操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          this.submitLoading = false;
          $('#customModal').modal('show');
        });
      },
    },
  }
</script>