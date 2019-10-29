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
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2" v-if="$route.path.split('/')[1] !== 'projects'">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          项目：
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-nowrap">
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
            <tr>
              <td>
                <span>&ensp;</span>
                <span class="cursor-pointer text-primary d-inline" @click="changeRoute(projectInfo.projectID, 'view')">
                  <i class="fas fa-search"></i>
                  <span>&ensp;</span>
                </span>
                <span class="cursor-pointer text-success d-inline" @click="changeRoute(projectInfo.projectID, 'edit')" v-if="isAdmin || currentUserID === projectInfo.projectManagerID">
                  <i class="fas fa-edit"></i>
                  <span>&ensp;</span>
                </span>
                <span class="cursor-pointer text-danger d-inline" @click="changeRoute(projectInfo.projectID, 'delete')" v-if="isAdmin || currentUserID === projectInfo.projectManagerID">
                  <i class="fas fa-trash"></i>
                  <span>&ensp;</span>
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
      changeRoute: function (projectID, identifier) {
        this.$router.push({
          name: `project_${identifier}`,
          params: {
            projectID: projectID,
          },
        });
      },
    },
  }
</script>