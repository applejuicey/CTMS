<template>
  <div class="row" id="home">

    <div>
      开发：
      <button @click="admin">ADMIN</button>
      <button @click="user">USER</button>
    </div>

    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>用户名-工作面板</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 mb-2">
          <div class="card border-warning shadow">
            <div class="card-header border-warning bg-transparent d-flex">
              <strong class="ml-auto">
                尚未接受的任务
              </strong>
              <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="taskInboxTipText">
                <i class="fas fa-question-circle"></i>
              </span>
            </div>
            <div class="card-body">
              <template v-for="(task, index) in unReceivedTasks">
                <div class="card mb-2 shadow">
                  <div class="card-header bg-transparent d-flex">
                    <strong class="text-warning">
                      <i class="fas fa-tasks"></i>&nbsp;
                      {{task.taskName}}
                    </strong>
                    <span class="ml-auto">
                      <span class="cursor-pointer text-primary">
                         <i class="fas fa-search"></i>&nbsp;查看
                      </span>
                      <span class="cursor-pointer text-success" v-if="!isAdmin">
                         &nbsp;&nbsp;<i class="fas fa-check"></i>&nbsp;接受
                      </span>
                    </span>
                  </div>
                  <div class="card-body text-left">
                    <ul class="list-unstyled mb-0">
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>试验名称：</strong>
                        <span>{{task.belongedToTrialName}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>任务名称：</strong>
                        <span>{{task.taskName}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>截止时间：</strong>
                        <span>{{task.dueTime}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>任务执行：</strong>
                        <span>{{task.executorName}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>任务描述：</strong>
                        <span>{{task.taskDescription}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>创建时间：</strong>
                        <span>{{task.createdTime}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>是否接受：</strong>
                        <span>{{task.executorReceived}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-9 mb-2">
          <div class="card border-success shadow">
            <div class="card-header border-success bg-transparent d-flex">
              <strong class="ml-auto">
                参与的临床试验项目及项目内任务
              </strong>
              <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="involvedTrialsTipText">
                <i class="fas fa-question-circle"></i>
              </span>
            </div>
            <div class="card-body">
              <template v-for="(trial, index) in involvedTrials">
                <div class="card mb-2 shadow">
                  <div class="card-header bg-transparent d-flex">
                    <strong class="cursor-pointer" @click="toggleCollapse($event)" :id="index" data-toggle="tooltip" data-placement="top" :title="trialNameTipText">
                      <i class="fas fa-capsules"></i>&nbsp;
                      {{trial.trialName}}
                    </strong>
                    <span class="ml-auto">
                      <span class="cursor-pointer text-primary">
                        <i class="fas fa-search"></i>&nbsp;查看详细信息
                      </span>
                    </span>
                  </div>
                  <div :id="`collapse${index}`" class="collapse show" name="collapse">
                    <div class="card-body">
                      <div class="text-left">
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>试验信息：</strong>
                      </div>
                      <div class="text-left list-card">
                        <table class="table table-borderless table-sm">
                          <tbody>
                            <tr>
                              <td class="table-left-column">试验名称：</td>
                              <td class="table-right-column">{{trial.trialName}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">当前试验阶段：</td>
                              <td class="table-right-column">{{trial.trialCurrentStage}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">试验简介：</td>
                              <td class="table-right-column">{{trial.trialBriefSummary}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">创建时间：</td>
                              <td class="table-right-column">{{trial.trialCreatedTime}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">预计开始时间：</td>
                              <td class="table-right-column">{{trial.trialExpectedStartTime}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">实际开始时间：</td>
                              <td class="table-right-column">{{trial.trialActualStartTime}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">预计结束时间：</td>
                              <td class="table-right-column">{{trial.trialExpectedEndTime}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">实际结束时间：</td>
                              <td class="table-right-column">{{trial.trialActualEndTime}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">申办方：</td>
                              <td class="table-right-column">{{trial.trialSponsor}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">研究方：</td>
                              <td class="table-right-column">{{trial.trialInvestigator}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">监查方：</td>
                              <td class="table-right-column">{{trial.trialMonitor}}</td>
                            </tr>
                            <tr>
                              <td class="table-left-column">统计方：</td>
                              <td class="table-right-column">{{trial.trialStatistician}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="text-left mb-3">
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <strong>试验内任务：</strong>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-bordered table-sm">
                          <tbody>
                            <tr>
                              <td>操作</td>
                              <td>任务名称</td>
                              <td>创建者</td>
                              <td>创建时间</td>
                              <td>接受者</td>
                              <td>接受状态</td>
                              <td>截止时间</td>
                              <td>任务进度</td>
                              <td>完成状态</td>
                              <td>实际完成时间</td>
                            </tr>
                            <template v-for="(task, index1) in trial.involvedTasks">
                              <tr>
                                <td>
                                  <span class="cursor-pointer text-primary">
                                    <i class="fas fa-search"></i>&nbsp;
                                  </span>
                                  <span class="cursor-pointer text-success" v-if="isAdmin">
                                    <i class="fas fa-edit"></i>&nbsp;
                                  </span>
                                  <span class="cursor-pointer text-danger" v-if="isAdmin">
                                    <i class="fas fa-trash"></i>&nbsp;
                                  </span>
                                </td>
                                <td>{{task.taskName}}</td>
                                <td>{{task.taskCreator}}</td>
                                <td>{{task.taskCreatedTime}}</td>
                                <td>{{task.taskExecutor}}</td>
                                <td>{{task.taskReceivedStatus}}</td>
                                <td>{{task.taskDueTime}}</td>
                                <td>{{task.taskProgress}}</td>
                                <td>{{task.taskCompletedStatus}}</td>
                                <td>{{task.taskActualCompletedTime}}</td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  data: () => {
    return {
      isAdmin: false,
      taskInboxTipText: '这里列出所有尚未接受的任务。',
      involvedTrialsTipText: '这里列出您当前参加的所有临床试验项目及项目内任务。',
      trialNameTipText: '点击项目名称可以展示或隐藏项目内容。',
      unReceivedTasks: [
        {
          taskID: 'TASK001',
          taskName: '写DMP',
          taskDescription: '请在王诗远的指导下完成数据管理计划。请在王诗远的指导下完成数据管理计划。',
          belongedToTrialID: 'TRIAL001',
          belongedToTrialName: 'EV71-III期',
          executorID: 'USER001',
          executorName: '范扬',
          createdTime: '2019-08-08',
          dueTime: '2019-09-01',
          executorReceived: '否',
          progressPercentage: 0,
        },
        {
          taskID: 'TASK002',
          taskName: '现场编盲',
          taskDescription: '编盲地点：上海-静安区。',
          belongedToTrialID: 'TRIAL002',
          belongedToTrialName: '狂犬疫苗-II期',
          executorID: 'USER001',
          executorName: '范扬',
          createdTime: '2019-08-09',
          dueTime: '2019-09-25',
          executorReceived: '否',
          progressPercentage: 0,
        },
      ],
      involvedTrials: [
        {
          trialID: 'TRIAL001',
          trialName: 'EV71-II期',
          trialCurrentStage: '准备阶段',
          trialCreatedTime: '2019-08-08',
          trialExpectedStartTime: '2020-09-01',
          trialActualStartTime: '',
          trialExpectedEndTime: '2021-01-01',
          trialActualEndTime: '',
          trialBriefSummary: '本研究为单中心、随机双盲、阳性对照设计临床试验，用于评价深圳康泰生物制品股份有限公司和北京民海生物科技有限公司联合研制的重组肠道病毒71型疫苗（汉逊酵母）在中国2月龄至71月龄健康人群中的免疫程序、剂量和安全性剂量、免疫原性和安全性。',
          trialSponsor: '北京民海生物科技有限公司',
          trialInvestigator: '江苏省疾病预防控制中心',
          trialMonitor: '南京桑瑞斯',
          trialStatistician: '东南大学公共卫生学院卫生统计教研室',
          involvedTasks: [
            {
              taskName: '写DMP',
              taskCreator: '刘沛',
              taskCreatedTime: '2019-08-08',
              taskExecutor: '范扬',
              taskReceivedStatus: '否',
              taskDueTime: '2019-09-01',
              taskProgress: '0',
              taskCompletedStatus: '否',
              taskActualCompletedTime: '',
            },
            {
              taskName: 'EDC建库',
              taskCreator: '刘沛',
              taskCreatedTime: '2019-08-09',
              taskExecutor: '范扬',
              taskReceivedStatus: '否',
              taskDueTime: '2019-10-01',
              taskProgress: '0',
              taskCompletedStatus: '否',
              taskActualCompletedTime: '',
            },
          ],
        },
        {
          trialID: 'TRIAL002',
          trialName: '狂犬疫苗5针',
          trialCurrentStage: '进行阶段',
          trialCreatedTime: '2019-08-08',
          trialExpectedStartTime: '2019-08-09',
          trialActualStartTime: '2019-08-09',
          trialExpectedEndTime: '2020-01-01',
          trialActualEndTime: '',
          trialBriefSummary: '北京民海生物科技有限公司研制的冻干人用狂犬病疫苗（人二倍体细胞），用于预防狂犬病，申请药品注册。经国家食品药品监督管理局审查，符合药品注册的有关规定，以2017L00332号《药物临床试验批件》批准对该制品进行临床试验。受临床试验申报者委托，江苏省疾病预防控制中心为临床试验研究负责单位，对该制品进行临床试验，以评价其应用于10～60岁健康人群的安全性和免疫原性。',
          trialSponsor: '北京民海生物科技有限公司',
          trialInvestigator: '江苏省疾病预防控制中心',
          trialMonitor: '南京桑瑞斯',
          trialStatistician: '东南大学公共卫生学院卫生统计教研室',
          involvedTasks: [
            {
              taskName: '盲底材料准备',
              taskCreator: '刘沛',
              taskCreatedTime: '2019-08-07',
              taskExecutor: '范扬',
              taskReceivedStatus: '否',
              taskDueTime: '2020-01-01',
              taskProgress: '0',
              taskCompletedStatus: '否',
              taskActualCompletedTime: '',
            },
            {
              taskName: '现场编盲',
              taskCreator: '刘沛',
              taskCreatedTime: '2019-08-07',
              taskExecutor: '范扬',
              taskReceivedStatus: '否',
              taskDueTime: '2020-01-10',
              taskProgress: '0',
              taskCompletedStatus: '否',
              taskActualCompletedTime: '',
            },
          ],
        },
      ],
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[name="collapse"]').collapse('hide');
      })
    })
  },
  methods: {
    admin: function () {
      this.isAdmin = true;
    },
    user: function () {
      this.isAdmin = false;
    },
    toggleCollapse: function (event) {
      const clickedCollapseID = `#collapse${event.target.id}`;
      $(clickedCollapseID).collapse('toggle');
    },
  },
}
</script>

<style scoped>
  .shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
  }
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
  .table-left-column {
    width: 10%;
    font-weight: bold;
  }
  .table-right-column {
    width: 90%;
  }
</style>