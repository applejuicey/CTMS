<template>
  <div>
    <form>
      <div class="form-group text-left">
        <label for="taskNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="taskNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>任务名称：</span>
        </label>
        <input v-model="taskNameKeyword" type="text" class="form-control" id="taskNameKeyword" placeholder="任务名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="projectNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="projectNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>项目名称：</span>
        </label>
        <input v-model="projectNameKeyword" type="text" class="form-control" id="projectNameKeyword" placeholder="项目名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="taskExecutorNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="taskExecutorNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>任务执行人姓名：</span>
        </label>
        <input v-model="taskExecutorNameKeyword" type="text" class="form-control" id="taskExecutorNameKeyword" placeholder="任务执行人姓名关键字">
      </div>
      <div class="form-group text-left">
        <label for="receivedStatus" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="receivedStatusTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>接受状态：</span>
        </label>
        <select v-model="receivedStatus" class="form-control" id="receivedStatus">
          <option value="1">已接受</option>
          <option value="0">未接受</option>
          <option value="-1">全部</option>
        </select>
      </div>
      <div class="form-group text-left">
        <label for="completeStatus" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="completeStatusTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>完成状态：</span>
        </label>
        <select v-model="completeStatus" class="form-control" id="completeStatus">
          <option value="1">已完成</option>
          <option value="0">未完成</option>
          <option value="-1">全部</option>
        </select>
      </div>
      <button type="button" class="btn btn-success" @click="query">
        <i class="fas fa-search"></i>
        <span>&nbsp;按上述条件筛选</span>
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'tasks_filter_form',
    data: () => {
      return {
        taskNameKeyword: '',
        taskNameKeywordTooltipText: '请在这里填写任务名称中的关键字，留空默认匹配所有任务名称。',
        projectNameKeyword: '',
        projectNameKeywordTooltipText: '请在这里填写项目名称中的关键字，留空默认匹配所有项目名称。',
        taskExecutorNameKeyword: '',
        taskExecutorNameKeywordTooltipText: '请在这里填写任务执行人姓名中的关键字，留空默认匹配所有任务执行人姓名。',
        receivedStatus: '-1',
        receivedStatusTooltipText: '请在这里选择任务被接受状态。',
        completeStatus: '-1',
        completeStatusTooltipText: '请在这里选择任务的完成状态。',
      };
    },
    methods: {
      processFormData: function () {
        const receivedStatusMap = new Map()
            .set('1', ['received', '已接受'])
            .set('0', ['not_received', '未接受'])
            .set('-1', ['all', '全部']);
        const completeStatusMap = new Map()
            .set('1', ['completed', '已完成'])
            .set('0', ['not_completed', '未完成'])
            .set('-1', ['all', '全部']);
        let taskNameKeywordDescription = this.taskNameKeyword;
        let projectNameKeywordDescription = this.projectNameKeyword;
        let taskExecutorNameKeywordDescription = this.taskExecutorNameKeyword;
        if (this.taskNameKeyword === '') {
          taskNameKeywordDescription = '不限';
        }
        if (this.projectNameKeyword === '') {
          projectNameKeywordDescription = '不限';
        }
        if (this.taskExecutorNameKeyword === '') {
          taskExecutorNameKeywordDescription = '不限';
        }
        let filterDescription = `"任务名称关键字：${taskNameKeywordDescription}；项目名称关键字：${projectNameKeywordDescription}；任务执行人姓名关键字：${taskExecutorNameKeywordDescription}；任务接受状态：${receivedStatusMap.get(this.receivedStatus)[1]}；任务完成状态：${completeStatusMap.get(this.completeStatus)[1]}"`;
        this.$store.dispatch('setTaskFilterDescriptionAction', {
          taskFilterDescription: filterDescription
        });
        return {
          taskNameKeyword: this.taskNameKeyword,
          projectNameKeyword: this.projectNameKeyword,
          taskExecutorNameKeyword: this.taskExecutorNameKeyword,
          taskReceivedStatus: receivedStatusMap.get(this.receivedStatus)[0],
          taskCompletedStatus: completeStatusMap.get(this.completeStatus)[0],
        };
      },
      // 生成一个对象，包括用户ID与一些检索条件，将该对象保存至vuex
      query: function () {
        const queryObject = this.processFormData();
        this.$store.dispatch('setTaskFilterQueryObjectAction', queryObject);
      },
    },
  }
</script>

<style scoped>

</style>