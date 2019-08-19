<template>
  <div class="row" id="project">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>{{ currentFunction }}项目：{{ $route.params.projectID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="actionSelectBoxHeaderText" :cardTooltipText="actionSelectBoxTooltipText">
            <template v-slot:card-body>
              <div class="list-group list-group-flush" id="list-tab">
                <a class="list-group-item list-group-item-action text-primary" data-toggle="list" href="#view">
                  <i class="fas fa-search"></i>&nbsp;查看
                </a>
                <a class="list-group-item list-group-item-action text-success" data-toggle="list" href="#edit" v-if="isAdmin || currentUserID === projectInfoObject.projectManagerID">
                  <i class="fas fa-edit"></i>&nbsp;编辑
                </a>
                <a class="list-group-item list-group-item-action text-danger" data-toggle="list" href="#delete" v-if="isAdmin || currentUserID === projectInfoObject.projectManagerID">
                  <i class="fas fa-trash"></i>&nbsp;删除
                </a>
              </div>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="actionBoxHeaderText" :cardTooltipText="actionBoxTooltipText">
            <template v-slot:card-body>
              <div class="tab-content">
                <div class="tab-pane fade" id="view">
                  <project-info-table :projectInfoObject="projectInfoObject" :statusObject="statusObject4Project"></project-info-table>
                  <task-info-table :tasksInfoArray="projectTasksInfoArray" :statusObject="statusObject4ProjectTasks"></task-info-table>
                </div>
                <div class="tab-pane fade" id="edit" v-if="isAdmin || currentUserID === projectInfoObject.projectManagerID">
                  <project-edit-form :projectInfoObject="projectInfoObject" :statusObject="statusObject4Project"></project-edit-form>
                </div>
                <div class="tab-pane fade" id="delete" v-if="isAdmin || currentUserID === projectInfoObject.projectManagerID">

                  <div class="row">
                    <div class="col-xl-6 offset-xl-3">
                      <div class="alert alert-danger">
                        <h4 class="alert-heading">请确认您的操作！</h4>
                        <p>当您再三确认后，点击下方的按钮以删除该任务！</p>
                        <hr>
                        <button class="btn btn-danger">删除任务</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import ProjectInfoTable from '@/components/ProjectInfoTable.vue';
  import TaskInfoTable from '@/components/TasksInfoTable.vue';
  import ProjectEditForm from '@/components/ProjectEditForm.vue';
  export default {
    name: 'project',
    components: {
      BottomCard,
      ProjectInfoTable,
      TaskInfoTable,
      ProjectEditForm,
    },
    data: () => {
      return {
        projectInfoObject: {},
        statusObject4Project: {},
        projectTasksInfoArray: [],
        statusObject4ProjectTasks: {},
        currentFunction: '查看',
        actionSelectBoxHeaderText: '操作',
        actionSelectBoxTooltipText: '请在这里选择一种操作。',
        actionBoxHeaderText: '详细信息',
        actionBoxTooltipText: '请在这里完成具体操作。',
      };
    },
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    created: function () {
      this.getProjectInfo();
      this.getProjectTasksInfo();
    },
    mounted: function () {
      this.$nextTick(() => {
        $('#list-tab a').on('click', function (e) {
          e.preventDefault();
        });
        if (this.$route.params.functionName === 'edit') {
          $('#list-tab a[href="#edit"]').tab('show');
          this.currentFunction = '编辑';
        } else if (this.$route.params.functionName === 'delete') {
          $('#list-tab a[href="#delete"]').tab('show');
          this.currentFunction = '删除';
        } else {
          $('#list-tab a[href="#view"]').tab('show');
          this.currentFunction = '查看';
        }
        $('a[data-toggle="list"]').on('shown.bs.tab', (e) => {
          if (e.target.href.split('#')[1] === 'edit') {
            $('#list-tab a[href="#edit"]').tab('show');
            this.currentFunction = '编辑';
          } else if (e.target.href.split('#')[1] === 'delete') {
            $('#list-tab a[href="#delete"]').tab('show');
            this.currentFunction = '删除';
          } else {
            $('#list-tab a[href="#view"]').tab('show');
            this.currentFunction = '查看';
          }
        });
      });
    },
    methods: {
      // 根据传入的projectID和currentUserID从服务器获取该项目的信息
      getProjectInfo: function () {
        this.statusObject4Project = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/projectInfo', {
          params: {
            projectID: this.$route.params.projectID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          console.log('Project获取项目信息成功', response);
          this.projectInfoObject = response.data.projectInfo;
          this.statusObject4Project = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Project获取项目信息失败，错误：', error);
          this.statusObject4Project = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
      // 根据传入的projectID和currentUserID从服务器获取该项目所有任务的信息
      getProjectTasksInfo: function () {
        this.statusObject4ProjectTasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/tasksInfo', {
          params: {
            projectID: this.$route.params.projectID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('Project获取任务信息成功', response);
          this.projectTasksInfoArray = response.data.tasksInfo;
          this.statusObject4ProjectTasks = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Project获取任务信息失败，错误：', error);
          this.statusObject4ProjectTasks = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务文件信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>

<style scoped>
  .list-group-item.active {
    background-color: #FFC864;
    border-color: #FFC864;
  }
  .list-group-item-action:hover {
    background-color: #ffeac3;
  }
</style>