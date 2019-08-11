<template>
  <div class="table-responsive">
    <table class="table table-bordered table-sm">
      <tbody>
        <tr>
          <td>操作</td>
          <td>任务名称</td>
          <td>隶属于</td>
          <td>创建者</td>
          <td>创建时间</td>
          <td>接受者</td>
          <td>接受状态</td>
          <td>截止时间</td>
          <td>任务进度</td>
          <td>完成状态</td>
          <td>实际完成时间</td>
        </tr>
        <template v-for="(task, index) in allTasks">
          <tr>
            <td>
              <span class="cursor-pointer text-primary" @click="toTaskPage(task.taskID, 'view')">
                <i class="fas fa-search"></i>&nbsp;
              </span>
              <span class="cursor-pointer text-success" @click="toTaskPage(task.taskID, 'edit')" v-if="isAdmin">
                <i class="fas fa-edit"></i>&nbsp;
              </span>
              <span class="cursor-pointer text-danger" @click="toTaskPage(task.taskID, 'delete')" v-if="isAdmin">
                <i class="fas fa-trash"></i>&nbsp;
              </span>
            </td>
            <td>{{task.taskName}}</td>
            <td>{{task.belongedToTrialName}}</td>
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
</template>

<script>
  export default {
    name: 'task_brief_info_table',
    props: {
      allTasks: {
        type: Array,
        required: true,
      },
    },
    computed: {
      isAdmin: function () {
        return this.$store.state.indicators.isAdmin;
      },
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    methods: {
      toTaskPage: function (taskID, identifier) {
        this.$router.push({
          name: 'task',
          params: {
            id: taskID,
            function: identifier,
          },
        });
      },
    },
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>