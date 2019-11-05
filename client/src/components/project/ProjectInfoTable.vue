<template>
  <div class="text-left list-card">
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
      <div class="d-flex mb-2">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          项目资料：
        </span>
        <div class="btn-group ml-auto">
          <button type="button" class="btn btn-success" @click="changeRoute(projectInfoObject.projectID, 'edit')" v-if="isAdmin || projectInfoObject.projectManagerID === currentUserID">
            <i class="fas fa-edit"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑项目</span>
          </button>
          <button type="button" class="btn btn-success" @click="createTask(projectInfoObject.projectID)" v-if="isAdmin || projectInfoObject.projectManagerID === currentUserID">
            <i class="fas fa-plus"></i>
            <span class="d-sm-inline d-none">&nbsp;新建任务</span>
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
            <td class="table-right-column">{{ projectInfoObject.projectStage|projectStageFilter }}</td>
          </tr>
          <tr>
            <td class="table-left-column">项目经理：</td>
            <td class="table-right-column">{{ projectInfoObject.projectManagerRealName }}（{{ projectInfoObject.projectManagerName }}）</td>
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
          <tr v-if="isAdmin">
            <td class="table-left-column">备注1：</td>
            <td class="table-right-column">{{ projectInfoObject.projectComment1 }}</td>
          </tr>
          <tr v-if="isAdmin">
            <td class="table-left-column">备注2：</td>
            <td class="table-right-column">{{ projectInfoObject.projectComment2 }}</td>
          </tr>
          <tr v-if="isAdmin">
            <td class="table-left-column">备注3：</td>
            <td class="table-right-column">{{ projectInfoObject.projectComment3 }}</td>
          </tr>
          <tr v-if="isAdmin">
            <td class="table-left-column">备注4：</td>
            <td class="table-right-column">{{ projectInfoObject.projectComment4 }}</td>
          </tr>
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
    filters: {
      projectStageFilter: function (projectStage) {
        const projectStageMap = new Map();
        projectStageMap.set('1', '准备阶段')
            .set('2', '进行阶段')
            .set('3', '收尾阶段')
            .set('4', '发补阶段');
        return projectStageMap.get(projectStage);
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