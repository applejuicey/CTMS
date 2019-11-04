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
          <div class="form-group text-left">
            <label for="username" class="font-weight-normal">
              <span>用户名称：</span>
            </label>
            <input v-model="formValues.username" type="text" class="form-control" id="username" placeholder="用户名称">
          </div>
          <div class="form-group text-left">
            <label for="realName" class="font-weight-normal">
              <span>真实姓名：</span>
            </label>
            <input v-model="formValues.userRealName" type="text" class="form-control" id="realName" placeholder="真实姓名">
          </div>
          <div class="form-group text-left">
            <label for="email" class="font-weight-normal">
              <span>邮箱地址：</span>
            </label>
            <input v-model="formValues.userEmail" type="email" class="form-control" id="email" placeholder="邮箱地址">
          </div>
          <div class="form-group text-left">
            <label for="password" class="font-weight-normal">
              <span>用户密码：</span>
            </label>
            <input v-model="formValues.password" type="password" class="form-control" id="password" placeholder="用户密码">
          </div>
          <div class="form-group text-left">
            <label class="font-weight-normal">
              <span>账户状态：</span>
            </label>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="accountStatus1" value="1" v-model="formValues.userAccountStatus">
              <label class="form-check-label" for="accountStatus1">
                正常
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="accountStatus2" value="2" v-model="formValues.userAccountStatus">
              <label class="form-check-label" for="accountStatus2">
                冻结
              </label>
            </div>
          </div>
          <div class="form-group text-left" v-if="isAdmin && this.$route.path.split('/')[1] !== 'me'">
            <label class="font-weight-normal">参与的项目：</label>
            <project-list-checkbox :projectList="projectList" :statusObject="statusObject4ProjectListCheckbox"
                                   :selectedProjectsIDOriginal="formValues.userInvolvedProjectsID"
                                   @selectionChanged="changeFormInvolvedProjectsID"></project-list-checkbox>
          </div>
          <div class="form-group text-left" v-if="isAdmin && this.$route.path.split('/')[1] !== 'me'">
            <label class="font-weight-normal">可管理的项目：</label>
            <project-list-checkbox :projectList="projectList" :statusObject="statusObject4ProjectListCheckbox"
                                   :selectedProjectsIDOriginal="formValues.userCanManageProjectsID"
                                   @selectionChanged="changeFormCanManageProjectsID"></project-list-checkbox>
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
  import ProjectListCheckbox from '@/components/project/ProjectListCheckbox.vue';
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'user_edit_form',
    components: {
      ProjectListCheckbox,
      CustomModal,
    },
    props: {
      userInfoObject: {
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
        projectList: [],
        statusObject4ProjectListCheckbox: {},
        formValues: {},
        submitLoading: false,
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      };
    },
    watch: {
      userInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            userID: newVal.userID,
            username: newVal.username,
            password: newVal.password,
            userRealName: newVal.userRealName,
            userEmail: newVal.userEmail,
            userAccountStatus: newVal.userAccountStatus,
            userInvolvedProjectsID: newVal.userInvolvedProjectsID,
            userCanManageProjectsID: newVal.userCanManageProjectsID,
          };
          this.getProjectList();
        },
        deep: true,
      },
    },
    created: function () {
      this.formValues = {
        userID: this.userInfoObject.userID || '',
        username: this.userInfoObject.username || '',
        password: this.userInfoObject.password || '',
        userRealName: this.userInfoObject.userRealName || '',
        userEmail: this.userInfoObject.userEmail || '',
        userAccountStatus: this.userInfoObject.userAccountStatus || '1',
        userInvolvedProjectsID: this.userInfoObject.userInvolvedProjectsID || [],
        userCanManageProjectsID: this.userInfoObject.userCanManageProjectsID || [],
      };
      this.getProjectList();
    },
    methods: {
      getProjectList: function () {
        this.statusObject4ProjectListCheckbox = {
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
            this.statusObject4ProjectListCheckbox = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('UserEditForm获取项目信息失败，错误：', response.data.error.message);
            this.statusObject4ProjectListCheckbox = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取项目列表失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('UserEditForm获取项目信息失败，错误：', error);
          this.statusObject4ProjectListCheckbox = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取项目列表失败，错误原因：${error}`,
          };
        });
      },
      changeFormCanManageProjectsID: function (currentSelection) {
        this.formValues.userCanManageProjectsID = currentSelection;
      },
      changeFormInvolvedProjectsID: function (currentSelection) {
        this.formValues.userInvolvedProjectsID = currentSelection;
      },
      submit: function () {
        const submitInfo = {
          userID: this.formValues.userID,
          userEmail: this.formValues.userEmail,
          password: this.formValues.password,
          username: this.formValues.username,
          userRealName: this.formValues.userRealName,
          userAccountStatus: this.formValues.userAccountStatus,
          userLastLoginTime: null,
          userCanManageProjectsID: this.formValues.userCanManageProjectsID,
          userInvolvedProjectsID: this.formValues.userInvolvedProjectsID
        };
        this.submitLoading = true;
        const axiosMethod = this.$route.path.split('/')[2] === 'create'? 'post' : 'put';
        this.$axios({
          method: axiosMethod,
          url: '/user',
          data: submitInfo
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('UserEditForm操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('UserEditForm操作失败，错误：', error);
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