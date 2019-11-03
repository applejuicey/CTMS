<template>
  <div class="row" id="home">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>
            <i class="fas fa-cog"></i>&nbsp;{{ currentUsername }}-工作面板
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="controlPanelHeaderText" :cardTooltipText="controlPanelTooltipText" v-if="isAdmin">
            <template v-slot:card-body>
              <div>
                <div class="btn-group-vertical">
                  <button type="button" class="btn btn-outline-success" @click="navigate('project')">
                    <i class="fas fa-plus"></i>&nbsp;<i class="fas fa-capsules"></i>&nbsp;新增项目
                  </button>
                  <button type="button" class="btn btn-outline-success" @click="navigate('task')">
                    <i class="fas fa-plus"></i>&nbsp;<i class="fas fa-tasks"></i>&nbsp;新建任务
                  </button>
                  <button type="button" class="btn btn-outline-success" @click="navigate('user')">
                    <i class="fas fa-plus"></i>&nbsp;<i class="fas fa-users-cog"></i>&nbsp;新增用户
                  </button>
                  <button type="button" class="btn btn-outline-success" @click="navigate('template')">
                    <i class="fas fa-plus"></i>&nbsp;<i class="fas fa-folder-open"></i>&nbsp;新增模板
                  </button>
                </div>
              </div>
            </template>
          </bottom-card>
          <bottom-card :cardHeaderText="taskInboxHeaderText" :cardTooltipText="taskInboxTooltipText" v-if="!isAdmin">
            <template v-slot:card-body>
              <tasks-inbox-cards :unreceivedTasksArray="unreceivedTasksArray" :statusObject="statusObject4UnreceivedTasks"></tasks-inbox-cards>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="involvedProjectsHeaderText" :cardTooltipText="involvedProjectsTooltipText">
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
              <template v-for="(project, index) in involvedProjects" v-if="statusIndicator === 'loaded'">
                <project-card :projectID="project.projectID" :projectName="project.projectName"></project-card>
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
  import ProjectCard from '@/components/project/ProjectCard.vue';
  import TasksInboxCards from '@/components/task/TasksInboxCards.vue';
  export default {
    name: 'home',
    components: {
      BottomCard,
      ProjectCard,
      TasksInboxCards,
    },
    data: function () {
      return {
        controlPanelHeaderText: '管理员控制台',
        controlPanelTooltipText: '作为管理员，您可以在这里新增项目、任务、用户等。',
        taskInboxHeaderText: '尚未接受的任务',
        taskInboxTooltipText: '这里列出所有尚未接受的任务。',
        involvedProjectsHeaderText: '参与的临床试验项目及项目内任务',
        involvedProjectsTooltipText: '这里列出您当前参加的所有临床试验项目及项目内任务。',
        involvedProjects: [],
        statusIndicator: 'loading',
        alertHeader: '加载中',
        feedbackMessage: '加载中，请稍后......',
        unreceivedTasksArray: [],
        statusObject4UnreceivedTasks: {},
      }
    },
    computed: {
      currentUsername: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userRealName;
      },
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    created: function () {
      this.getUserInvolvedProjects();
      this.getUnreceivedTasks();
    },
    methods: {
      getUserInvolvedProjects: function () {
        this.$axios.get('/project', {
          params: {
            brief: true,
            projectName: '',
            projectInvestigatorName: '',
            projectSponsorName: '',
            projectInvolvedUserRealName: '',
            projectCreatedYearMonth: '',
            projectStage: 'all',
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.involvedProjects = response.data.projects;
            this.statusIndicator = 'loaded';
          } else if (response.data.statusCode === '0') {
            console.error('Home获取项目信息失败，错误：', response.data.error.message);
            this.statusIndicator = 'error';
            this.alertHeader = '有错误发生';
            this.feedbackMessage = `从服务器获取项目信息失败，错误原因：${response.data.error.message}`;
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Home获取项目信息失败，错误：', error);
          this.statusIndicator = 'error';
          this.alertHeader = '有错误发生';
          this.feedbackMessage = `从服务器获取项目信息失败，错误原因：${error}`;
        });
      },
      getUnreceivedTasks: function () {
        this.statusObject4UnreceivedTasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/task', {
          params: {
            brief: false,
            taskName: '',
            taskBelongedToProjectName: '',
            taskExecutorName: '',
            taskReceivedStatus: 'not_received',
            taskCompletedStatus: '',
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.unreceivedTasksArray = response.data.tasks;
            this.statusObject4UnreceivedTasks = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('Home获取未接受的任务失败，错误：', response.data.error.message);
            this.statusIndicator = 'error';
            this.alertHeader = '有错误发生';
            this.feedbackMessage = `从服务器获取未接受的任务失败，错误原因：${response.data.error.message}`;
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Home获取未接受的任务失败，错误：', error);
          this.statusObject4UnreceivedTasks = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取未接受的任务失败，错误原因：${error}`,
          };
        });
      },
      navigate: function (targetPage) {
        const routeMap = new Map()
            .set('task', 'task_create')
            .set('project', 'project_create')
            .set('user', 'user_create')
            .set('template', 'template_create');
        const destinationName = routeMap.get(targetPage);
        this.$router.push({ name: destinationName});
      },
    },
  }
</script>