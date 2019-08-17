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
<!--              TODO:组件化-->
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
              <div class="row" v-if="statusIndicator === 'loading'">
                <div class="col-xl-6 offset-xl-3">
                  <div class="alert alert-primary text-center mb-0">
                    <h4 class="alert-heading">{{ alertHeader }}</h4>
                    <p>
                      <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ feedbackMessage }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="row" v-if="statusIndicator === 'error'">
                <div class="col-xl-6 offset-xl-3">
                  <div class="alert alert-danger text-center mb-0">
                    <h4 class="alert-heading">{{ alertHeader }}</h4>
                    <p>
                      {{ feedbackMessage }}
                    </p>
                  </div>
                </div>
              </div>
              <template v-for="(trial, index) in involvedTrials" v-if="statusIndicator === 'loaded'">
                <trial-card :trialID="trial.trialID" :currentUserID="currentUserID" :trialName="trial.trialName"></trial-card>
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
  import TrialCard from '@/components/TrialCard.vue';
  export default {
    name: 'home',
    components: {
      BottomCard,
      TrialCard,
    },
    data: function () {
      return {
        taskInboxHeaderText: '尚未接受的任务',
        taskInboxTooltipText: '这里列出所有尚未接受的任务。',
        involvedTrialsHeaderText: '参与的临床试验项目及项目内任务',
        involvedTrialsTooltipText: '这里列出您当前参加的所有临床试验项目及项目内任务。',
        involvedTrials: null,
        statusIndicator: 'loading',
        alertHeader: '加载中',
        feedbackMessage: '加载中，请稍后......',


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
      }
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    created: function () {
      this.getUserInvolvedTrials();
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      // 从localStorage中取出currentUserID，去服务器获取该用户参加的所有试验
      getUserInvolvedTrials: function () {
        this.$axios.get('/involvedTrials', {
          params: {
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('获取该用户参加的所有试验成功', response);
          this.involvedTrials = response.data.involvedTrials;
          this.statusIndicator = 'loaded';
        }).catch((error) => {
          console.error('获取该用户参加的所有试验失败，错误：', error);
          this.statusIndicator = 'error';
          this.alertHeader = '有错误发生';
          this.feedbackMessage = `从服务器获取试验信息失败，错误原因：${error}`;
        });
      },
    },
  }
</script>

<style scoped>
  /*.shadow {*/
  /*  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);*/
  /*}*/
</style>