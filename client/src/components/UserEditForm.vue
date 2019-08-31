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
        <label for="username" class="font-weight-normal">
          <span>用户名称：</span>
        </label>
        <input v-model="formValues.username" type="text" class="form-control" id="username" placeholder="用户名称">
      </div>
      <div class="form-group text-left">
        <label for="realName" class="font-weight-normal">
          <span>真实姓名：</span>
        </label>
        <input v-model="formValues.realName" type="text" class="form-control" id="realName" placeholder="真实姓名">
      </div>
      <div class="form-group text-left">
        <label for="email" class="font-weight-normal">
          <span>邮箱地址：</span>
        </label>
        <input v-model="formValues.email" type="email" class="form-control" id="email" placeholder="邮箱地址">
      </div>
      <div class="form-group text-left">
        <label class="font-weight-normal">
          <span>账户状态：</span>
        </label>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="accountStatus1" value="1" v-model="formValues.accountStatus">
          <label class="form-check-label" for="accountStatus1">
            正常
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="accountStatus2" value="2" v-model="formValues.accountStatus">
          <label class="form-check-label" for="accountStatus2">
            冻结
          </label>
        </div>
      </div>
      <div class="form-group text-left">
        <label class="font-weight-normal">参与的项目：</label>
        <project-list-checkbox :projectList="projectList" :statusObject="statusObject4ProjectListCheckbox"
                               :selectedProjectsIDOriginal="formValues.involvedProjectsID"
                               @selectionChanged="changeFormInvolvedProjectsID"></project-list-checkbox>
      </div>
      <div class="form-group text-left">
        <label class="font-weight-normal">可管理的项目：</label>
        <project-list-checkbox :projectList="projectList" :statusObject="statusObject4ProjectListCheckbox"
                               :selectedProjectsIDOriginal="formValues.canManageProjectsID"
                               @selectionChanged="changeFormCanManageProjectsID"></project-list-checkbox>
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
  import ProjectListCheckbox from '@/components/ProjectListCheckbox.vue';
  export default {
    name: 'user_edit_form',
    components: {
      ProjectListCheckbox,
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
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    data: () => {
      return {
        projectList: [],
        statusObject4ProjectListCheckbox: {},
        formValues: {
          username: '',
          realName: '',
          email: '',
          accountStatus: '',
          involvedProjectsID: [],
          canManageProjectsID: [],
        },
      };
    },
    watch: {
      userInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            username: newVal.username,
            realName: newVal.realName,
            email: newVal.email,
            accountStatus: newVal.accountStatus,
            involvedProjectsID: newVal.involvedProjectsID,
            canManageProjectsID: newVal.canManageProjectsID,
          };
          this.getProjectList();
        },
        deep: true,
      },
    },
    created: function () {
      this.getProjectList();
    },
    methods: {
      // 根据传入的userID，从服务器获取所有项目的信息
      getProjectList: function () {
        this.statusObject4ProjectListCheckbox = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/projectList', {
          params: {
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('UserEditForm获取项目列表成功', response);
          this.projectList = response.data.projectList;
          this.statusObject4ProjectListCheckbox = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('UserEditForm获取项目列表失败，错误：', error);
          this.statusObject4ProjectListCheckbox = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取项目列表失败，错误原因：${error}`,
          };
        });
      },
      changeFormCanManageProjectsID: function (currentSelection) {
        this.formValues.canManageProjectsID = currentSelection;
      },
      changeFormInvolvedProjectsID: function (currentSelection) {
        this.formValues.involvedProjectsID = currentSelection;
      },
      // TODO: 将表格信息POST至服务器
      submit: function () {
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