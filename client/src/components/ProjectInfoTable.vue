<template>
  <div class="text-left list-card">
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
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          项目资料：
        </span>
        <div class="btn-group ml-auto">
          <button type="button" class="btn btn-success" @click="changeRoute(projectInfoObject.projectID, 'edit')" v-if="isAdmin || projectInfoObject.projectManagerID === currentUserID">
            <i class="fas fa-pen"></i>&nbsp;编辑项目
          </button>
          <button type="button" class="btn btn-success" @click="createTask(projectInfoObject.projectID)" v-if="isAdmin || projectInfoObject.projectManagerID === currentUserID">
            <i class="fas fa-plus"></i>&nbsp;新建任务
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless table-sm text-nowrap mb-0">
          <tbody>
          <tr>
            <td class="table-left-column">项目名称：</td>
            <td class="table-right-column">{{ projectInfoObject.projectName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">项目描述：</td>
            <td class="table-right-column">{{ projectInfoObject.projectBriefIntroduction }}</td>
          </tr>
          <tr>
            <td class="table-left-column">项目当前阶段：</td>
            <td class="table-right-column">{{ projectInfoObject.projectStage }}</td>
          </tr>
          <tr>
            <td class="table-left-column">项目经理：</td>
            <td class="table-right-column">{{ projectInfoObject.projectManagerName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">创建时间：</td>
            <td class="table-right-column">{{ projectInfoObject.projectCreatedTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">预计开始时间：</td>
            <td class="table-right-column">{{ projectInfoObject.projectExpectedStartTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">实际开始时间：</td>
            <td class="table-right-column">{{ projectInfoObject.projectActualStartTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">预计结束时间：</td>
            <td class="table-right-column">{{ projectInfoObject.projectExpectedEndTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">实际结束时间：</td>
            <td class="table-right-column">{{ projectInfoObject.projectActualEndTime }}</td>
          </tr>
          <tr>
            <td class="table-left-column">申办方：</td>
            <td class="table-right-column">{{ projectInfoObject.projectSponsor }}</td>
          </tr>
          <tr>
            <td class="table-left-column">研究方：</td>
            <td class="table-right-column">{{ projectInfoObject.projectInvestigator }}</td>
          </tr>
          <tr>
            <td class="table-left-column">监查方：</td>
            <td class="table-right-column">{{ projectInfoObject.projectMonitor }}</td>
          </tr>
          <tr>
            <td class="table-left-column">统计方：</td>
            <td class="table-right-column">{{ projectInfoObject.projectStatistician }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  export default {
    name: 'project_info_table',
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
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    methods: {
      changeRoute: function (projectID, identifier) {
        this.$router.push({
          name: `project_${identifier}`,
          params: {
            projectID: projectID,
          },
        });
      },
      createTask: function (projectID) {
        this.$router.push({
          name: 'task_create',
          params: {
            projectID: projectID,
          },
        });
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
  .table-left-column {
    font-weight: 400;
    text-align: right;
  }
  .table-right-column {
    text-align: left;
  }
</style>