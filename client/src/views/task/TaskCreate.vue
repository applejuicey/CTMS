<template>
  <div class="row" id="task_create">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>创建新任务</h1>
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
    name: 'task_create',
    components: {
      BottomCard,
      TaskEditForm,
    },
    data: function () {
      return {
        headerText: '创建新任务',
        tooltipText: '您可以在下方填写新用户的资料并提交至服务器！',
        taskInfoObject: {},
        statusObject4Task: {
          statusIndicator: 'loaded',
        },
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
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
  }
</script>

<style scoped>

</style>