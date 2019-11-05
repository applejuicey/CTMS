<template>
  <div class="row" id="tasks">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>
            <i class="fas fa-tasks"></i>&nbsp;任务查询
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="filterToolboxHeaderText" :cardTooltipText="filterToolboxTooltipText">
            <template v-slot:card-body>
              <tasks-filter-form></tasks-filter-form>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="resultCardHeaderText" :cardTooltipText="resultCardTooltipText">
            <template v-slot:card-body>
              <div class="row" v-if="resultDescription === ''">
                <div class="col-xl-6 offset-xl-3">
                  <div class="alert alert-info text-center mb-0">
                    <h4 class="alert-heading">请提供检索条件</h4>
                    <p>请在"任务筛选器"中提供检索条件，然后点击"按上述条件筛选"。</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-left">
                  <mark>{{ resultDescription }}</mark>
                  的查询结果如下所示：
                </p>
                <tasks-info-table :tasksInfoArray="tasksInfoArray" :statusObject="statusObject4Tasks"></tasks-info-table>
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
  import TasksInfoTable from '@/components/task/TasksInfoTable.vue';
  import TasksFilterForm from '@/components/task/TasksFilterForm.vue';
  export default {
    name: 'tasks',
    components: {
      BottomCard,
      TasksInfoTable,
      TasksFilterForm,
    },
    data: () => {
      return {
        filterToolboxHeaderText: '任务筛选器',
        filterToolboxTooltipText: '请在这里设定筛选内容，然后点击"筛选"按钮获得命中条目。',
        resultCardHeaderText: '任务查询结果',
        resultCardTooltipText: '根据筛选器规则的查询结果如下所示。点击"蓝色放大镜"按钮以查看任务详细资料；点击"绿色铅笔"按钮以编辑任务信息；点击"绿色单钩"按钮以接受任务；点击"绿色双钩号"按钮以标记任务完成。',
      };
    },
    computed: {
      // 从VUEX中取出整理后的检索描述字符串
      resultDescription: function () {
        return this.$store.state.messages.taskFilterDescription;
      },
      // 从VUEX中取出检索结果
      tasksInfoArray: function () {
        return this.$store.state.taskFilterQueryResult.tasksInfoArray;
      },
      statusObject4Tasks: function () {
        return this.$store.state.taskFilterQueryResult.statusObject4Tasks;
      },
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    watch: {
      // watch VUEX中的taskFilterQueryObject，有变化时从服务器获取数据
      '$store.state.taskFilterQueryObject': {
        handler: function (newVal, oldVal) {
          // console.log(newVal);
          this.getTasksInfo(newVal);
        },
        deep: true
      },
    },
    methods: {
      getTasksInfo: function (queryParamsObject) {
        this.$store.dispatch('setTaskFilterQueryResultAction', {
          statusObject4Tasks: {
            statusIndicator: 'loading',
            alertHeader: '加载中',
            feedbackMessage: '正在从服务器获取数据，请稍后......',
          },
          tasksInfoArray: [],
        });
        this.$axios.get('/task', {
          params: {
            brief: false,
            taskName: queryParamsObject.taskNameKeyword,
            taskBelongedToProjectName: queryParamsObject.projectNameKeyword,
            taskExecutorRealName: queryParamsObject.taskExecutorNameKeyword,
            taskReceivedStatus: queryParamsObject.taskReceivedStatus === '-1'? '' : queryParamsObject.taskReceivedStatus,
            taskCompletedStatus: queryParamsObject.taskCompletedStatus === '-1'? '' : queryParamsObject.taskCompletedStatus,
            isAdminMode: this.isAdmin
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.$store.dispatch('setTaskFilterQueryResultAction', {
              statusObject4Tasks: {
                statusIndicator: 'loaded',
              },
              tasksInfoArray: response.data.tasks,
            });
          } else if (response.data.statusCode === '0') {
            console.error('Tasks获取任务信息失败，错误：', response.data.error.message);
            this.$store.dispatch('setTaskFilterQueryResultAction', {
              statusObject4Tasks: {
                statusIndicator: 'error',
                alertHeader: '有错误发生',
                feedbackMessage: `从服务器获取任务信息失败，错误原因：${response.data.error.message}`,
              },
              tasksInfoArray: [],
            });
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Tasks获取任务信息失败，错误：', error);
          this.$store.dispatch('setTaskFilterQueryResultAction', {
            statusObject4Tasks: {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
            },
            tasksInfoArray: [],
          });
        });
      },
    },
  }
</script>