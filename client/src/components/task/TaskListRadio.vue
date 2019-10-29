<template>
  <div class="scroll-list">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-12">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-12">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="col-12">
        <template>
          <div class="form-check" v-for="(task, index) in taskList">
            <input class="form-check-input" type="radio" :id="task.taskID + uniqueNumber" :value="task.taskID" v-model="selectedTaskIDCurrent" @change="$emit('selectionChanged', selectedTaskIDCurrent)">
            <label class="form-check-label" :for="task.taskID + uniqueNumber">{{ task.taskName }}</label>
          </div>
        </template>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">等待初始化</h4>
          <p>
            正在等待初始化流程执行......
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'task_list_radio',
    props: {
      taskList: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
      selectedTaskIDOriginal: {
        type: Number,
        required: false,
      }
    },
    data: function () {
      return {
        selectedTaskIDCurrent: null,
        uniqueNumber: null,
      };
    },
    mounted: function () {
      this.selectedTaskIDCurrent = this.selectedTaskIDOriginal;
      this.uniqueNumber = Math.floor(Math.random() * 1000000);
    },
    watch: {
      selectedTaskIDCurrent: {
        handler: function (newVal, oldVal) {
          this.selectedTaskIDCurrent = newVal;
        },
        deep: true,
      },
    },
  }
</script>