<template>
  <div class="row" id="home">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>用户名-工作面板</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="taskInboxHeaderText" :cardTooltipText="taskInboxTooltipText">
            <template v-slot:card-body>
              <template v-for="(task, index) in unreceivedTasks">
                <div class="card mb-2 shadow">
                  <div class="card-header bg-transparent d-flex">
                    <b class="text-warning">
                      <i class="fas fa-tasks"></i>&nbsp;
                      {{task.taskName}}
                    </b>
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
                        <span class="font-weight-normal">试验名称：</span>
                        <span>{{task.belongedToTrialName}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <span class="font-weight-normal">任务名称：</span>
                        <span>{{task.taskName}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <span class="font-weight-normal">截止时间：</span>
                        <span>{{task.dueTime}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <span class="font-weight-normal">被分派人：</span>
                        <span>{{task.assignedToUserName}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <span class="font-weight-normal">任务描述：</span>
                        <span>{{task.taskDescription}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <span class="font-weight-normal">创建时间：</span>
                        <span>{{task.createdTime}}</span>
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        <span class="font-weight-normal">是否接受：</span>
                        <span>{{task.receiveStatus}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="involvedTrialsHeaderText" :cardTooltipText="involvedTrialsTooltipText">
            <template v-slot:card-body>
              <template v-for="(trial, index) in involvedTrials">
                <div class="card mb-2 shadow">
                  <div class="card-header bg-transparent d-flex">
                    <b class="cursor-pointer text-success" @click="toggleCollapse(trial.trialID)" data-toggle="tooltip" data-placement="top" :title="trialNameTipText">
                      <i class="fas fa-capsules"></i>&nbsp;
                      {{trial.trialName}}&nbsp;
                      <i class="fas fa-hand-point-left"></i>&nbsp;
                    </b>
                    <span class="ml-auto">
                      <span class="cursor-pointer text-primary">
                        <i class="fas fa-search"></i>&nbsp;查看项目信息
                      </span>
                    </span>
                  </div>
                  <div :id="`collapse${trial.trialID}`" class="collapse card-body">
                    <div class="text-left">
                      <i class="fas fa-caret-right"></i>&nbsp;
                      <b>试验信息：</b>
                    </div>
                    <vertical-header-table :tableData="trial.trialInfoForVerticalHeaderTable"></vertical-header-table>
                    <div class="text-left mb-3">
                      <i class="fas fa-caret-right"></i>&nbsp;
                      <b>试验内任务：</b>
                    </div>
                    <task-brief-info-table :allTasks="trial.involvedTasks"></task-brief-info-table>
                  </div>
                </div>
              </template>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import TaskBriefInfoTable from '@/components/TasksBriefInfoTable.vue';
  import VerticalHeaderTable from '@/components/VerticalHeaderTable.vue';
  export default {
    name: 'home',
    components: {
      BottomCard,
      TaskBriefInfoTable,
      VerticalHeaderTable,
    },
    data: () => {
      return {
        taskInboxHeaderText: '尚未接受的任务',
        taskInboxTooltipText: '这里列出所有尚未接受的任务。',
        involvedTrialsHeaderText: '参与的临床试验项目及项目内任务',
        involvedTrialsTooltipText: '这里列出您当前参加的所有临床试验项目及项目内任务。',
        trialNameTipText: '点击项目名称可以展示或隐藏项目内容。',
        // TODO: 提供用户ID，获取与该用户有关的（ADMIN为create，USER为assign）所有未接的（receiveStatus）任务
        unreceivedTasks: [
          {
            taskID: 'TASK001',
            taskName: '写DMP',
            taskDescription: '请在王诗远的指导下完成数据管理计划。请在王诗远的指导下完成数据管理计划。',
            belongedToTrialID: 'TRIAL001',
            belongedToTrialName: 'EV71-III期',
            assignedToUserID: 'USER001',
            assignedToUserName: '范扬',
            createdTime: '2019-08-08',
            dueTime: '2019-09-01',
            receiveStatus: '否',
            progressPercentage: 0,
          },
          {
            taskID: 'TASK002',
            taskName: '现场编盲',
            taskDescription: '编盲地点：上海-静安区。',
            belongedToTrialID: 'TRIAL002',
            belongedToTrialName: '狂犬疫苗-II期',
            assignedToUserID: 'USER001',
            assignedToUserName: '范扬',
            createdTime: '2019-08-09',
            dueTime: '2019-09-25',
            receiveStatus: '否',
            progressPercentage: 0,
          },
        ],
        // TODO: 提供用户ID，获取与该用户有关的（ADMIN为create，USER为involve）所有项目
        involvedTrials: [
          {
            trialID: 'TRIAL001',
            trialName: 'EV71-II期',
            trialInfoForVerticalHeaderTable: [
              {
                leftCellData: '试验名称',
                rightCellData: 'EV71-II期',
              },
              {
                leftCellData: '当前试验阶段',
                rightCellData: '准备阶段',
              },
              {
                leftCellData: '试验简介',
                rightCellData: '本研究为单中心、随机双盲、阳性对照设计临床试验，用于评价深圳康泰生物制品股份有限公司和北京民海生物科技有限公司联合研制的重组肠道病毒71型疫苗（汉逊酵母）在中国2月龄至71月龄健康人群中的免疫程序、剂量和安全性剂量、免疫原性和安全性。',
              },
              {
                leftCellData: '创建时间',
                rightCellData: '2019-08-08',
              },
              {
                leftCellData: '预计开始时间',
                rightCellData: '2020-09-01',
              },
              {
                leftCellData: '实际开始时间',
                rightCellData: '',
              },
              {
                leftCellData: '预计结束时间',
                rightCellData: '2021-01-01',
              },
              {
                leftCellData: '实际结束时间',
                rightCellData: '',
              },
              {
                leftCellData: '申办方',
                rightCellData: '北京民海生物科技有限公司',
              },
              {
                leftCellData: '研究方',
                rightCellData: '江苏省疾病预防控制中心',
              },
              {
                leftCellData: '监查方',
                rightCellData: '南京桑瑞斯',
              },
              {
                leftCellData: '统计方',
                rightCellData: '东南大学公共卫生学院卫生统计教研室',
              },
            ],
            involvedTasks: [
              {
                taskID: 'TASK001',
                taskName: '写DMP',
                belongedToTrialName: 'EV71-II期',
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
                taskID: 'TASK002',
                taskName: 'EDC建库',
                belongedToTrialName: 'EV71-II期',
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
            trialInfoForVerticalHeaderTable: [
              {
                leftCellData: '试验名称',
                rightCellData: '狂犬疫苗5针',
              },
              {
                leftCellData: '当前试验阶段',
                rightCellData: '准备阶段',
              },
              {
                leftCellData: '试验简介',
                rightCellData: '北京民海生物科技有限公司研制的冻干人用狂犬病疫苗（人二倍体细胞），用于预防狂犬病，申请药品注册。经国家食品药品监督管理局审查，符合药品注册的有关规定，以2017L00332号《药物临床试验批件》批准对该制品进行临床试验。受临床试验申报者委托，江苏省疾病预防控制中心为临床试验研究负责单位，对该制品进行临床试验，以评价其应用于10～60岁健康人群的安全性和免疫原性。',
              },
              {
                leftCellData: '创建时间',
                rightCellData: '2019-08-08',
              },
              {
                leftCellData: '预计开始时间',
                rightCellData: '2019-08-09',
              },
              {
                leftCellData: '实际开始时间',
                rightCellData: '2019-08-09',
              },
              {
                leftCellData: '预计结束时间',
                rightCellData: '2020-01-01',
              },
              {
                leftCellData: '实际结束时间',
                rightCellData: '',
              },
              {
                leftCellData: '申办方',
                rightCellData: '北京民海生物科技有限公司',
              },
              {
                leftCellData: '研究方',
                rightCellData: '江苏省疾病预防控制中心',
              },
              {
                leftCellData: '监查方',
                rightCellData: '南京桑瑞斯',
              },
              {
                leftCellData: '统计方',
                rightCellData: '东南大学公共卫生学院卫生统计教研室',
              },
            ],
            involvedTasks: [
              {
                taskID: 'TASK003',
                taskName: '盲底材料准备',
                belongedToTrialName: '狂犬疫苗5针',
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
                taskID: 'TASK004',
                taskName: '现场编盲',
                belongedToTrialName: '狂犬疫苗5针',
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
    computed: {
      isAdmin: function () {
        return this.$store.state.indicators.isAdmin;
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      toggleCollapse: function (trialID) {
        const clickedCollapseID = `#collapse${trialID}`;
        $(clickedCollapseID).collapse('toggle');
      },
    },
  }
</script>

<style scoped>
  /*.shadow {*/
  /*  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);*/
  /*}*/
  /*.cursor-pointer {*/
  /*  cursor: pointer;*/
  /*}*/
</style>