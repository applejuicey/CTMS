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
          <td class="table-left-column">任务名称：</td>
          <td class="table-right-column">{{ taskInfoObject.taskName }}</td>
        </tr>
        <tr>
          <td class="table-left-column">任务描述：</td>
          <td class="table-right-column">{{ taskInfoObject.taskDescription }}</td>
        </tr>
        <tr>
          <td class="table-left-column">隶属于：</td>
          <td class="table-right-column">{{ taskInfoObject.belongedToTrialName }}</td>
        </tr>
        <tr>
          <td class="table-left-column">创建者：</td>
          <td class="table-right-column">{{ taskInfoObject.taskCreatorName }}</td>
        </tr>
        <tr>
          <td class="table-left-column">创建时间：</td>
          <td class="table-right-column">{{ taskInfoObject.taskCreatedTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">接受者：</td>
          <td class="table-right-column">{{ taskInfoObject.taskExecutorName }}</td>
        </tr>
        <tr>
          <td class="table-left-column">接受状态：</td>
          <td class="table-right-column">{{ taskInfoObject.taskReceivedStatus }}</td>
        </tr>
        <tr>
          <td class="table-left-column">截止时间：</td>
          <td class="table-right-column">{{ taskInfoObject.taskDueTime }}</td>
        </tr>
        <tr>
          <td class="table-left-column">任务进度：</td>
          <td class="table-right-column">{{ taskInfoObject.taskProgress }}</td>
        </tr>
        <tr>
          <td class="table-left-column">完成状态：</td>
          <td class="table-right-column">{{ taskInfoObject.taskCompletedStatus }}</td>
        </tr>
        <tr>
          <td class="table-left-column">实际完成时间：</td>
          <td class="table-right-column">{{ taskInfoObject.taskActualCompletedTime }}</td>
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
    name: 'task_info_table',
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