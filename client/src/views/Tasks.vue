<template>
  <div class="row" id="tasks">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>与我有关的任务</h1>
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
              <p class="text-left">{{resultDescription || '"请执行查询"'}}的查询结果如下所示：</p>
              <tasks-brief-info-table :allTasks="queryResultTasks"></tasks-brief-info-table>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import TasksBriefInfoTable from '@/components/TasksBriefInfoTable.vue';
  import TasksFilterForm from '@/components/TasksFilterForm.vue';
  export default {
    name: 'tasks',
    components: {
      BottomCard,
      TasksBriefInfoTable,
      TasksFilterForm,
    },
    data: () => {
      return {
        filterToolboxHeaderText: '任务筛选器',
        filterToolboxTooltipText: '请在这里设定筛选内容，然后点击"筛选"按钮获得命中条目。',
        resultCardHeaderText: '任务查询结果',
        resultCardTooltipText: '根据筛选器规则的查询结果如下所示，点击"放大镜"按钮以查看任务详细资料。',
        // TODO: 从VUEX中取出整理后的检索结果
        queryResultTasks: [
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
      };
    },
    computed: {
      resultDescription: function () {
        return this.$store.state.messages.taskFilterDescription;
      },
      // TODO: 从VUEX中取出整理后的检索结果
      // queryResultTasks: function () {
      //
      // },
    },

  }
</script>

<style scoped>

</style>