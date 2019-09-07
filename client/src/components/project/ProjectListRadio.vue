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
          <div class="form-check" v-for="(project, index) in projectList">
            <input class="form-check-input" type="radio" :id="project.projectID" :value="project.projectID" v-model="selectedProjectIDCurrent" @change="$emit('selectionChanged', selectedProjectIDCurrent)">
            <label class="form-check-label" :for="project.projectID">{{ project.projectName }}</label>
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
    name: 'project_list_radio',
    props: {
      projectList: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
      selectedProjectIDOriginal: {
        type: String,
        required: false,
      }
    },
    data: function () {
      return {
        selectedProjectIDCurrent: '',
      };
    },
    mounted: function () {
      this.selectedProjectIDCurrent = this.selectedProjectIDOriginal;
    },
    watch: {
      selectedProjectIDOriginal: {
        handler: function (newVal, oldVal) {
          this.selectedProjectIDCurrent = newVal;
        },
        deep: true,
      },
    },
  }
</script>

<style scoped>

</style>