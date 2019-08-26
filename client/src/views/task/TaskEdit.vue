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
  import TaskEditForm from '@/components/TaskEditForm.vue';
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
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
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
      // 根据传入的projectID和currentUserID从服务器获取该任务的信息
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
          // console.log('TaskEdit获取任务信息成功', response);
          this.taskInfoObject = response.data.taskInfo;
          this.statusObject4Task = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('TaskEdit获取任务信息失败，错误：', error);
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