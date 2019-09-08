<template>
  <div class="row" id="task_edit">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>编辑任务-{{ $route.params.taskID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <task-edit-form :taskInfoObject="taskInfoObject" :statusObject="statusObject4Task"></task-edit-form>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import TaskEditForm from '@/components/task/TaskEditForm.vue';
  export default {
    name: 'task_edit',
    components: {
      BottomCard,
      TaskEditForm,
    },
    data: function () {
      return {
        headerText: '编辑任务',
        tooltipText: '您可以在下方修改该任务并提交至服务器。',
        taskInfoObject: {},
        statusObject4Task: {},
      }
    },
    created: function () {
      this.getTaskInfo();
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      getTaskInfo: function () {
        this.statusObject4Task = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/task', {
          params: {
            taskID: this.$route.params.taskID,
          }
        }).then((response) => {
          if (response.data.response.statusCode === '1') {
            this.taskInfoObject = response.data.response.task;
            this.statusObject4Task = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.response.statusCode === '0') {
            console.error('TaskView获取任务信息失败，错误：', response.data.response.error.message);
            this.statusObject4Task = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取任务信息失败，错误原因：${response.data.response.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TaskView获取任务信息失败，错误：', error);
          this.statusObject4Task = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取任务信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>

<style scoped>

</style>