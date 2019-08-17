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
    <table class="table table-borderless table-sm mb-0" v-else-if="statusObject.statusIndicator === 'loaded'">
      <tbody>
        <tr>
          <td class="table-left-column">试验名称：</td>
          <td class="table-right-column">{{ trialInfoObject.trialName }}</td>
        </tr>
        <tr>
          <td class="table-left-column">当前试验阶段：</td>
          <td class="table-right-column">{{ trialInfoObject.trialStage }}</td>
        </tr>
        <tr>
          <td class="table-left-column">试验简介：</td>
          <td class="table-right-column">{{ trialInfoObject.trialBriefIntroduction }}</td>
        </tr>
        <tr>
          <td class="table-left-column">创建时间：</td>
          <td class="table-right-column">{{ trialInfoObject.trialCreatedTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">预计开始时间：</td>
          <td class="table-right-column">{{ trialInfoObject.trialExpectedStartTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">实际开始时间：</td>
          <td class="table-right-column">{{ trialInfoObject.trialActualStartTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">预计结束时间：</td>
          <td class="table-right-column">{{ trialInfoObject.trialExpectedEndTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">实际结束时间：</td>
          <td class="table-right-column">{{ trialInfoObject.trialActualEndTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">申办方：</td>
          <td class="table-right-column">{{ trialInfoObject.trialSponsor }}</td>
        </tr>
        <tr>
          <td class="table-left-column">研究方：</td>
          <td class="table-right-column">{{ trialInfoObject.trialInvestigator }}</td>
        </tr>
        <tr>
          <td class="table-left-column">监查方：</td>
          <td class="table-right-column">{{ trialInfoObject.trialMonitor }}</td>
        </tr>
        <tr>
          <td class="table-left-column">统计方：</td>
          <td class="table-right-column">{{ trialInfoObject.trialStatistician }}</td>
        </tr>
      </tbody>
    </table>
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
    name: 'trial_info_table',
    props: {
      trialInfoObject: {
        type: Object,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
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
  @media screen and (max-width: 540px) {
    .table-left-column {
      width: 55%;
    }
    .table-right-column {
      width: 40%;
    }
  }
  @media screen and (min-width: 540px) and (max-width: 1140px) {
    .table-left-column {
      width: 25%;
    }
    .table-right-column {
      width: 75%;
    }
  }
  @media screen and (min-width: 1140px) {
    .table-left-column {
      width: 20%;
    }
    .table-right-column {
      width: 80%;
    }
  }
</style>