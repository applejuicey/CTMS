<template>
  <div class="card mb-2 shadow">
    <div class="card-header bg-transparent d-flex">
      <b class="cursor-pointer text-primary" @click="toggleCollapse(trialID)" data-toggle="tooltip" data-placement="top" :title="trialNameTipText">
        <i class="fas fa-capsules"></i>&nbsp;
        {{ trialName }}&nbsp;
        <i class="fas fa-hand-point-left"></i>&nbsp;
      </b>
      <span class="ml-auto">
        <span class="cursor-pointer text-primary">
          <i class="fas fa-search"></i>&nbsp;查看项目信息
        </span>
      </span>
    </div>
    <div :id="`collapse${trialID}`" class="card-body collapse">
      <div class="text-left">
        <i class="fas fa-caret-right"></i>&nbsp;
        <b>试验信息：</b>
      </div>
      <trial-info-table :trialInfoObject="trialInfoObject" :statusObject="statusObject4Trial"></trial-info-table>
      <div class="text-left mb-3">
        <i class="fas fa-caret-right"></i>&nbsp;
        <b>试验内任务：</b>
      </div>
      <task-info-table :tasksInfoArray="tasksInfoArray" :statusObject="statusObject4Tasks"></task-info-table>
    </div>
  </div>
</template>

<script>
  import TrialInfoTable from '@/components/TrialInfoTable.vue';
  import TaskInfoTable from '@/components/TasksInfoTable.vue';
  export default {
    name: 'trial_card',
    components: {
      TrialInfoTable,
      TaskInfoTable,
    },
    props: {
      trialID: {
        type: String,
        required: true,
      },
      currentUserID: {
        type: String,
        required: true,
      },
      trialName: {
        type: String,
        required: true,
      },
    },
    data: function () {
      return {
        trialNameTipText: '点击项目名称可以展示或隐藏项目内容。',
        trialInfoObject: {},
        statusObject4Trial: {},
        tasksInfoArray: [],
        statusObject4Tasks: {},
      };
    },
    computed: {
      collapseID: function () {
        return `#collapse${ this.trialID }`;
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        });
        // 绑定事件：展开时从服务器获取试验信息，传入子组件TrialInfoTable
        // 绑定事件：展开时改变tasksQueryObject，然后子组件watch变化，从服务器获取数据
        $(this.collapseID).on('shown.bs.collapse', () => {
          this.getTrialInfo();
          this.getTasksInfo();
        })
      })
    },
    methods: {
      toggleCollapse: function (trialID) {
        const clickedCollapseID = `#collapse${trialID}`;
        $(clickedCollapseID).collapse('toggle');
      },
      // 根据传入的trialID和currentUserID从服务器获取试验信息
      getTrialInfo: function () {
        this.statusObject4Trial = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/trialInfo', {
          params: {
            trialID: this.trialID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('TrialCard获取试验信息成功', response);
          this.trialInfoObject = response.data.trialInfo;
          this.statusObject4Trial = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('TrialCard获取试验信息失败，错误：', error);
          this.statusObject4Trial = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取试验信息失败，错误原因：${error}`,
          };
        });
      },
      // 根据传入的trialID和currentUserID从服务器获取该试验内的、与该用户有关的所有任务信息
      getTasksInfo: function () {
        this.statusObject4Tasks = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/tasksInfo', {
          params: {
            trialID: this.trialID,
            userID: this.currentUserID,
          }
        }).then((response) => {
          // console.log('TrialCard获取任务信息成功', response);
          this.tasksInfoArray = response.data.tasksInfo;
          this.statusObject4Tasks = {
            statusIndicator: 'loaded',
          };
        }).catch((error) => {
          console.error('TrialCard获取任务信息失败，错误：', error);
          this.statusObject4Tasks = {
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
  .cursor-pointer {
    cursor: pointer;
  }
</style>