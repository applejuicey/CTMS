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
        <label for="projectName" class="font-weight-normal">
          <span>项目名称：</span>
        </label>
        <input v-model="formValues.projectName" type="text" class="form-control" id="projectName" placeholder="项目名称">
      </div>
      <div class="form-group text-left">
        <label for="projectBriefIntroduction" class="font-weight-normal">
          <span>项目简要描述：</span>
        </label>
        <input v-model="formValues.projectBriefIntroduction" type="text" class="form-control" id="projectBriefIntroduction" placeholder="项目简要描述">
      </div>
      <div class="form-group text-left">
        <label for="projectExpectedStartTime" class="font-weight-normal">
          <span>预计开始时间：</span>
        </label>
        <input v-model="formValues.projectExpectedStartTime" type="date" class="form-control" id="projectExpectedStartTime" placeholder="预计开始时间">
      </div>
      <div class="form-group text-left">
        <label for="projectExpectedEndTime" class="font-weight-normal">
          <span>预计结束时间：</span>
        </label>
        <input v-model="formValues.projectExpectedEndTime" type="date" class="form-control" id="projectExpectedEndTime" placeholder="预计结束时间">
      </div>
      <div class="form-group text-left">
        <label for="projectSponsor" class="font-weight-normal">
          <span>申办方：</span>
        </label>
        <input v-model="formValues.projectSponsor" type="text" class="form-control" id="projectSponsor" placeholder="申办方">
      </div>
      <div class="form-group text-left">
        <label for="projectInvestigator" class="font-weight-normal">
          <span>研究方：</span>
        </label>
        <input v-model="formValues.projectInvestigator" type="text" class="form-control" id="projectInvestigator" placeholder="研究方">
      </div>
      <div class="form-group text-left">
        <label for="projectMonitor" class="font-weight-normal">
          <span>监查方：</span>
        </label>
        <input v-model="formValues.projectMonitor" type="text" class="form-control" id="projectMonitor" placeholder="监查方">
      </div>
      <div class="form-group text-left">
        <label for="projectStatistician" class="font-weight-normal">
          <span>统计方：</span>
        </label>
        <input v-model="formValues.projectStatistician" type="text" class="form-control" id="projectStatistician" placeholder="统计方">
      </div>
      <div class="form-group text-left">
        <label class="font-weight-normal">
          <span>项目当前阶段：</span>
        </label>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="projectStage1" value="1" v-model="formValues.projectStage">
          <label class="form-check-label" for="projectStage1">
            准备阶段
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="projectStage2" value="2" v-model="formValues.projectStage">
          <label class="form-check-label" for="projectStage2">
            进行阶段
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="projectStage3" value="3" v-model="formValues.projectStage">
          <label class="form-check-label" for="projectStage3">
            收尾阶段
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="projectStage4" value="4" v-model="formValues.projectStage">
          <label class="form-check-label" for="projectStage4">
            补发阶段
          </label>
        </div>
      </div>
      <div class="form-group text-left">
        <label class="font-weight-normal">项目参与人员</label>
        <user-list-checkbox :userList="userList" :statusObject="statusObject4UserListCheckbox"
                            :selectedUsersIDOriginal="formValues.projectInvolvedUsersID"
                            @selectionChanged="changeFormInvolvedUsersID"></user-list-checkbox>
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
  import UserListCheckbox from '@/components/UserListCheckbox.vue';
  export default {
    name: 'project_edit_form',
    components: {
      UserListCheckbox,
    },
    props: {
      projectInfoObject: {
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
        formValues: {},
        getUserListIconTooltipText: '点击以获取参与该项目的所有用户。',
        showGetUserListIcon: true,
        statusObject4UserListCheckbox: {},
      };
    },
    watch: {
      projectInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            projectName: newVal.projectName,
            projectBriefIntroduction: newVal.projectBriefIntroduction,
            projectExpectedStartTime: this.formatDate(newVal.projectExpectedStartTime),
            projectExpectedEndTime: this.formatDate(newVal.projectExpectedEndTime),
            projectSponsor: newVal.projectSponsor,
            projectInvestigator: newVal.projectInvestigator,
            projectMonitor: newVal.projectMonitor,
            projectStatistician: newVal.projectStatistician,
            projectStage: newVal.projectStage,
            projectInvolvedUsersID: newVal.projectInvolvedUsersID,
            // projectInvolvedUsersName: newVal.projectInvolvedUsersName,
          };
          this.getUserList();
        },
        deep: true,
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      })
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
      // 根据传入的userID\projectManagerID，从服务器获取除了该userID和管理员projectManagerID外，所有其他用户的信息
      getUserList: function () {
        this.statusObject4UserListCheckbox = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/userList', {
          params: {
            projectManagerID: this.projectInfoObject.projectManagerID,
            userID: this.currentUserID,
            projectID: this.projectInfoObject.projectID,
          }
        }).then((response) => {
          console.log('ProjectEditForm获取用户列表成功', response);
          this.userList = response.data.userList;
          this.showGetUserListIcon = false;
          this.statusObject4UserListCheckbox = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('ProjectEditForm获取用户列表失败，错误：', error);
          this.statusObject4UserListCheckbox = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
      changeFormInvolvedUsersID: function (currentSelection) {
        this.formValues.projectInvolvedUsersID = currentSelection;
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
  .cursor-pointer {
    cursor: pointer;
  }
</style>