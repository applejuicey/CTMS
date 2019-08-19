<template>
  <div class="row" id="task">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>{{ currentFunction }}任务：{{ $route.params.taskID }}</h1>
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
                <a class="list-group-item list-group-item-action text-success" data-toggle="list" href="#edit" v-show="isAdmin || currentUserID === taskInfoObject.taskCreatorID">
                  <i class="fas fa-edit"></i>&nbsp;编辑
                </a>
                <a class="list-group-item list-group-item-action text-danger" data-toggle="list" href="#delete" v-show="isAdmin || currentUserID === taskInfoObject.taskCreatorID">
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
                  <task-info-table :taskInfoObject="taskInfoObject" :statusObject="statusObject4Task"></task-info-table>
                  <file-manage-table :taskFiles="taskFiles" :statusObject="statusObject4TaskFiles"></file-manage-table>
                </div>
                <div class="tab-pane fade" id="edit" v-show="isAdmin || currentUserID === taskInfoObject.taskCreatorID">
                  <task-edit-form :taskInfoObject="taskInfoObject" :statusObject="statusObject4Task"></task-edit-form>
                </div>
                <div class="tab-pane fade" id="delete" v-show="isAdmin || currentUserID === taskInfoObject.taskCreatorID">

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
  import TaskInfoTable from '@/components/TaskInfoTable.vue';
  import FileManageTable from '@/components/FileManageTable.vue';
  import TaskEditForm from '@/components/TaskEditForm.vue';
  export default {
    name: 'task',
    components: {
      BottomCard,
      TaskInfoTable,
      FileManageTable,
      TaskEditForm,
    },
    data: () => {
      return {
        taskInfoObject: {},
        statusObject4Task: {},
        taskFiles: [],
        statusObject4TaskFiles: {},
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
      this.getTaskInfo();
      this.getTaskFilesInfo();
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
      // 根据传入的taskID和currentUserID从服务器获取该任务的信息
      getTaskInfo: function () {
        this.statusObject4Task = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/taskInfo', {
          params: {
            taskID: this.$route.params.taskID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('Task获取任务信息成功', response);
          this.taskInfoObject = response.data.taskInfo;
          this.statusObject4Task = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Task获取任务信息失败，错误：', error);
          this.statusObject4Task = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
      // 根据传入的taskID和currentUserID从服务器获取该任务有关文件的信息
      getTaskFilesInfo: function () {
        this.statusObject4TaskFiles = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/taskFilesInfo', {
          params: {
            taskID: this.$route.params.taskID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('Task获取任务文件信息成功', response);
          this.taskFiles = response.data.taskFiles;
          this.statusObject4TaskFiles = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('Task获取任务文件信息失败，错误：', error);
          this.statusObject4TaskFiles = {
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