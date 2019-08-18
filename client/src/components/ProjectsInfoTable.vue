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
    <div class="table-responsive" v-else-if="statusObject.statusIndicator === 'loaded'">
      <table class="table table-bordered text-nowrap">
        <tbody>
        <tr>
          <td>操作</td>
          <td>项目名称</td>
          <td>项目当前阶段</td>
          <td>创建时间</td>
          <td>预计开始时间</td>
          <td>实际开始时间</td>
          <td>预计结束时间</td>
          <td>实际结束时间</td>
          <td>申办方</td>
          <td>研究方</td>
          <td>监查方</td>
          <td>统计方</td>
        </tr>
        <template v-for="(projectInfo, index) in projectsInfoArray">
          <tr >
            <td>
                <span class="cursor-pointer text-primary" @click="toProjectPage(projectInfo.projectID, 'view')">
                  <i class="fas fa-search"></i>&nbsp;
                </span>
              <span class="cursor-pointer text-success" @click="toProjectPage(projectInfo.projectID, 'edit')" v-if="isAdmin">
                  <i class="fas fa-edit"></i>&nbsp;
                </span>
              <span class="cursor-pointer text-danger" @click="toProjectPage(projectInfo.projectID, 'delete')" v-if="isAdmin">
                  <i class="fas fa-trash"></i>&nbsp;
                </span>
            </td>
            <td>{{projectInfo.projectName}}</td>
            <td>{{projectInfo.projectStage}}</td>
            <td>{{projectInfo.projectCreatedTime}}</td>
            <td>{{projectInfo.projectExpectedStartTime}}</td>
            <td>{{projectInfo.projectActualStartTime}}</td>
            <td>{{projectInfo.projectExpectedEndTime}}</td>
            <td>{{projectInfo.projectActualEndTime}}</td>
            <td>{{projectInfo.projectSponsor}}</td>
            <td>{{projectInfo.projectInvestigator}}</td>
            <td>{{projectInfo.projectMonitor}}</td>
            <td>{{projectInfo.projectStatistician}}</td>
          </tr>
        </template>
        </tbody>
      </table>
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
    name: 'projects_info_table',
    props: {
      projectsInfoArray: {
        type: Array,
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
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    methods: {
      toProjectPage: function (projectID, identifier) {
        this.$router.push({
          name: 'project',
          params: {
            projectID: projectID,
            functionName: identifier,
          },
        });
      },
    },
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
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