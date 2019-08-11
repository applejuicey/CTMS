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
        <label for="trialNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="trialNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>项目名称：</span>
        </label>
        <input v-model="trialNameKeyword" type="text" class="form-control" id="trialNameKeyword" placeholder="项目名称关键字">
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
          <option value="1">未完成</option>
          <option value="-1">全部</option>
        </select>
      </div>
      <button type="button" class="btn btn-outline-primary" @click="query">按上述条件筛选</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'task_edit_form',
    props: {
      taskID: {
        type: String,
        required: true,
      },
    },
    data: () => {
      return {
        taskNameKeyword: '',
        taskNameKeywordTooltipText: '请在这里填写任务名称中的关键字，留空默认匹配所有任务名称。',
        trialNameKeyword: '',
        trialNameKeywordTooltipText: '请在这里填写临床试验项目名称中的关键字，留空默认匹配所有临床试验项目名称。',
        receivedStatus: '-1',
        receivedStatusTooltipText: '请在这里选择任务被接受状态。',
        completeStatus: '-1',
        completeStatusTooltipText: '请在这里选择任务的完成状态。',
      };
    },
    methods: {
      processFormData: function () {

      },
    },
  }
</script>

<style scoped>

</style>